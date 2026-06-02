'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './PortalGrid.module.css'
import { 
  Users, Cpu, Route, Network, 
  Receipt, HandCoins, ReceiptText, Handshake, 
  FileSignature, Newspaper, UserPlus 
} from 'lucide-react'

const CARDS = [
  {
    title: 'Quem Somos',
    desc: 'Conheça a Figa, nossa missão, valores e como protegemos seus direitos musicais.',
    icon: <Users />,
    tag: 'Sobre Nós',
    link: '/quem-somos'
  },
  {
    title: 'Sistemas & Tecnologia',
    desc: 'Plataforma de gestão completa com dashboard, análise de dados e APIs.',
    icon: <Cpu />,
    tag: 'Tecnologia',
    link: '/sistemas'
  },
  {
    title: 'Como Receber Direitos',
    desc: 'Passo a passo completo: cadastro, associação e recebimento de royalties.',
    icon: <Route />,
    tag: 'Guia Prático',
    link: '/como-receber'
  },
  {
    title: 'Distribuição de Direitos',
    desc: 'Como funciona a distribuição, códigos ISRC/ISWC e tipos de direitos.',
    icon: <Network />,
    tag: 'Educacional',
    link: '/distribuicao'
  },
  {
    title: 'Como Pagar Direitos',
    desc: 'Entenda o processo de pagamento e regras de cobrança por segmento.',
    icon: <Receipt />,
    tag: 'Processos',
    link: '/como-pagar'
  },
  {
    title: 'Quanto Vou Receber',
    desc: 'Simule seus ganhos com streaming, shows e rádio/TV.',
    icon: <HandCoins />,
    tag: 'Simulador',
    link: '/simulador#receber'
  },
  {
    title: 'Quanto Vou Pagar',
    desc: 'Calcule valores de direitos autorais para seu estabelecimento ou evento.',
    icon: <ReceiptText />,
    tag: 'Simulador',
    link: '/simulador#pagar'
  },
  {
    title: 'Clientes & Parceiros',
    desc: 'Conheça nossos parceiros como a SBACEM e casos de sucesso.',
    icon: <Handshake />,
    tag: 'Confiança',
    link: '/clientes'
  },
  {
    title: 'Registro de Obras',
    desc: 'Sistema digital facilitado para proteger seus direitos de forma rápida.',
    icon: <FileSignature />,
    tag: 'Em Breve',
    link: '/registro-obras'
  },
  {
    title: 'Blog & Notícias',
    desc: 'Últimas novidades do mercado, tendências e análises do setor.',
    icon: <Newspaper />,
    tag: 'Atualizações',
    link: '/blog'
  },
  {
    title: 'Cadastro',
    desc: 'Junte-se à Figa e gerencie seus direitos com inteligência e tecnologia.',
    icon: <UserPlus />,
    tag: 'Começar',
    link: '/cadastro'
  }
]

export default function PortalGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Explore o <span>Portal</span></h2>
          <div className={styles.line} />
        </div>

        <div className={styles.grid}>
          {CARDS.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: (index % 3) * 0.1 }}
              viewport={{ once: true }}
            >
              <Link href={card.link} className={styles.card}>
                <div className={styles.iconWrapper}>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <span className={styles.tag}>{card.tag}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
