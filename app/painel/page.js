'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { useAuth } from '@/context/AuthContext'
import { api, ApiError } from '@/lib/api'
import styles from './page.module.css'
import {
  LayoutDashboard, Loader2, Lock, PenSquare, Sparkles, History,
  CheckCircle2, MessageSquare, Settings, Users as UsersIcon,
  Check, X, Send, Archive, Plus, Power, Image as ImageIcon,
} from 'lucide-react'

// Mapa de status -> classe de badge
const STATUS_CLASS = {
  published: styles.statusPublished,
  pending: styles.statusPending,
  draft: styles.statusDraft,
  archived: styles.statusArchived,
}

function StatusBadge({ status }) {
  return (
    <span className={`${styles.status} ${STATUS_CLASS[status] || styles.statusDraft}`}>
      {status || 'draft'}
    </span>
  )
}

// ---------------------------------------------------------------------------
// SEÇÃO: Criar postagem
// ---------------------------------------------------------------------------
function CreatePostSection({ role }) {
  const isAuthor = role === 'author'
  const [categories, setCategories] = useState([])
  const [form, setForm] = useState({
    title: '', excerpt: '', categoryId: '', tags: '', content: '', status: 'draft',
  })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [created, setCreated] = useState(null)

  useEffect(() => {
    api.categories.list().then((data) => setCategories(data || [])).catch(() => {})
  }, [])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setCreated(null)
    setSubmitting(true)
    try {
      const payload = {
        title: form.title,
        content: form.content,
        status: form.status,
      }
      if (form.excerpt) payload.excerpt = form.excerpt
      if (form.categoryId) payload.categoryId = form.categoryId
      const tags = form.tags.split(',').map((t) => t.trim()).filter(Boolean)
      if (tags.length) payload.tags = tags

      const post = await api.posts.create(payload)
      setCreated(post)
      setForm({ title: '', excerpt: '', categoryId: '', tags: '', content: '', status: 'draft' })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao criar a postagem.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <PenSquare size={22} />
        <h2>Criar postagem</h2>
      </div>
      <p className={styles.sectionDesc}>
        Escreva uma nova postagem manualmente.
        {isAuthor && ' Como autor, suas postagens entram como rascunho ou aguardando revisão.'}
      </p>

      {error && <div className={styles.error}>{error}</div>}
      {created && (
        <div className={styles.success}>
          Postagem &quot;{created.title}&quot; criada com sucesso (status: {created.status}).
        </div>
      )}

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Título</label>
          <input className={styles.input} value={form.title} onChange={set('title')} required />
        </div>

        <div className={styles.formGroup}>
          <label>Resumo (excerpt)</label>
          <input className={styles.input} value={form.excerpt} onChange={set('excerpt')} placeholder="Breve descrição opcional" />
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Categoria</label>
            <select className={styles.select} value={form.categoryId} onChange={set('categoryId')}>
              <option value="">— sem categoria —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label>Status</label>
            <select className={styles.select} value={form.status} onChange={set('status')}>
              <option value="draft">Rascunho</option>
              <option value="pending">Aguardando revisão</option>
              {!isAuthor && <option value="published">Publicado</option>}
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Tags (separadas por vírgula)</label>
          <input className={styles.input} value={form.tags} onChange={set('tags')} placeholder="direitos autorais, música, royalties" />
        </div>

        <div className={styles.formGroup}>
          <label>Conteúdo</label>
          <textarea className={styles.textarea} value={form.content} onChange={set('content')} required />
        </div>

        <button type="submit" className={styles.button} disabled={submitting}>
          {submitting ? <><Loader2 size={18} className={styles.spinner} /> Salvando...</> : <><Plus size={18} /> Criar postagem</>}
        </button>
      </form>
    </div>
  )
}

