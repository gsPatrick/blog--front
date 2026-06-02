'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import FigaIcon from '@/components/FigaIcon/FigaIcon'
import styles from './page.module.css'
import { 
  Gem, Target, Rocket, 
  Scale, Code, Flag, TrendingUp,
  Settings, Cpu, Handshake,
  Music, Database, Globe, Shield,
  Linkedin, Mail, ChevronRight
} from 'lucide-react'

export default function QuemSomos() {
  const amuletoCards = [
    {
      icon: <Gem />,
      title: 'Essência da Marca',
      desc: 'A Figa transcende a consultoria tradicional, posicionando-se como o amuleto moderno que protege e maximiza o valor da música na era digital.'
    },
    {
      icon: <Target />,
      title: 'Posicionamento Único',
      desc: 'União estratégica entre tradição cultural brasileira e inteligência de dados de ponta.'
    },
    {
      icon: <Rocket />,
      title: 'Missão',
      desc: 'Proteger, otimizar e valorizar o patrimônio musical através de inteligência de dados e expertise especializada.'
    }
  ]

  const diferencas = [
    {
      icon: <Scale />,
      title: 'Neutralidade Consultiva',
      desc: 'Não somos editora, distribuidora ou associação. Somos advisors independentes focados 100% no interesse do cliente.'
    },
    {
      icon: <Code />,
      title: 'Expertise Técnica',
      desc: 'Domínio completo de DDEX, CWR, ISRC/ISWC. Integração com sistemas globais e metadata standards.'
    },
    {
      icon: <Flag />,
      title: 'Fluência Brasil',
      desc: 'Conhecimento profundo das entidades de gestão coletiva e compreensão das nuances legais e culturais nacionais.'
    },
    {
      icon: <TrendingUp />,
      title: 'Precisão de Dados',
      desc: 'Tecnologia de ponta para matching de obras, validação de metadados e otimização de distribuição digital.'
    }
  ]

  const servicos = [
    {
      icon: <Settings />,
      title: 'SISTEMAS',
      items: [
        'Gestão de catálogos musicais',
        'Reconciliação automática de dados',
        'Dashboard de analytics em tempo real',
        'Monitoramento de plataformas digitais'
      ]
    },
    {
      icon: <Cpu />,
      title: 'TECNOLOGIAS',
      items: [
        'Integração DDEX/CWR completa',
        'Governança de dados e compliance LGPD',
        'APIs customizadas para plataformas',
        'Automação de processos de metadata'
      ]
    },
    {
      icon: <Handshake />,
      title: 'CONSULTORIA & PARCERIA',
      items: [
        'Consultoria focada em ROI e valor agregado',
        'Parceria estratégica para crescimento',
        'Auditoria completa de metadados e receitas',
        'Estratégia de distribuição e otimização',
        'Assessoria especializada em direitos autorais'
      ]
    }
  ]

  const steps = [
    { num: 1, title: 'DIAGNÓSTICO', desc: 'Análise completa do seu catálogo e identificação de oportunidades.' },
    { num: 2, title: 'ANÁLISE', desc: 'Cruzamento de dados, validação ISRC/ISWC e mapeamento de gaps.' },
    { num: 3, title: 'IMPLEMENTAÇÃO', desc: 'Correção de metadados e integração DDEX/CWR com plataformas.' },
    { num: 4, title: 'OTIMIZAÇÃO', desc: 'Monitoramento ativo e relatórios periódicos de performance.' }
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
            <div className={styles.heroLogo}>
              <FigaIcon size={50} color="var(--primary)" />
            </div>
            <h1>Quem <span>Somos</span></h1>
            <p className={styles.subtitle}>Proteção Inteligente de Direitos Musicais</p>
            <p className={styles.tagline}>Sistemas, Tecnologias e Consultoria através de Precisão de Dados</p>
          </motion.div>
        </div>
      </section>

      {/* AMULETO MODERNO */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>O <span>Amuleto Moderno</span></h2>
          <div className={styles.grid3}>
            {amuletoCards.map((card, i) => (
              <motion.div key={i} className={styles.card} whileHover={{ y: -10 }}>
                <div className={styles.cardIcon}>{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNDADOR */}
      <section className={`${styles.section} ${styles.fundadorSection}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Quem está por trás da <span>Figa</span></h2>
          <div className={styles.fundadorContent}>
            <div className={styles.fundadorImageWrapper}>
              <img src="https://www.genspark.ai/api/files/s/mU311sQQ" alt="Pedro Figueira" />
              <div className={styles.fundadorBadge}>
                <Shield size={16} />
                <span>Fundador</span>
              </div>
            </div>
            <div className={styles.fundadorInfo}>
              <h3>Pedro Figueira</h3>
              <p className={styles.cargo}>Fundador e Gestor de Operações | Especialista em Dados Musicais</p>
              
              <div className={styles.bio}>
                <p><strong>Profissional multidisciplinar com experiência única no mercado de direitos autorais musicais.</strong> Ao longo de sua trajetória, Pedro trabalhou em diferentes frentes do ecossistema musical brasileiro, adquirindo uma visão 360° do mercado.</p>
                <p>Sua experiência no <strong>ECAD</strong> foi fundamental: atuou tanto na <strong>arrecadação</strong> quanto na <strong>distribuição</strong> de direitos autorais, compreendendo profundamente os desafios e processos de cada etapa.</p>
                <p>Paralelamente, desenvolveu expertise em <strong>cruzamento de informações</strong> e <strong>análise de grandes volumes de dados</strong>. É sócio conselheiro da <strong>geosemfronteiras.org</strong>, organização focada em inteligência de dados e IA.</p>
              </div>

              <div className={styles.expertiseGrid}>
                <div className={styles.expertiseItem}><Music size={18} /><span>Direitos Autorais</span></div>
                <div className={styles.expertiseItem}><Database size={18} /><span>Big Data</span></div>
                <div className={styles.expertiseItem}><TrendingUp size={18} /><span>Business Intelligence</span></div>
                <div className={styles.expertiseItem}><Globe size={18} /><span>Geoprocessamento</span></div>
              </div>

              <div className={styles.fundadorActions}>
                <a href="#" className={styles.btnLinkedin}><Linkedin size={18} /> LinkedIn</a>
                <a href="#" className={styles.btnEmail}><Mail size={18} /> Contato</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIFERENCIAÇÃO */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nossa <span>Diferenciação Única</span></h2>
          <div className={styles.grid4}>
            {diferencas.map((item, i) => (
              <div key={i} className={styles.cardSmall}>
                <div className={styles.cardIconSmall}>{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVIÇOS DETALHADOS */}
      <section className={`${styles.section} ${styles.servicosSection}`}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Nossos <span>Serviços</span></h2>
          <div className={styles.grid3}>
            {servicos.map((s, i) => (
              <div key={i} className={styles.servicoCard}>
                <div className={styles.servicoHeader}>
                  {s.icon}
                  <h3>{s.title}</h3>
                </div>
                <ul>
                  {s.items.map((item, j) => (
                    <li key={j}><ChevronRight size={14} /> {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO TRABALHAMOS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Como <span>Trabalhamos</span></h2>
          <div className={styles.steps}>
            {steps.map((step, i) => (
              <div key={i} className={styles.step}>
                <div className={styles.stepNum}>{step.num}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
