'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from './page.module.css'
import {
  Music, Check, TrendingUp, Database, Shield,
  UserCog, Users, Building2, Handshake, Mic,
  MessageCircle
} from 'lucide-react'

export default function Clientes() {
  const featuredStats = [
    { value: <TrendingUp size={32} />, label: 'Analytics Avançado' },
    { value: <Database size={32} />, label: 'Big Data' },
    { value: <Shield size={32} />, label: 'LGPD Compliance' },
    { value: '100%', label: 'Transparência' }
  ]

  const sbacemFeatures = [
    'Visualização de dados em tempo real',
    'Dashboard interativo com gráficos',
    'Cruzamento automático de múltiplas fontes',
    'Relatórios detalhados por obra',
    'Transparência no processo de distribuição'
  ]

  const clients = [
    {
      icon: <UserCog />,
      title: 'Artistas e Compositores',
      desc: 'Profissionais da música que buscam entender e maximizar seus direitos autorais através de dados claros e análises inteligentes.'
    },
    {
      icon: <Users />,
      title: 'Associações',
      desc: 'Entidades de gestão coletiva que precisam de tecnologia para otimizar processos e oferecer transparência aos filiados.'
    },
    {
      icon: <Building2 />,
      title: 'Editoras Musicais',
      desc: 'Empresas que gerenciam catálogos musicais e precisam de ferramentas robustas para análise e cruzamento de dados.'
    },
    {
      icon: <TrendingUp />,
      title: 'Gestores de Catálogo',
      desc: 'Profissionais que administram múltiplas obras e necessitam de visão consolidada e relatórios detalhados.'
    },
    {
      icon: <Handshake />,
      title: 'Produtores Musicais',
      desc: 'Produtores que participam dos royalties e querem acompanhar seus direitos de forma organizada e eficiente.'
    },
    {
      icon: <Mic />,
      title: 'Intérpretes',
      desc: 'Artistas que executam obras e buscam clareza sobre direitos conexos e participações em gravações.'
    }
  ]

  return (
    <main className={styles.main}>
      <Navbar />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.heroContent}
          >
            <h1>Clientes e <span>Parceiros</span></h1>
            <p className={styles.subtitle}>Confiança, Tecnologia e Resultados</p>
            <p className={styles.heroText}>A Figa tem orgulho de trabalhar com artistas, compositores e associações que confiam em nossa tecnologia para trazer clareza e inteligência ao mundo dos direitos autorais.</p>
          </motion.div>
        </div>
      </section>

      {/* FEATURED CLIENT: SBACEM */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Parceiro <span>Destaque</span></h2>
          <motion.div
            className={styles.featuredClient}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.featuredContent}>
              <div className={styles.featuredLogo}>
                <div className={styles.logoPlaceholder}>
                  <Music size={80} className={styles.logoPlaceholderIcon} />
                  <h3>SBACEM</h3>
                  <p>Sociedade Brasileira de Autores, Compositores e Escritores de Música</p>
                </div>
              </div>
              <div className={styles.featuredInfo}>
                <h3>SBACEM Digital</h3>
                <p>Desenvolvemos o <strong>SBACEM Digital</strong>, um sistema avançado de visualização de dados para a associação:</p>
                <ul className={styles.featuredList}>
                  {sbacemFeatures.map((feature, i) => (
                    <li key={i}><Check size={18} className={styles.checkIcon} />{feature}</li>
                  ))}
                </ul>
                <div className={styles.featuredStats}>
                  {featuredStats.map((stat, i) => (
                    <div key={i} className={styles.statItem}>
                      <div className={styles.statNumber}>{stat.value}</div>
                      <div className={styles.statLabel}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CLIENT TYPES */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nossos <span>Clientes</span></h2>
          <p className={styles.intro}>Atendemos diferentes perfis do mercado musical com soluções tecnológicas personalizadas.</p>

          <div className={styles.clientsGrid}>
            {clients.map((client, i) => (
              <motion.div
                key={i}
                className={styles.clientCard}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={styles.clientIcon}>{client.icon}</div>
                <h3>{client.title}</h3>
                <p>{client.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.ctaSection}>
            <h2>Junte-se aos Nossos Clientes</h2>
            <p>Faça parte do grupo de profissionais que escolheram clareza, tecnologia e resultados para seus direitos autorais.</p>
            <a
              href="https://wa.me/5521991966325"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              <MessageCircle size={20} /> Fale Conosco Agora
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
