'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from './Navbar.module.css'
import { Sun, Moon, Palette, Menu, X, LayoutDashboard, LogOut, LogIn } from 'lucide-react'
import FigaIcon from '@/components/FigaIcon/FigaIcon'
import { useAuth } from '@/context/AuthContext'

export default function Navbar() {
  const router = useRouter()
  const { isAuthenticated, user, hasRole, logout } = useAuth()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [theme, setTheme] = useState('figa')
  const userRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)

    const savedTheme = localStorage.getItem('figa-theme') || 'figa'
    setTheme(savedTheme)
    document.body.setAttribute('data-theme', savedTheme)

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fecha o dropdown do usuário ao clicar fora.
  useEffect(() => {
    if (!userMenuOpen) return undefined
    const onDoc = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [userMenuOpen])

  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('figa-theme', newTheme)
    document.body.setAttribute('data-theme', newTheme)
  }

  const closeAll = () => {
    setIsMenuOpen(false)
    setUserMenuOpen(false)
  }

  const handleLogout = async () => {
    closeAll()
    await logout()
    router.push('/')
  }

  const initials = (user?.name || user?.email || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join('')

  const isStaff = hasRole('admin', 'editor', 'author')

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo} onClick={closeAll}>
          <div className={styles.logoIcon}>
            <FigaIcon size={24} color="var(--primary)" />
          </div>
          <span className={styles.logoText}>Figa</span>
        </Link>

        <ul className={`${styles.menu} ${isMenuOpen ? styles.active : ''}`}>
          <li><Link href="/" onClick={closeAll}>Portal</Link></li>
          <li><Link href="/quem-somos" onClick={closeAll}>Quem Somos</Link></li>
          <li><Link href="/sistemas" onClick={closeAll}>Sistemas</Link></li>
          <li><Link href="/como-receber" onClick={closeAll}>Como Receber</Link></li>
          <li><Link href="/simulador" onClick={closeAll}>Simulador</Link></li>
          <li><Link href="/clientes" onClick={closeAll}>Clientes</Link></li>
          <li><Link href="/blog" onClick={closeAll}>Blog</Link></li>

          <li className={styles.themeSwitcher}>
            <button
              className={`${styles.themeBtn} ${theme === 'light' ? styles.activeTheme : ''}`}
              onClick={() => toggleTheme('light')}
              aria-label="Tema claro"
            >
              <Sun size={18} />
            </button>
            <button
              className={`${styles.themeBtn} ${theme === 'figa' ? styles.activeTheme : ''}`}
              onClick={() => toggleTheme('figa')}
              aria-label="Tema Figa"
            >
              <Palette size={18} />
            </button>
            <button
              className={`${styles.themeBtn} ${theme === 'dark' ? styles.activeTheme : ''}`}
              onClick={() => toggleTheme('dark')}
              aria-label="Tema escuro"
            >
              <Moon size={18} />
            </button>
          </li>

          {!isAuthenticated && (
            <li>
              <Link href="/login" className={styles.cta} onClick={closeAll}>
                <LogIn size={16} /> Entrar
              </Link>
            </li>
          )}

          {isAuthenticated && (
            <li className={styles.userMenu} ref={userRef}>
              <button
                type="button"
                className={styles.avatarBtn}
                onClick={() => setUserMenuOpen((o) => !o)}
                aria-label="Menu do usuário"
              >
                <span className={styles.avatar}>{initials}</span>
              </button>

              {userMenuOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownHeader}>
                    <span className={styles.dropdownName}>{user?.name || user?.email}</span>
                    <span className={styles.dropdownRole}>{user?.role}</span>
                  </div>
                  {isStaff && (
                    <Link href="/painel" className={styles.dropdownItem} onClick={closeAll}>
                      <LayoutDashboard size={16} /> Painel
                    </Link>
                  )}
                  <button type="button" className={styles.dropdownLogout} onClick={handleLogout}>
                    <LogOut size={16} /> Sair
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        <button className={styles.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Menu">
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  )
}
