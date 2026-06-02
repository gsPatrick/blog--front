'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { useAuth } from '@/context/AuthContext'
import styles from './page.module.css'
import { LogIn, Mail, Lock, Loader2, Info } from 'lucide-react'

export default function Login() {
  const router = useRouter()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const user = await login(email, password)
      const isStaff = ['admin', 'editor', 'author'].includes(user?.role)
      router.push(isStaff ? '/painel' : '/blog')
    } catch (err) {
      setError(err?.message || 'Não foi possível entrar. Tente novamente.')
      setSubmitting(false)
    }
  }

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.container}>
        <motion.div
          className={styles.card}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.header}>
            <h1><LogIn size={32} /> Entrar</h1>
            <p>Acesse sua conta para gerenciar conteúdo e interagir no blog.</p>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="email"><Mail size={16} /> E-mail</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="voce@exemplo.com"
                autoComplete="email"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="password"><Lock size={16} /> Senha</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={submitting}>
              {submitting ? (
                <><Loader2 size={20} className={styles.spinner} /> Entrando...</>
              ) : (
                <><LogIn size={20} /> Entrar</>
              )}
            </button>
          </form>

          <p className={styles.altLink}>
            Não tem conta? <Link href="/register">Cadastre-se</Link>
          </p>

          <div className={styles.hintBox}>
            <h4><Info size={18} /> Logins de teste</h4>
            <p>Senha para todos: <strong>admin</strong></p>
            <ul>
              <li>admin@admin.com <span>(admin)</span></li>
              <li>editor@admin.com <span>(editor)</span></li>
              <li>redator@admin.com <span>(author)</span></li>
              <li>leitor@admin.com <span>(leitor)</span></li>
            </ul>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
