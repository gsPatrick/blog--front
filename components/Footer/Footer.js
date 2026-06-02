'use client'

import Link from 'next/link'
import styles from './Footer.module.css'
import { Instagram, Mail, Globe, MessageCircle } from 'lucide-react'
import FigaIcon from '@/components/FigaIcon/FigaIcon'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.section}>
            <div className={styles.logo}>
              <FigaIcon size={30} color="var(--secondary)" />
              <h3>Figa</h3>
            </div>
            <p className={styles.description}>
              Proteção Inteligente de Direitos Musicais através de Sistemas, Tecnologias e Consultoria.
            </p>
          </div>

          <div className={styles.section}>
            <h4 className={styles.title}>Portal</h4>
            <ul className={styles.links}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/quem-somos">Quem Somos</Link></li>
              <li><Link href="/sistemas">Sistemas & Tecnologia</Link></li>
              <li><Link href="/clientes">Clientes</Link></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.title}>Educação</h4>
            <ul className={styles.links}>
              <li><Link href="/como-receber">Como Receber</Link></li>
              <li><Link href="/distribuicao">Distribuição</Link></li>
              <li><Link href="/como-pagar">Como Pagar</Link></li>
              <li><Link href="/simulador">Simulador</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>

          <div className={styles.section}>
            <h4 className={styles.title}>Contato</h4>
            <ul className={styles.contactList}>
              <li>
                <a href="https://wa.me/5521991966325" target="_blank" rel="noopener noreferrer">
                  <MessageCircle size={18} /> WhatsApp: (21) 99196-6325
                </a>
              </li>
              <li>
                <a href="mailto:pedro@amplo.app.br">
                  <Mail size={18} /> pedro@amplo.app.br
                </a>
              </li>
              <li>
                <a href="https://instagram.com/figa.app.br" target="_blank" rel="noopener noreferrer">
                  <Instagram size={18} /> @figa.app.br
                </a>
              </li>
              <li>
                <a href="https://figa.app.br" target="_blank" rel="noopener noreferrer">
                  <Globe size={18} /> figa.app.br
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© 2026 Figa. Proteção Inteligente de Direitos Musicais.</p>
        </div>
      </div>
    </footer>
  )
}
