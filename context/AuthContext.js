'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { api, tokenStore, ApiError } from '@/lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Ao montar, tenta restaurar a sessão a partir dos tokens salvos.
  useEffect(() => {
    let active = true
    async function restore() {
      if (!tokenStore.access && !tokenStore.refresh) {
        setLoading(false)
        return
      }
      try {
        const me = await api.auth.me()
        if (active) setUser(me)
      } catch (err) {
        // Access token expirado? tenta renovar com o refresh token.
        if (err instanceof ApiError && tokenStore.refresh) {
          try {
            const tokens = await api.auth.refresh(tokenStore.refresh)
            tokenStore.set(tokens)
            const me = await api.auth.me()
            if (active) setUser(me)
          } catch (_e) {
            tokenStore.clear()
          }
        } else {
          tokenStore.clear()
        }
      } finally {
        if (active) setLoading(false)
      }
    }
    restore()
    return () => {
      active = false
    }
  }, [])

  const login = useCallback(async (email, password) => {
    const data = await api.auth.login({ email, password })
    tokenStore.set({ accessToken: data.accessToken, refreshToken: data.refreshToken })
    setUser(data.user)
    return data.user
  }, [])

  const register = useCallback(async (payload) => {
    const data = await api.auth.register(payload)
    tokenStore.set({ accessToken: data.accessToken, refreshToken: data.refreshToken })
    setUser(data.user)
    return data.user
  }, [])

  const logout = useCallback(async () => {
    try {
      if (tokenStore.refresh) await api.auth.logout(tokenStore.refresh)
    } catch (_e) {
      /* ignora erro de logout */
    }
    tokenStore.clear()
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    try {
      const me = await api.auth.me()
      setUser(me)
      return me
    } catch (_e) {
      return null
    }
  }, [])

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    role: user ? user.role : null,
    hasRole: (...roles) => Boolean(user) && roles.includes(user.role),
    login,
    register,
    logout,
    refreshUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth deve ser usado dentro de <AuthProvider>')
  return ctx
}
