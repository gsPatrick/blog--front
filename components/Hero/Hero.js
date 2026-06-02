'use client'

import { motion } from 'framer-motion'
import styles from './Hero.module.css'
import FigaIcon from '@/components/FigaIcon/FigaIcon'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.glow} />
      
      <div className={styles.container}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.content}
        >
          <motion.div 
            className={styles.mainLogo}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <FigaIcon size={60} color="var(--primary)" />
          </motion.div>

          <h1 className={styles.title}>
            Portal <span>Figa</span>
          </h1>
          
          <p className={styles.tagline}>
            Proteção Inteligente de Direitos Musicais
          </p>

          <p className={styles.description}>
            Sistemas, Tecnologias e Consultoria através de Precisão de Dados.<br />
            Navegue pelo portal e conheça tudo sobre direitos autorais musicais.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
