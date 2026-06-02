// Cliente HTTP da Figa Blog API.
// Centraliza a URL base, o token JWT (localStorage) e o tratamento de erro.
// Usado tanto pelo AuthContext quanto pelas páginas.

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  'https://amplo-figa-figa-blog--api.gitgpl.easypanel.host/api/v1'

const ACCESS_KEY = 'figa.accessToken'
const REFRESH_KEY = 'figa.refreshToken'

// ---- Armazenamento de tokens (somente no browser) ----
export const tokenStore = {
  get access() {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(ACCESS_KEY)
  },
  get refresh() {
    if (typeof window === 'undefined') return null
    return window.localStorage.getItem(REFRESH_KEY)
  },
  set({ accessToken, refreshToken }) {
    if (typeof window === 'undefined') return
    if (accessToken) window.localStorage.setItem(ACCESS_KEY, accessToken)
    if (refreshToken) window.localStorage.setItem(REFRESH_KEY, refreshToken)
  },
  clear() {
    if (typeof window === 'undefined') return
    window.localStorage.removeItem(ACCESS_KEY)
    window.localStorage.removeItem(REFRESH_KEY)
  },
}

// Erro padronizado lançado pelo cliente (carrega status + code + details).
export class ApiError extends Error {
  constructor(message, status, code, details) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
    this.details = details
  }
}

/**
 * Faz uma requisição à API e devolve `data` (desembrulha { success, data }).
 * Opções:
 *   - method, body (objeto -> JSON), query (objeto -> querystring)
 *   - auth: true para enviar Authorization: Bearer <token>
 *   - token: força um token específico (usado no refresh)
 *   - returnMeta: true para devolver { data, meta } (paginação)
 */
export async function apiFetch(path, { method = 'GET', body, query, auth = false, token, returnMeta = false } = {}) {
  let url = `${API_URL}${path}`
  if (query && Object.keys(query).length) {
    const qs = new URLSearchParams(
      Object.entries(query).filter(([, v]) => v !== undefined && v !== null && v !== '')
    ).toString()
    if (qs) url += `?${qs}`
  }

  const headers = { 'Content-Type': 'application/json' }
  const bearer = token || (auth ? tokenStore.access : null)
  if (bearer) headers.Authorization = `Bearer ${bearer}`

  let res
  try {
    res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      cache: 'no-store',
    })
  } catch (networkErr) {
    throw new ApiError('Não foi possível conectar à API.', 0, 'NETWORK_ERROR')
  }

  // 204 sem corpo.
  if (res.status === 204) return returnMeta ? { data: null, meta: null } : null

  let json = null
  try {
    json = await res.json()
  } catch (_e) {
    /* resposta sem JSON */
  }

  if (!res.ok || !json || json.success === false) {
    const err = json && json.error ? json.error : {}
    throw new ApiError(err.message || `Erro ${res.status}`, res.status, err.code, err.details)
  }

  return returnMeta ? { data: json.data, meta: json.meta || null } : json.data
}

// ----------------------------------------------------------------------------
// SDK por domínio — açúcar sintático sobre apiFetch.
// ----------------------------------------------------------------------------
export const api = {
  // ---- Auth ----
  auth: {
    register: (payload) => apiFetch('/auth/register', { method: 'POST', body: payload }),
    login: (payload) => apiFetch('/auth/login', { method: 'POST', body: payload }),
    refresh: (refreshToken) => apiFetch('/auth/refresh', { method: 'POST', body: { refreshToken } }),
    logout: (refreshToken) => apiFetch('/auth/logout', { method: 'POST', body: { refreshToken } }),
    me: () => apiFetch('/auth/me', { auth: true }),
    updateMe: (payload) => apiFetch('/auth/me', { method: 'PATCH', auth: true, body: payload }),
  },

  // ---- Posts ----
  posts: {
    list: (query) => apiFetch('/posts', { query, returnMeta: true }),
    get: (slugOrId) => apiFetch(`/posts/${slugOrId}`),
    create: (payload) => apiFetch('/posts', { method: 'POST', auth: true, body: payload }),
    update: (id, payload) => apiFetch(`/posts/${id}`, { method: 'PATCH', auth: true, body: payload }),
    publish: (id) => apiFetch(`/posts/${id}/publish`, { method: 'POST', auth: true }),
    archive: (id) => apiFetch(`/posts/${id}/archive`, { method: 'POST', auth: true }),
    remove: (id) => apiFetch(`/posts/${id}`, { method: 'DELETE', auth: true }),
  },

  // ---- Categorias / Tags ----
  categories: {
    list: () => apiFetch('/categories'),
    get: (slugOrId) => apiFetch(`/categories/${slugOrId}`),
  },
  tags: {
    list: (query) => apiFetch('/tags', { query }),
  },

  // ---- Comentários ----
  comments: {
    listForPost: (postId, query) => apiFetch(`/posts/${postId}/comments`, { query, returnMeta: true }),
    create: (postId, payload) => apiFetch(`/posts/${postId}/comments`, { method: 'POST', auth: true, body: payload }),
    update: (id, payload) => apiFetch(`/comments/${id}`, { method: 'PATCH', auth: true, body: payload }),
    remove: (id) => apiFetch(`/comments/${id}`, { method: 'DELETE', auth: true }),
    moderate: (id, status) => apiFetch(`/comments/${id}/moderate`, { method: 'PATCH', auth: true, body: { status } }),
    moderationList: (query) => apiFetch('/comments', { query, auth: true, returnMeta: true }),
  },

  // ---- Curtidas ----
  likes: {
    status: (postId) => apiFetch(`/posts/${postId}/likes`, { auth: true }),
    like: (postId) => apiFetch(`/posts/${postId}/like`, { method: 'POST', auth: true }),
    unlike: (postId) => apiFetch(`/posts/${postId}/like`, { method: 'DELETE', auth: true }),
  },

  // ---- IA ----
  ai: {
    generatePost: (payload) => apiFetch('/ai/generate-post', { method: 'POST', auth: true, body: payload }),
    providers: () => apiFetch('/ai/providers', { auth: true }),
    generations: (query) => apiFetch('/ai/generations', { query, auth: true, returnMeta: true }),
    listConfig: () => apiFetch('/ai/config', { auth: true }),
    createConfig: (payload) => apiFetch('/ai/config', { method: 'POST', auth: true, body: payload }),
    activateConfig: (id) => apiFetch(`/ai/config/${id}/activate`, { method: 'POST', auth: true }),
  },

  // ---- Usuários (admin) ----
  users: {
    list: (query) => apiFetch('/users', { query, auth: true, returnMeta: true }),
    create: (payload) => apiFetch('/users', { method: 'POST', auth: true, body: payload }),
    update: (id, payload) => apiFetch(`/users/${id}`, { method: 'PATCH', auth: true, body: payload }),
    setStatus: (id, isActive) => apiFetch(`/users/${id}/status`, { method: 'PATCH', auth: true, body: { isActive } }),
    remove: (id) => apiFetch(`/users/${id}`, { method: 'DELETE', auth: true }),
  },
}
