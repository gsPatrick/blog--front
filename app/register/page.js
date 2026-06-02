'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { useAuth } from '@/context/AuthContext'
import styles from './page.module.css'
import { UserPlus, User, Mail, Lock, Loader2 } from 'lucide-react'

export default function Register() {
  const router = useRouter()
  const { register } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('As senhas não coincidem.')
      return
    }

    setSubmitting(true)
    try {
      await register({ name, email, password })
      router.push('/blog')
    } catch (err) {
      setError(err?.message || 'Não foi possível cadastrar. Tente novamente.')
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
            <h1><UserPlus size={32} /> Criar conta</h1>
            <p>Cadastre-se para comentar, curtir e acompanhar o blog da Figa.</p>
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name"><User size={16} /> Nome</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Seu nome completo"
                autoComplete="name"
                required
              />
            </div>

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
                autoComplete="new-password"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="confirm"><Lock size={16} /> Confirmar senha</label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                autoComplete="new-password"
                required
              />
            </div>

            <button type="submit" className={styles.submitButton} disabled={submitting}>
              {submitting ? (
                <><Loader2 size={20} className={styles.spinner} /> Cadastrando...</>
              ) : (
                <><UserPlus size={20} /> Criar conta</>
              )}
            </button>
          </form>

          <p className={styles.altLink}>
            Já tem conta? <Link href="/login">Entrar</Link>
          </p>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
