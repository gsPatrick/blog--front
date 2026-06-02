'use client'

import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from './page.module.css'
import { 
  Route, Check, AlertTriangle, Info, 
  Lightbulb, CheckCircle, Calculator, 
  ArrowRight, MessageCircle, Music,
  Mic2, Radio, Clapperboard
} from 'lucide-react'

export default function ComoReceber() {
  const steps = [
    {
      num: 1,
      title: 'Cadastro da Obra',
      desc: 'O primeiro passo é registrar sua obra musical com todos os dados corretos e completos.',
      items: [
        { label: 'Título da obra', detail: 'Nome oficial da música' },
        { label: 'Autores e compositores', detail: 'Todos os criadores da obra' },
        { label: 'Percentuais (splits)', detail: 'Participação de cada titular' },
        { label: 'Códigos', detail: 'ISWC (obra) e ISRC (gravação)' },
        { label: 'Gênero musical', detail: 'Classificação da obra' }
      ],
      alert: {
        icon: <AlertTriangle />,
        title: 'Importante',
        text: 'Obras não cadastradas corretamente podem ter royalties retidos ou distribuídos incorretamente.'
      }
    },
    {
      num: 2,
      title: 'Filiação em Associação',
      desc: 'Para receber direitos de execução pública, você deve estar filiado a uma associação de música reconhecida:',
      content: (
        <div className={styles.associationsGrid}>
          {['ABRAMUS', 'AMAR', 'ASSIM', 'ANACIM', 'SBACEM', 'SICAM', 'SOCINPRO', 'UBC'].map(a => (
            <div key={a} className={styles.assocItem}><Check size={14} /> <strong>{a}</strong></div>
          ))}
        </div>
      ),
      alert: {
        icon: <Info />,
        title: 'Informação',
        text: 'Cada associação possui características específicas. Pesquise antes de se filiar.',
        theme: 'secondary'
      }
    },
    {
      num: 3,
      title: 'Distribuição Digital',
      desc: 'Para receber royalties de streaming, você precisa distribuir sua música nas plataformas digitais.',
      items: [
        { label: 'Escolha uma distribuidora', detail: 'CD Baby, DistroKid, TuneCore, ONErpm, etc.' },
        { label: 'Envie sua música', detail: 'Master de áudio + artwork + metadata' },
        { label: 'Aguarde aprovação', detail: '7 a 14 dias úteis' },
        { label: 'Música disponível', detail: 'Spotify, Apple Music, Deezer, YouTube Music, etc.' }
      ]
    },
    {
      num: 4,
      title: 'Execução e Uso da Obra',
      desc: 'Sua música precisa ser executada/utilizada para gerar royalties.',
      items: [
        { label: 'Streaming', detail: 'Plays no Spotify, Apple Music, Deezer, etc.' },
        { label: 'Rádio e TV', detail: 'Execução em emissoras' },
        { label: 'Shows e eventos', detail: 'Execução ao vivo' },
        { label: 'Estabelecimentos', detail: 'Bares, restaurantes, lojas' }
      ]
    },
    {
      num: 5,
      title: 'Arrecadação de Direitos',
      desc: 'O órgão responsável pela arrecadação centralizada no Brasil monitora e processa as utilizações musicais.',
      items: [
        { label: 'Coleta de dados', detail: 'Monitoramento e registro de execuções' },
        { label: 'Cobrança', detail: 'Cobrança dos usuários (rádios, TVs, shows, etc.)' },
        { label: 'Processamento', detail: 'Dados são processados e valores calculados' },
        { label: 'Distribuição', detail: 'Valores são repassados às associações' }
      ],
      alert: {
        icon: <Lightbulb />,
        title: 'Como a Figa Ajuda',
        text: 'Nossos sistemas cruzam dados de múltiplas fontes, identificando execuções não reportadas e valores divergentes.'
      }
    },
    {
      num: 6,
      title: 'Análise de Relatórios',
      desc: 'Após a distribuição, você recebe relatórios de execução via sua associação.',
      items: [
        { label: 'Relatório de execuções', detail: 'Lista de onde e quando sua música tocou' },
        { label: 'Valores por obra', detail: 'Quanto cada música gerou' },
        { label: 'Segmentos', detail: 'Rádio, TV, shows, etc.' },
        { label: 'Período', detail: 'Trimestral ou semestral' }
      ],
      alert: {
        icon: <CheckCircle />,
        title: 'Figa Análise Automática',
        text: 'A Figa processa seus relatórios automaticamente, identificando divergências e valores não pagos.',
        theme: 'secondary'
      }
    },
    {
      num: 7,
      title: 'Recebimento de Royalties',
      desc: 'Finalmente, você recebe seus royalties através da associação ou distribuidora.',
      items: [
        { label: 'Associação', detail: 'Direitos de execução pública (ECAD)' },
        { label: 'Distribuidora', detail: 'Royalties de streaming e download' },
        { label: 'Periodicidade', detail: 'Mensal, trimestral ou semestral' }
      ]
    }
  ]

  const simulatorCards = [
    { icon: <Music />, title: 'Streaming', desc: 'Calcule ganhos com Spotify, Apple Music e mais', link: '/simulador#streaming', emoji: '🎧' },
    { icon: <Mic2 />, title: 'Shows & Eventos', desc: 'Estime royalties de apresentações ao vivo', link: '/simulador#shows', emoji: '🎤' },
    { icon: <Radio />, title: 'Rádio & TV', desc: 'Calcule execuções em rádio e televisão', link: '/simulador#radio-tv', emoji: '📻' },
    { icon: <Clapperboard />, title: 'Sincronização', desc: 'Estime valores para filmes e publicidade', link: '/simulador#sinc', emoji: '🎬' }
  ]

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.hero}>
        <div className={styles.container}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.heroContent}
          >
            <div className={styles.heroIcon}><Route size={40} /></div>
            <h1>Como Receber <span>Direitos Autorais</span></h1>
            <p>Processo completo do cadastro de obras até o recebimento de royalties. Entenda cada etapa e garanta que você receba tudo o que é seu por direito.</p>
          </motion.div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.timeline}>
            {steps.map((step, i) => (
              <motion.div 
                key={i} 
                className={styles.timelineItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className={styles.timelineNum}>{step.num}</div>
                <div className={styles.timelineContent}>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  
                  {step.content}
                  
                  {step.items && (
                    <ul className={styles.stepList}>
                      {step.items.map((item, j) => (
                        <li key={j}><Check size={14} /> <strong>{item.label}:</strong> {item.detail}</li>
                      ))}
                    </ul>
                  )}

                  {step.alert && (
                    <div className={`${styles.alert} ${step.alert.theme === 'secondary' ? styles.alertSecondary : ''}`}>
                      <h4>{step.alert.icon} {step.alert.title}</h4>
                      <p>{step.alert.text}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SIMULADOR INTEGRADO */}
      <section className={styles.simulatorSection}>
        <div className={styles.container}>
          <div className={styles.simulatorCard}>
            <h2 className={styles.simTitle}><Calculator size={40} /> Simule Seus Royalties</h2>
            <p className={styles.simDesc}>Calcule quanto você pode receber em diferentes cenários: streaming, shows, rádio/TV e sincronização</p>
            
            <div className={styles.simGrid}>
              {simulatorCards.map((card, i) => (
                <div key={i} className={styles.simSubCard}>
                  <div className={styles.emoji}>{card.emoji}</div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <a href={card.link} className={styles.simBtn}>
                    Simular <ArrowRight size={16} />
                  </a>
                </div>
              ))}
            </div>
            
            <div className={styles.simFooter}>
              <p><Info size={16} /> <strong>Simuladores educacionais</strong> - Estimativas baseadas em médias de mercado 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <h2>Simplifique Todo Esse Processo</h2>
            <p>A Figa gerencia todo o processo para você: cadastro, monitoramento, análise e recuperação de valores.</p>
            <a href="https://wa.me/5521991966325" target="_blank" className={styles.ctaButton}>
              <MessageCircle size={20} /> Falar com Especialista
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
