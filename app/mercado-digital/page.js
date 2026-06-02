'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from './page.module.css'
import {
  TrendingUp, Globe, Music, Apple, Youtube, ShoppingCart,
  Headphones, Download, Video, Check, ArrowRightLeft, Plug,
  FileText, Cpu, ArrowRight, MessageCircle
} from 'lucide-react'

export default function MercadoDigital() {
  const plataformas = [
    {
      icon: <Music />,
      title: 'Spotify',
      desc: 'Maior plataforma de streaming por assinatura do mundo, com modelo de pagamento por stream.',
      items: [
        'Pagamento proporcional ao número de streams',
        'Modelo pro-rata (pool de receitas)',
        'Relatórios mensais detalhados',
        'Spotify for Artists para análise'
      ]
    },
    {
      icon: <Apple />,
      title: 'Apple Music',
      desc: 'Serviço de streaming da Apple com foco em qualidade de áudio e pagamento justo aos artistas.',
      items: [
        'Pagamento por stream competitivo',
        'Áudio de alta qualidade (Lossless)',
        'Integração com ecossistema Apple',
        'Apple Music for Artists',
        'Relatórios detalhados de analytics'
      ]
    },
    {
      icon: <Youtube />,
      title: 'YouTube',
      desc: 'Maior plataforma de vídeos do mundo, com YouTube Music e sistema de Content ID para proteção.',
      royalty: { label: 'Pagamento médio:', value: ' $0,001 - $0,003 por visualização' },
      items: [
        'Royalties de execução pública + sincronização',
        'Content ID para identificação automática',
        'YouTube Music separado do YouTube',
        'Monetização por anúncios',
        'YouTube Studio para analytics'
      ]
    },
    {
      icon: <ShoppingCart />,
      title: 'Amazon Music',
      desc: 'Serviço de streaming da Amazon integrado ao ecossistema Prime e dispositivos Alexa.',
      royalty: { label: 'Pagamento médio:', value: ' $0,004 - $0,007 por stream' },
      items: [
        'Amazon Music Unlimited e Prime Music',
        'Integração com Alexa e dispositivos Echo',
        'HD e Ultra HD disponíveis',
        'Crescimento acelerado de usuários',
        'Amazon Music for Artists'
      ]
    },
    {
      icon: <Music />,
      title: 'Deezer',
      desc: 'Plataforma francesa com foco em descoberta musical e pagamento centrado no usuário (UCPS).',
      royalty: { label: 'Pagamento médio:', value: ' $0,005 - $0,008 por stream' },
      items: [
        'Modelo User-Centric Payment System (UCPS)',
        'Pagamento baseado no que cada usuário ouve',
        'Mais justo para artistas de nicho',
        'Presença forte na Europa e Brasil',
        'Deezer for Creators'
      ]
    },
    {
      icon: <Video />,
      title: 'TikTok',
      desc: 'Rede social de vídeos curtos que se tornou uma das principais formas de descoberta musical.',
      royalty: { label: 'Pagamento:', value: ' Licenciamento por uso' },
      items: [
        'Acordos de licenciamento com gravadoras',
        'Pagamento por número de vídeos criados',
        'Descoberta viral de músicas',
        'Impacto direto em charts globais',
        'TikTok for Artists'
      ]
    }
  ]

  const tipos = [
    {
      icon: <Headphones />,
      title: 'Royalties de Streaming',
      subtitle: 'Execução Pública Digital',
      desc: 'Gerados cada vez que sua música é transmitida (streamed) em plataformas como Spotify, Apple Music, Deezer, etc.',
      items: [
        'Pagamento por stream individual',
        'Divisão entre compositores e gravadoras',
        'Calculado mensalmente',
        'Varia por plataforma e país'
      ]
    },
    {
      icon: <Download />,
      title: 'Royalties de Download',
      subtitle: 'Direitos Mecânicos Digitais',
      desc: 'Pagos quando alguém compra sua música para download permanente (iTunes, Amazon, Google Play).',
      items: [
        'Valor fixo por download',
        'Geralmente 9,1 centavos (USD) por faixa',
        'Pagamento único por compra',
        'Mercado em declínio vs streaming'
      ]
    },
    {
      icon: <Video />,
      title: 'Royalties de Vídeo',
      subtitle: 'Sincronização + Execução Pública',
      desc: 'Gerados quando sua música é usada em vídeos no YouTube, TikTok, Instagram, Facebook.',
      items: [
        'Content ID no YouTube',
        'Monetização por anúncios',
        'Licenciamento de uso',
        'Crescimento exponencial'
      ]
    }
  ]

  const processo = [
    { num: 1, title: 'Upload & Distribuição', desc: 'Sua música é enviada às plataformas através de distribuidoras digitais' },
    { num: 2, title: 'Identificação', desc: 'Plataformas identificam a música através de ISRC e metadados' },
    { num: 3, title: 'Streams & Plays', desc: 'Usuários ouvem sua música gerando streams/plays contabilizados' },
    { num: 4, title: 'Cálculo de Royalties', desc: 'Plataforma calcula valores baseado em modelo de negócio' },
    { num: 5, title: 'Pagamento à Distribuidora', desc: 'Plataforma paga à distribuidora digital mensalmente' },
    { num: 6, title: 'Repasse ao Artista', desc: 'Distribuidora repassa ao artista após descontos contratuais' }
  ]

  const monitoramento = [
    {
      icon: <TrendingUp />,
      title: 'Dashboard em Tempo Real',
      desc: 'Visualize seus dados de todas as plataformas em um único painel interativo',
      items: [
        'Consolidation automática de relatórios',
        'Gráficos e métricas visuais',
        'Comparação entre plataformas'
      ]
    },
    {
      icon: <ArrowRightLeft />,
      title: 'Cruzamento de Dados',
      desc: 'Identificamos inconsistências e valores não pagos automaticamente',
      items: [
        'Matching de streams por ISRC',
        'Detecção de divergências',
        'Alertas automáticos'
      ]
    },
    {
      icon: <Plug />,
      title: 'Integrações API',
      desc: 'Conexão direta com APIs das principais plataformas e distribuidoras',
      items: [
        'Coleta automática de dados',
        'Atualização em tempo real',
        'Segurança e criptografia'
      ]
    },
    {
      icon: <FileText />,
      title: 'Relatórios Inteligentes',
      desc: 'Análises profundas com insights acionáveis para maximizar ganhos',
      items: [
        'Análise por obra, região, período',
        'Identificação de oportunidades',
        'Exportação Excel, PDF, CSV'
      ]
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
            <div className={styles.heroIcon}><Globe size={40} /></div>
            <h1>Mercado Digital & <span>Royalties</span></h1>
            <p>Entenda como funcionam os royalties no mundo digital: streaming, downloads, redes sociais e plataformas musicais</p>
          </motion.div>
        </div>
      </section>

      {/* PLATAFORMAS */}
      <section className={styles.contentSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Principais Plataformas Digitais</h2>
          <p className={styles.introText}>
            Cada plataforma digital possui seu próprio modelo de pagamento de royalties. Conheça como funcionam as principais:
          </p>

          <div className={styles.plataformasGrid}>
            {plataformas.map((p, i) => (
              <motion.div
                key={i}
                className={styles.plataformaCard}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={styles.plataformaHeader}>
                  <div className={styles.plataformaIcon}>{p.icon}</div>
                  <h3>{p.title}</h3>
                </div>
                <p>{p.desc}</p>

                {p.royalty && (
                  <div className={styles.royaltyValue}>
                    <strong>{p.royalty.label}</strong>{p.royalty.value}
                  </div>
                )}

                <ul>
                  {p.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* TIPOS DE ROYALTIES DIGITAIS */}
      <section className={styles.tiposSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Tipos de Royalties Digitais</h2>

          <div className={styles.tiposGrid}>
            {tipos.map((t, i) => (
              <motion.div
                key={i}
                className={styles.tipoCard}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={styles.tipoIcon}>{t.icon}</div>
                <h3>{t.title}</h3>
                <p><strong>{t.subtitle}</strong></p>
                <p>{t.desc}</p>
                <ul>
                  {t.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO */}
      <section className={styles.processoSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Como Funciona o Processo de Pagamento</h2>

          <div className={styles.processoFlow}>
            {processo.map((step, i) => (
              <motion.div
                key={i}
                className={styles.processoStep}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={styles.processoNumber}>{step.num}</div>
                <h4>{step.title}</h4>
                <p>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MONITORAMENTO SISTÊMICO */}
      <section className={styles.monitoramentoSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Monitoramento Sistêmico Figa</h2>
          <p className={styles.monitoramentoIntro}>
            A Figa oferece sistemas avançados de monitoramento e análise de royalties digitais. Nossa tecnologia cruza dados de múltiplas plataformas para garantir que você receba todos os valores devidos.
          </p>

          <div className={styles.plataformasGrid}>
            {monitoramento.map((m, i) => (
              <motion.div
                key={i}
                className={styles.plataformaCard}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className={styles.monitorIcon}>{m.icon}</div>
                <h3>{m.title}</h3>
                <p>{m.desc}</p>
                <ul className={styles.monitorList}>
                  {m.items.map((item, j) => (
                    <li key={j}><Check size={16} /> {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className={styles.highlightBox}>
            <h4><Cpu size={20} /> Conheça Nossa Plataforma Completa</h4>
            <p>
              A Figa oferece uma plataforma completa de gestão de dados e royalties musicais com tecnologia de ponta, governança LGPD e equipe própria especializada.
            </p>
            <Link href="/sistemas" className={styles.highlightBtn}>
              <ArrowRight size={18} /> Ver Sistemas & Tecnologia
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <h2>Otimize seus Royalties Digitais</h2>
          <p>A Figa garante que sua música esteja corretamente cadastrada e distribuída em todas as plataformas</p>
          <a href="https://wa.me/5521991966325" className={styles.ctaButton} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={22} />
            <span>Fale com um Especialista</span>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
