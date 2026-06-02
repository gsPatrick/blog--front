'use client'

import styles from './ServicosQuick.module.css'
import { Settings, Cpu, Handshake } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ServicosQuick() {
  const servicos = [
    {
      icon: <Settings size={40} />,
      title: 'SISTEMAS',
      desc: 'Gestão de catálogos musicais, reconciliação automática de dados e dashboard analytics em tempo real.'
    },
    {
      icon: <Cpu size={40} />,
      title: 'TECNOLOGIAS',
      desc: 'Integração DDEX/CWR completa, governança de dados LGPD e APIs customizadas para plataformas.'
    },
    {
      icon: <Handshake size={40} />,
      title: 'CONSULTORIA',
      desc: 'Auditoria completa de metadados, otimização de receitas e estratégias de distribuição digital.'
    }
  ]

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Nossos <span>Serviços</span></h2>
        
        <div className={styles.grid}>
          {servicos.map((s, i) => (
            <motion.div 
              key={i} 
              className={styles.item}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className={styles.icon}>{s.icon}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
