'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from './page.module.css'
import {
  MessageSquare, Mail, MessageCircle, Instagram,
  UserPlus, Info, CheckCircle, Clock, Calendar
} from 'lucide-react'

export default function Contato() {
  const contactCards = [
    {
      icon: <MessageCircle size={48} />,
      title: 'WhatsApp',
      desc: 'Fale diretamente com nossa equipe via WhatsApp. Resposta rápida e atendimento personalizado.',
      linkIcon: <MessageCircle size={20} />,
      linkLabel: '+55 (21) 99196-6325',
      href: 'https://wa.me/5521991966325',
      external: true
    },
    {
      icon: <Mail size={48} />,
      title: 'E-mail',
      desc: 'Envie suas dúvidas, sugestões ou solicitações por e-mail. Respondemos em até 24 horas.',
      linkIcon: <Mail size={20} />,
      linkLabel: 'pedro@amplo.app.br',
      href: 'mailto:pedro@amplo.app.br',
      external: false,
      isMailto: true
    },
    {
      icon: <Instagram size={48} />,
      title: 'Instagram',
      desc: 'Siga-nos no Instagram para novidades, dicas e conteúdos sobre direitos autorais musicais.',
      linkIcon: <Instagram size={20} />,
      linkLabel: '@figa.app.br',
      href: 'https://instagram.com/figa.app.br',
      external: true
    },
    {
      icon: <UserPlus size={48} />,
      title: 'Cadastro',
      desc: 'Quer conhecer nossos sistemas? Cadastre-se e agende uma demonstração personalizada.',
      linkIcon: <UserPlus size={20} />,
      linkLabel: 'Cadastre-se Agora',
      href: '/cadastro',
      internal: true
    }
  ]

  const renderCard = (card, i) => {
    const linkContent = (
      <>
        {card.linkIcon}
        {card.linkLabel}
      </>
    )

    let link
    if (card.internal) {
      link = (
        <Link href={card.href} className={styles.contactLink}>
          {linkContent}
        </Link>
      )
    } else if (card.isMailto) {
      link = (
        <a href={card.href} className={styles.contactLink}>
          {linkContent}
        </a>
      )
    } else {
      link = (
        <a
          href={card.href}
          className={styles.contactLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkContent}
        </a>
      )
    }

    return (
      <motion.div
        key={i}
        className={styles.contactCard}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
        whileHover={{ y: -10 }}
      >
        <div className={styles.contactIcon}>{card.icon}</div>
        <h3>{card.title}</h3>
        <p>{card.desc}</p>
        {link}
      </motion.div>
    )
  }

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.container}>
        {/* HERO */}
        <motion.section
          className={styles.hero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1><MessageSquare size={40} /> Entre em <span>Contato</span></h1>
          <p className={styles.subtitle}>Estamos prontos para ajudar você</p>
          <p>Nossa equipe está disponível para esclarecer dúvidas, agendar demonstrações e apresentar nossas soluções em gestão de direitos autorais musicais.</p>
        </motion.section>

        {/* CONTACT CARDS */}
        <div className={styles.contactGrid}>
          {contactCards.map((card, i) => renderCard(card, i))}
        </div>

        {/* COMO PODEMOS AJUDAR */}
        <motion.div
          className={styles.infoBox}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h3><Info size={28} /> Como Podemos Ajudar</h3>
          <ul>
            <li><CheckCircle size={20} /> <span><strong>Demonstração:</strong> Agende uma apresentação dos nossos sistemas de gestão de direitos</span></li>
            <li><CheckCircle size={20} /> <span><strong>Consultoria:</strong> Tire dúvidas sobre arrecadação, distribuição e análise de dados</span></li>
            <li><CheckCircle size={20} /> <span><strong>Suporte Técnico:</strong> Ajuda com uso das ferramentas e relatórios</span></li>
            <li><CheckCircle size={20} /> <span><strong>Parcerias:</strong> Converse sobre integração de sistemas e parcerias comerciais</span></li>
            <li><CheckCircle size={20} /> <span><strong>Educacional:</strong> Informações sobre direitos autorais, associações e processos</span></li>
          </ul>
        </motion.div>

        {/* HORÁRIO DE ATENDIMENTO */}
        <motion.div
          className={styles.infoBox}
          style={{ marginTop: '2rem' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <h3><Clock size={28} /> Horário de Atendimento</h3>
          <ul>
            <li><Calendar size={20} /> <span><strong>Segunda a Sexta:</strong> 9h às 18h</span></li>
            <li><Calendar size={20} /> <span><strong>WhatsApp:</strong> Respostas em até 2 horas (horário comercial)</span></li>
            <li><Mail size={20} /> <span><strong>E-mail:</strong> Respostas em até 24 horas úteis</span></li>
          </ul>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