// ---------------------------------------------------------------------------
// SEÇÃO: Gerar com IA
// ---------------------------------------------------------------------------
function GenerateAiSection() {
  const [categories, setCategories] = useState([])
  const [providers, setProviders] = useState([])
  const [theme, setTheme] = useState('')
  const [provider, setProvider] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState(null)

  useEffect(() => {
    api.categories.list().then((d) => setCategories(d || [])).catch(() => {})
    api.ai.providers().then((d) => setProviders(d || [])).catch(() => {})
  }, [])

  const handleGenerate = async (e) => {
    e.preventDefault()
    setError('')
    setResult(null)
    setGenerating(true)
    try {
      const payload = { theme }
      if (provider) payload.provider = provider
      if (categoryId) payload.categoryId = categoryId
      const res = await api.ai.generatePost(payload)
      setResult(res)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao gerar a postagem.')
    } finally {
      setGenerating(false)
    }
  }

  const post = result?.post
  const tags = post?.tags || []

  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <Sparkles size={22} />
        <h2>Gerar com IA</h2>
      </div>
      <p className={styles.sectionDesc}>
        Informe um tema e a IA gera um rascunho completo de postagem (título, capa, resumo, conteúdo e tags). A geração pode levar alguns instantes.
      </p>

      {error && <div className={styles.error}>{error}</div>}

      <form className={styles.form} onSubmit={handleGenerate}>
        <div className={styles.formGroup}>
          <label>Tema</label>
          <input
            className={styles.input}
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            placeholder="Ex.: Como funcionam os royalties de streaming no Brasil"
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Provedor (opcional)</label>
            <select className={styles.select} value={provider} onChange={(e) => setProvider(e.target.value)}>
              <option value="">— padrão —</option>
              {providers.map((p) => (
                <option key={p.provider} value={p.provider} disabled={p.configured === false}>
                  {p.label}{p.configured === false ? ' (não configurado)' : ''}
                </option>
              ))}
            </select>
            {providers.some((p) => p.configured === false) && (
              <span className={styles.note}>Provedores sem chave configurada ficam desabilitados.</span>
            )}
          </div>
          <div className={styles.formGroup}>
            <label>Categoria (opcional)</label>
            <select className={styles.select} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
              <option value="">— automática —</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" className={styles.button} disabled={generating}>
          {generating ? <><Loader2 size={18} className={styles.spinner} /> Gerando postagem...</> : <><Sparkles size={18} /> Gerar postagem</>}
        </button>
      </form>

      {generating && (
        <p className={styles.inlineLoading} style={{ marginTop: 16 }}>
          <Loader2 size={16} className={styles.spinner} /> A IA está escrevendo, isso pode demorar um pouco...
        </p>
      )}

      {post && (
        <div className={styles.preview}>
          <h3>{post.title}</h3>
          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className={styles.cover} src={post.coverImage} alt={post.title} />
          )}
          {post.excerpt && <p className={styles.previewExcerpt}>{post.excerpt}</p>}
          {tags.length > 0 && (
            <div className={styles.tags}>
              {tags.map((t, i) => (
                <span key={i} className={styles.tag}>{typeof t === 'string' ? t : t.name}</span>
              ))}
            </div>
          )}
          {post.content && (
            <div className={styles.previewContent}>{String(post.content).slice(0, 1500)}</div>
          )}
          <div className={styles.btnRow} style={{ marginTop: 18 }}>
            {post.slug && (
              <Link href={`/blog/${post.slug}`} className={`${styles.button} ${styles.buttonGhost}`}>
                Ver postagem
              </Link>
            )}
            <span className={styles.note}>Rascunho criado com status: {post.status}</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SEÇÃO: Minhas gerações
// ---------------------------------------------------------------------------
function GenerationsSection() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    api.ai.generations({ page: 1, limit: 20 })
      .then(({ data }) => { if (active) setItems(data || []) })
      .catch((err) => { if (active) setError(err instanceof ApiError ? err.message : 'Erro ao carregar gerações.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <History size={22} />
        <h2>Minhas gerações</h2>
      </div>
      <p className={styles.sectionDesc}>Histórico das postagens geradas por IA.</p>

      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <p className={styles.inlineLoading}><Loader2 size={16} className={styles.spinner} /> Carregando...</p>
      ) : items.length === 0 ? (
        <p className={styles.empty}>Nenhuma geração ainda.</p>
      ) : (
        <div className={styles.list}>
          {items.map((g) => (
            <div key={g.id} className={styles.item}>
              <div className={styles.itemMain}>
                <h4>{g.theme || g.post?.title || 'Geração'}</h4>
                <div className={styles.itemMeta}>
                  {g.provider && <span>Provedor: {g.provider}</span>}
                  {g.model && <span>Modelo: {g.model}</span>}
                  {g.status && <span>Status: {g.status}</span>}
                  {g.createdAt && <span>{new Date(g.createdAt).toLocaleString('pt-BR')}</span>}
                </div>
              </div>
              {g.post?.slug && (
                <Link href={`/blog/${g.post.slug}`} className={`${styles.button} ${styles.buttonGhost} ${styles.btnSm}`}>
                  Ver
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SEÇÃO: Revisão & publicação
// ---------------------------------------------------------------------------
function ReviewSection() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const [pending, drafts] = await Promise.all([
        api.posts.list({ status: 'pending', page: 1, limit: 50 }),
        api.posts.list({ status: 'draft', page: 1, limit: 50 }),
      ])
      const merged = [...(pending.data || []), ...(drafts.data || [])]
      setPosts(merged)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao carregar postagens.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const act = async (id, fn) => {
    setBusy(id)
    setError('')
    try {
      await fn(id)
      await load()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro na operação.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <CheckCircle2 size={22} />
        <h2>Revisão & publicação</h2>
      </div>
      <p className={styles.sectionDesc}>Postagens aguardando revisão e rascunhos prontos para publicar ou arquivar.</p>

      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <p className={styles.inlineLoading}><Loader2 size={16} className={styles.spinner} /> Carregando...</p>
      ) : posts.length === 0 ? (
        <p className={styles.empty}>Nenhuma postagem pendente.</p>
      ) : (
        <div className={styles.list}>
          {posts.map((p) => (
            <div key={p.id} className={styles.item}>
              <div className={styles.itemMain}>
                <h4>{p.title} <StatusBadge status={p.status} /></h4>
                <div className={styles.itemMeta}>
                  {p.author?.name && <span>Autor: {p.author.name}</span>}
                  {p.category?.name && <span>Categoria: {p.category.name}</span>}
                  {p.createdAt && <span>{new Date(p.createdAt).toLocaleDateString('pt-BR')}</span>}
                </div>
                {p.excerpt && <p className={styles.itemBody}>{p.excerpt}</p>}
              </div>
              <div className={styles.btnRow}>
                <button
                  className={`${styles.button} ${styles.btnSm}`}
                  disabled={busy === p.id}
                  onClick={() => act(p.id, api.posts.publish)}
                >
                  <Send size={15} /> Publicar
                </button>
                <button
                  className={`${styles.button} ${styles.buttonDanger} ${styles.btnSm}`}
                  disabled={busy === p.id}
                  onClick={() => act(p.id, api.posts.archive)}
                >
                  <Archive size={15} /> Arquivar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SEÇÃO: Moderação de comentários
// ---------------------------------------------------------------------------
function CommentsModerationSection() {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await api.comments.moderationList({ status: 'pending', page: 1, limit: 50 })
      setComments(data || [])
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao carregar comentários.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const moderate = async (id, status) => {
    setBusy(id)
    setError('')
    try {
      await api.comments.moderate(id, status)
      await load()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao moderar.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <MessageSquare size={22} />
        <h2>Moderação de comentários</h2>
      </div>
      <p className={styles.sectionDesc}>Comentários aguardando aprovação.</p>

      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <p className={styles.inlineLoading}><Loader2 size={16} className={styles.spinner} /> Carregando...</p>
      ) : comments.length === 0 ? (
        <p className={styles.empty}>Nenhum comentário pendente.</p>
      ) : (
        <div className={styles.list}>
          {comments.map((c) => (
            <div key={c.id} className={styles.item}>
              <div className={styles.itemMain}>
                <h4>{c.author?.name || c.authorName || 'Anônimo'}</h4>
                <div className={styles.itemMeta}>
                  {c.post?.title && <span>Em: {c.post.title}</span>}
                  {c.createdAt && <span>{new Date(c.createdAt).toLocaleString('pt-BR')}</span>}
                </div>
                <p className={styles.itemBody}>{c.content}</p>
              </div>
              <div className={styles.btnRow}>
                <button
                  className={`${styles.button} ${styles.btnSm}`}
                  disabled={busy === c.id}
                  onClick={() => moderate(c.id, 'approved')}
                >
                  <Check size={15} /> Aprovar
                </button>
                <button
                  className={`${styles.button} ${styles.buttonDanger} ${styles.btnSm}`}
                  disabled={busy === c.id}
                  onClick={() => moderate(c.id, 'rejected')}
                >
                  <X size={15} /> Rejeitar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SEÇÃO: Configuração de IA (admin)
// ---------------------------------------------------------------------------
function AiConfigSection() {
  const [configs, setConfigs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [busy, setBusy] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '', provider: 'openai', model: '', imageStrategy: 'none',
  })

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api.ai.listConfig()
      setConfigs(Array.isArray(data) ? data : (data?.data || []))
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao carregar configurações.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)
    try {
      await api.ai.createConfig({
        name: form.name,
        provider: form.provider,
        model: form.model,
        imageStrategy: form.imageStrategy,
      })
      setSuccess('Configuração criada.')
      setForm({ name: '', provider: 'openai', model: '', imageStrategy: 'none' })
      await load()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao criar configuração.')
    } finally {
      setSubmitting(false)
    }
  }

  const activate = async (id) => {
    setBusy(id)
    setError('')
    try {
      await api.ai.activateConfig(id)
      await load()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao ativar.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <Settings size={22} />
        <h2>Configuração de IA</h2>
      </div>
      <p className={styles.sectionDesc}>Gerencie os perfis de IA usados para geração de postagens.</p>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form className={styles.form} onSubmit={handleCreate}>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Nome</label>
            <input className={styles.input} value={form.name} onChange={set('name')} required />
          </div>
          <div className={styles.formGroup}>
            <label>Provedor</label>
            <select className={styles.select} value={form.provider} onChange={set('provider')}>
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic</option>
              <option value="google">Google</option>
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Modelo</label>
            <input className={styles.input} value={form.model} onChange={set('model')} placeholder="ex.: gpt-4o-mini" required />
          </div>
          <div className={styles.formGroup}>
            <label><ImageIcon size={14} /> Estratégia de imagem</label>
            <select className={styles.select} value={form.imageStrategy} onChange={set('imageStrategy')}>
              <option value="none">Nenhuma</option>
              <option value="generate">Gerar</option>
              <option value="stock">Banco de imagens</option>
            </select>
          </div>
        </div>
        <button type="submit" className={styles.button} disabled={submitting}>
          {submitting ? <><Loader2 size={18} className={styles.spinner} /> Salvando...</> : <><Plus size={18} /> Criar configuração</>}
        </button>
      </form>

      <h3 style={{ margin: '28px 0 14px', fontSize: '1.1rem' }}>Configurações existentes</h3>
      {loading ? (
        <p className={styles.inlineLoading}><Loader2 size={16} className={styles.spinner} /> Carregando...</p>
      ) : configs.length === 0 ? (
        <p className={styles.empty}>Nenhuma configuração cadastrada.</p>
      ) : (
        <div className={styles.list}>
          {configs.map((cfg) => (
            <div key={cfg.id} className={styles.item}>
              <div className={styles.itemMain}>
                <h4>
                  {cfg.name}{' '}
                  {cfg.isActive && <span className={styles.roleBadge}>ativa</span>}
                </h4>
                <div className={styles.itemMeta}>
                  <span>Provedor: {cfg.provider}</span>
                  <span>Modelo: {cfg.model}</span>
                  {cfg.imageStrategy && <span>Imagem: {cfg.imageStrategy}</span>}
                </div>
              </div>
              {!cfg.isActive && (
                <button
                  className={`${styles.button} ${styles.btnSm}`}
                  disabled={busy === cfg.id}
                  onClick={() => activate(cfg.id)}
                >
                  <Power size={15} /> Ativar
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// SEÇÃO: Usuários (admin)
// ---------------------------------------------------------------------------
function UsersSection() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [busy, setBusy] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'author' })

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await api.users.list({ page: 1, limit: 50 })
      setUsers(data || [])
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao carregar usuários.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleCreate = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setSubmitting(true)
    try {
      await api.users.create(form)
      setSuccess('Usuário criado.')
      setForm({ name: '', email: '', password: '', role: 'author' })
      await load()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao criar usuário.')
    } finally {
      setSubmitting(false)
    }
  }

  const toggleStatus = async (u) => {
    setBusy(u.id)
    setError('')
    try {
      await api.users.setStatus(u.id, !u.isActive)
      await load()
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Erro ao alterar status.')
    } finally {
      setBusy(null)
    }
  }

  return (
    <div className={styles.section}>
      <div className={styles.sectionHead}>
        <UsersIcon size={22} />
        <h2>Usuários</h2>
      </div>
      <p className={styles.sectionDesc}>Gerencie contas, papéis e status de acesso.</p>

      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form className={styles.form} onSubmit={handleCreate}>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Nome</label>
            <input className={styles.input} value={form.name} onChange={set('name')} required />
          </div>
          <div className={styles.formGroup}>
            <label>E-mail</label>
            <input className={styles.input} type="email" value={form.email} onChange={set('email')} required />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.formGroup}>
            <label>Senha</label>
            <input className={styles.input} type="password" value={form.password} onChange={set('password')} required />
          </div>
          <div className={styles.formGroup}>
            <label>Papel</label>
            <select className={styles.select} value={form.role} onChange={set('role')}>
              <option value="reader">Leitor</option>
              <option value="author">Autor</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div>
        <button type="submit" className={styles.button} disabled={submitting}>
          {submitting ? <><Loader2 size={18} className={styles.spinner} /> Salvando...</> : <><Plus size={18} /> Criar usuário</>}
        </button>
      </form>

      <h3 style={{ margin: '28px 0 14px', fontSize: '1.1rem' }}>Lista de usuários</h3>
      {loading ? (
        <p className={styles.inlineLoading}><Loader2 size={16} className={styles.spinner} /> Carregando...</p>
      ) : users.length === 0 ? (
        <p className={styles.empty}>Nenhum usuário.</p>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Papel</th>
                <th>Status</th>
                <th>Ação</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td><span className={styles.roleBadge}>{u.role}</span></td>
                  <td>
                    <span className={`${styles.dot} ${u.isActive ? styles.dotOn : styles.dotOff}`} />
                    {u.isActive ? 'Ativo' : 'Inativo'}
                  </td>
                  <td>
                    <button
                      className={`${styles.button} ${styles.buttonGhost} ${styles.btnSm}`}
                      disabled={busy === u.id}
                      onClick={() => toggleStatus(u)}
                    >
                      <Power size={14} /> {u.isActive ? 'Desativar' : 'Ativar'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

// ---------------------------------------------------------------------------
// PÁGINA
// ---------------------------------------------------------------------------
export default function Painel() {
  const router = useRouter()
  const { user, isAuthenticated, loading, role, hasRole } = useAuth()
  const [activeTab, setActiveTab] = useState(null)

  // Redireciona não autenticados.
  useEffect(() => {
    if (!loading && !isAuthenticated) router.push('/login')
  }, [loading, isAuthenticated, router])

  // Monta as abas conforme o papel.
  const tabs = []
  if (hasRole('author', 'editor', 'admin')) {
    tabs.push({ key: 'create', label: 'Criar postagem', icon: <PenSquare size={17} /> })
    tabs.push({ key: 'ai', label: 'Gerar com IA', icon: <Sparkles size={17} /> })
    tabs.push({ key: 'generations', label: 'Minhas gerações', icon: <History size={17} /> })
  }
  if (hasRole('editor', 'admin')) {
    tabs.push({ key: 'review', label: 'Revisão & publicação', icon: <CheckCircle2 size={17} /> })
    tabs.push({ key: 'comments', label: 'Moderação', icon: <MessageSquare size={17} /> })
  }
  if (hasRole('admin')) {
    tabs.push({ key: 'aiconfig', label: 'Configuração de IA', icon: <Settings size={17} /> })
    tabs.push({ key: 'users', label: 'Usuários', icon: <UsersIcon size={17} /> })
  }

  // Define aba inicial.
  const current = activeTab && tabs.some((t) => t.key === activeTab) ? activeTab : tabs[0]?.key

  // ---- Estados de carregamento / acesso ----
  if (loading) {
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.centerState}>
          <Loader2 size={40} className={styles.spinner} />
          <p>Carregando painel...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (!isAuthenticated) {
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.centerState}>
          <Loader2 size={40} className={styles.spinner} />
          <p>Redirecionando para o login...</p>
        </div>
        <Footer />
      </main>
    )
  }

  if (role === 'reader') {
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.centerState}>
          <Lock size={48} style={{ color: 'var(--secondary)' }} />
          <h2>Você não tem acesso ao painel</h2>
          <p>
            Sua conta é de leitor. Você pode ler, curtir e comentar nas postagens do blog,
            mas o painel de gestão é exclusivo para autores, editores e administradores.
          </p>
          <Link href="/blog" className={styles.backLink}>Ir para o blog</Link>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.container}>
        <div className={styles.header}>
          <h1><LayoutDashboard size={34} /> Painel <span>Figa</span></h1>
          <p>Gerencie conteúdo, geração por IA e moderação do blog.</p>
          <div className={styles.userPill}>
            {user?.name}
            <span className={styles.roleBadge}>{role}</span>
          </div>
        </div>

        <div className={styles.tabs}>
          {tabs.map((t) => (
            <button
              key={t.key}
              className={`${styles.tab} ${current === t.key ? styles.tabActive : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          <div className={styles.panel}>
            {current === 'create' && <CreatePostSection role={role} />}
            {current === 'ai' && <GenerateAiSection />}
            {current === 'generations' && <GenerationsSection />}
            {current === 'review' && <ReviewSection />}
            {current === 'comments' && <CommentsModerationSection />}
            {current === 'aiconfig' && <AiConfigSection />}
            {current === 'users' && <UsersSection />}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
