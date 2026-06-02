'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from './page.module.css'
import {
  FileSignature, Star, Zap, UploadCloud, Shield, Users,
  Barcode, CheckCircle, Bell, Send, Info, MessageCircle
} from 'lucide-react'

export default function RegistroObras() {
  const [email, setEmail] = useState('')
  const [notified, setNotified] = useState(false)

  const features = [
    {
      icon: <Zap />,
      title: 'Registro Rápido',
      desc: 'Cadastre suas obras em minutos com formulários inteligentes'
    },
    {
      icon: <UploadCloud />,
      title: '100% Online',
      desc: 'Sem papelada, sem burocracia, tudo pela internet'
    },
    {
      icon: <Shield />,
      title: 'Segurança Total',
      desc: 'Blockchain e criptografia para proteger seus direitos'
    },
    {
      icon: <Users />,
      title: 'Gestão de Coautores',
      desc: 'Defina splits e participações automaticamente'
    },
    {
      icon: <Barcode />,
      title: 'Códigos Automáticos',
      desc: 'ISWC gerado automaticamente no registro'
    },
    {
      icon: <CheckCircle />,
      title: 'Validação Inteligente',
      desc: 'Sistema detecta duplicatas e valida metadados'
    }
  ]

  const handleNotify = (e) => {
    e.preventDefault()
    setNotified(true)
    setEmail('')
  }

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.container}>
        <motion.div
          className={styles.comingSoon}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div
            className={styles.comingSoonIcon}
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <FileSignature size={120} />
          </motion.div>

          <h1>Registro de Obras</h1>
          <p className={styles.subtitle}>Sistema Digital, Facilitado e Online</p>
          <p>Estamos desenvolvendo uma plataforma revolucionária para registro de obras musicais de forma 100% digital, rápida e descomplicada. Em breve, você poderá registrar suas músicas com poucos cliques.</p>

          <div className={styles.featuresPreview}>
            <h2><Star size={24} /> O Que Vem Por Aí</h2>
            <div className={styles.featuresGrid}>
              {features.map((feature, i) => (
                <div key={i} className={styles.featureItem}>
                  <span className={styles.featureIcon}>{feature.icon}</span>
                  <div className={styles.featureContent}>
                    <h3>{feature.title}</h3>
                    <p>{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.notifyBox}>
            <h3><Bell size={28} /> Seja Notificado</h3>
            <p>Deixe seu e-mail e seja o primeiro a saber quando o sistema estiver no ar</p>
            <form className={styles.notifyForm} onSubmit={handleNotify}>
              <input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                <Send size={18} /> Quero Saber
              </button>
            </form>
            {notified && (
              <p className={styles.notifySuccess}>
                Obrigado! Você será notificado quando o sistema estiver disponível.
              </p>
            )}
            <p className={styles.notifyInfo}>
              <Info size={16} /> Enquanto isso, entre em contato via WhatsApp para saber mais sobre nossos serviços atuais.
            </p>
          </div>

          <a
            href="https://wa.me/5521991966325"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            <MessageCircle size={22} /> Falar com Especialista
          </a>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
