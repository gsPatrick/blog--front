'use client'

import { useState, useEffect } from 'react'
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
  const [theme, setTheme] = useState('figa')

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    
    const savedTheme = localStorage.getItem('figa-theme') || 'figa'
    setTheme(savedTheme)
    document.body.setAttribute('data-theme', savedTheme)
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = (newTheme) => {
    setTheme(newTheme)
    localStorage.setItem('figa-theme', newTheme)
    document.body.setAttribute('data-theme', newTheme)
  }

  const handleLogout = async () => {
    setIsMenuOpen(false)
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
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <FigaIcon size={24} color="var(--primary)" />
          </div>
          <span className={styles.logoText}>Figa</span>
        </Link>

        <ul className={`${styles.menu} ${isMenuOpen ? styles.active : ''}`}>
          <li><Link href="/" onClick={() => setIsMenuOpen(false)}>Portal</Link></li>
          <li><Link href="/quem-somos" onClick={() => setIsMenuOpen(false)}>Quem Somos</Link></li>
          <li><Link href="/sistemas" onClick={() => setIsMenuOpen(false)}>Sistemas</Link></li>
          <li><Link href="/como-receber" onClick={() => setIsMenuOpen(false)}>Como Receber</Link></li>
          <li><Link href="/simulador" onClick={() => setIsMenuOpen(false)}>Simulador</Link></li>
          <li><Link href="/clientes" onClick={() => setIsMenuOpen(false)}>Clientes</Link></li>
          <li><Link href="/blog" onClick={() => setIsMenuOpen(false)}>Blog</Link></li>
          
          <li className={styles.themeSwitcher}>
            <button 
              className={`${styles.themeBtn} ${theme === 'light' ? styles.activeTheme : ''}`}
              onClick={() => toggleTheme('light')}
            >
              <Sun size={18} />
            </button>
            <button 
              className={`${styles.themeBtn} ${theme === 'figa' ? styles.activeTheme : ''}`}
              onClick={() => toggleTheme('figa')}
            >
              <Palette size={18} />
            </button>
            <button 
              className={`${styles.themeBtn} ${theme === 'dark' ? styles.activeTheme : ''}`}
              onClick={() => toggleTheme('dark')}
            >
              <Moon size={18} />
            </button>
          </li>

          <li>
            <Link href="/contato" className={styles.cta} onClick={() => setIsMenuOpen(false)}>
              Contato
            </Link>
          </li>

          {!isAuthenticated && (
            <li>
              <Link href="/login" className={styles.authLink} onClick={() => setIsMenuOpen(false)}>
                <LogIn size={16} /> Entrar
              </Link>
            </li>
          )}

          {isAuthenticated && (
            <li className={styles.authArea}>
              {isStaff && (
                <Link href="/painel" className={styles.authLink} onClick={() => setIsMenuOpen(false)}>
                  <LayoutDashboard size={16} /> Painel
                </Link>
              )}
              <span className={styles.userBadge} title={user?.name || user?.email}>
                <span className={styles.avatar}>{initials}</span>
                <span className={styles.userName}>{user?.name || user?.email}</span>
              </span>
              <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
                <LogOut size={16} /> Sair
              </button>
            </li>
          )}
        </ul>

        <button className={styles.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  )
}
