'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from './page.module.css'
import { 
  Cpu, Database, ShieldCheck, Users, 
  Plug, ArrowRightLeft, Share2, 
  TrendingUp, Bot, Bell, Lightbulb,
  Check, MessageCircle
} from 'lucide-react'

export default function Sistemas() {
  const plataformaCards = [
    {
      icon: <Database />,
      title: 'Big Data & Analytics',
      desc: 'Processamento de milhões de registros de execuções, streams e royalties com tecnologia de ponta.',
      items: ['Ingestão de múltiplas fontes', 'Processamento em tempo real', 'Data warehouse otimizado', 'Machine learning para padrões']
    },
    {
      icon: <ShieldCheck />,
      title: 'Governança & LGPD',
      desc: 'Conformidade total com LGPD, segurança de dados e governança corporativa.',
      items: ['Criptografia end-to-end', 'Controle de acesso granular', 'Auditoria completa de acessos', 'Backup automático e redundância']
    },
    {
      icon: <Users />,
      title: 'Equipe Própria',
      desc: 'Time técnico especializado dedicado ao desenvolvimento e manutenção dos sistemas.',
      items: ['Engenheiros de dados sêniores', 'Especialistas em direitos autorais', 'DevOps e infraestrutura cloud', 'Suporte técnico dedicado']
    }
  ]

  const integracaoCards = [
    {
      icon: <Plug />,
      title: 'APIs Públicas',
      desc: 'APIs RESTful documentadas para integração com sistemas de terceiros.',
      items: ['Documentação OpenAPI', 'Autenticação OAuth 2.0', 'Rate limiting e quotas', 'SDKs (JS, Python, PHP)']
    },
    {
      icon: <ArrowRightLeft />,
      title: 'Webhooks & Real-time',
      desc: 'Notificações em tempo real para eventos importantes nos seus dados.',
      items: ['Eventos customizáveis', 'Retry automático', 'Payload assinado', 'Suporte a WebSocket']
    },
    {
      icon: <Share2 />,
      title: 'Integrações Nativas',
      desc: 'Conectores prontos para principais plataformas do mercado musical.',
      items: ['Spotify, Apple, Deezer', 'YouTube, TikTok, Meta', 'Distribuidoras digitais', 'Sistemas de associações']
    }
  ]

  const advancedCards = [
    {
      icon: <TrendingUp />,
      title: 'Dashboard Interativo',
      desc: 'Visualização em tempo real de todos os seus dados consolidados.',
      items: ['Gráficos dinâmicos', 'Filtros avançados', 'Drill-down por obra', 'Exportação (Excel, PDF, CSV)']
    },
    {
      icon: <Bot />,
      title: 'Matching Inteligente',
      desc: 'Algoritmos de IA para reconciliação automática de dados.',
      items: ['Matching por ISRC/ISWC', 'Fuzzy matching de títulos', 'Detecção de duplicatas', 'Sugestões automáticas']
    },
    {
      icon: <Bell />,
      title: 'Alertas & Notificações',
      desc: 'Sistema inteligente de alertas para anomalias e oportunidades.',
      items: ['Detecção de divergências', 'Valores não pagos', 'Novos usos detectados', 'E-mail e WhatsApp']
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
            <div className={styles.heroIcon}><Cpu size={40} /></div>
            <h1>Sistemas <span>Figa</span></h1>
            <p>Tecnologia avançada para gestão de grandes volumes de dados de direitos autorais com governança, segurança e equipe própria especializada.</p>
          </motion.div>
        </div>
      </section>

      {/* PLATAFORMA */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Plataforma de <span>Dados</span></h2>
          <p className={styles.sectionSubtitle}>Processamos grandes volumes de dados de múltiplas fontes com governança LGPD e equipe técnica própria dedicada.</p>
          
          <div className={styles.grid}>
            {plataformaCards.map((card, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <ul>
                  {card.items.map((item, j) => (
                    <li key={j}><Check size={14} /> {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRAÇÕES */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Integrações & <span>APIs</span></h2>
          <p className={styles.sectionSubtitle}>Conectamos com principais plataformas, distribuidoras e sistemas de terceiros através de APIs robustas e seguras.</p>
          
          <div className={styles.grid}>
            {integracaoCards.map((card, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <ul>
                  {card.items.map((item, j) => (
                    <li key={j}><Check size={14} /> {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANÇADO */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Funcionalidades <span>Avançadas</span></h2>
          
          <div className={styles.grid}>
            {advancedCards.map((card, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
                <ul>
                  {card.items.map((item, j) => (
                    <li key={j}><Check size={14} /> {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INFO BOX */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.infoBox}>
            <h3><Lightbulb size={24} /> Por Que Escolher a Figa?</h3>
            <p>
              Trabalhamos com <strong>grandes volumes de dados</strong> de clientes consolidados, oferecendo governança de dados robusta, conformidade LGPD e uma <strong>equipe técnica própria</strong> dedicada. Nossa tecnologia proprietária processa milhões de registros diariamente, identificando inconsistências, recuperando valores perdidos e fornecendo insights acionáveis.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>Transforme Seus Dados em Resultados</h2>
          <p>Agende uma demonstração e veja nossos sistemas em ação.</p>
          <a href="https://wa.me/5521991966325" target="_blank" className={styles.ctaButton}>
            <MessageCircle size={20} /> Falar com Especialista
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
