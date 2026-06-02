'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from './page.module.css'
import {
  Compass, Eye, Calculator, Headphones, Radio, Music, Store,
  Film, Share2, Phone, Volume2, Info, Lightbulb, LineChart,
  Play, Percent, PieChart, Check, Tv, Ticket, ShoppingCart,
  Video, Youtube, Smartphone, Building2, MessageCircle, Rocket
} from 'lucide-react'

const sidebarLinks = [
  { id: 'visao-geral', icon: <Eye size={18} />, label: 'Visão Geral' },
  { id: 'simulador', icon: <Calculator size={18} />, label: 'Simulador' },
  { id: 'streaming', icon: <Headphones size={18} />, label: 'Streaming' },
  { id: 'radio-tv', icon: <Radio size={18} />, label: 'Rádio & TV' },
  { id: 'shows', icon: <Music size={18} />, label: 'Shows & Eventos' },
  { id: 'estabelecimentos', icon: <Store size={18} />, label: 'Estabelecimentos' },
  { id: 'cinema', icon: <Film size={18} />, label: 'Cinema & Audiovisual' },
  { id: 'redes-sociais', icon: <Share2 size={18} />, label: 'Redes Sociais' },
  { id: 'telefonia', icon: <Phone size={18} />, label: 'Telefonia' },
  { id: 'sonorizacao', icon: <Volume2 size={18} />, label: 'Sonorização Ambiental' }
]

const segments = [
  {
    id: 'streaming',
    title: 'Streaming Musical',
    icon: <Headphones size={28} />,
    cards: [
      {
        icon: <Music size={28} />,
        heading: 'Plataformas Digitais',
        percentage: '~0,003-0,005',
        sub: 'Por stream',
        text: 'As plataformas de streaming pagam valores que variam conforme acordos comerciais e região de reprodução.',
        rules: [
          'Spotify, Apple Music, Deezer, etc.',
          'Pagamento por stream individual',
          'Valores variam por país e assinatura',
          'Mínimo de 30 segundos reproduzidos'
        ]
      }
    ]
  },
  {
    id: 'radio-tv',
    title: 'Rádio & TV',
    icon: <Radio size={28} />,
    cards: [
      {
        icon: <Radio size={28} />,
        heading: 'Rádio',
        percentage: '35%',
        sub: 'Do total arrecadado',
        rules: [
          'Cobrança sobre faturamento da emissora',
          'Valores variam por porte e localização',
          'Fiscalização de playlist obrigatória',
          'Pagamento mensal ao ECAD'
        ]
      },
      {
        icon: <Tv size={28} />,
        heading: 'TV Aberta e Por Assinatura',
        percentage: '30%',
        sub: 'Do total arrecadado',
        rules: [
          'Base de cálculo sobre receita bruta',
          'Novelas, programas, vinhetas',
          'Relatório de uso trimestral',
          'Percentual fixo por tipo de emissora'
        ]
      }
    ]
  },
  {
    id: 'shows',
    title: 'Shows & Eventos',
    icon: <Music size={28} />,
    cards: [
      {
        icon: <Ticket size={28} />,
        heading: 'Shows Públicos',
        percentage: '20%',
        sub: 'Do total arrecadado',
        rules: [
          '5% a 10% da renda bruta do evento',
          'Declaração prévia obrigatória',
          'Pagamento antes da realização',
          'Setlist deve ser informado'
        ]
      }
    ]
  },
  {
    id: 'estabelecimentos',
    title: 'Estabelecimentos Comerciais',
    icon: <Store size={28} />,
    cards: [
      {
        icon: <ShoppingCart size={28} />,
        heading: 'Comércio',
        percentage: '12%',
        sub: 'Do total arrecadado',
        rules: [
          'Restaurantes, bares, lojas',
          'Valor fixo mensal por m²',
          'Varia conforme categoria do estabelecimento',
          'Licença anual renovável'
        ]
      }
    ]
  },
  {
    id: 'cinema',
    title: 'Cinema & Audiovisual',
    icon: <Film size={28} />,
    cards: [
      {
        icon: <Video size={28} />,
        heading: 'Sincronização',
        percentage: 'Negociável',
        sub: 'Por obra/projeto',
        rules: [
          'Filmes, séries, comerciais',
          'Negociação direta com titulares',
          'Valores variam por tipo de uso',
          'Contratos específicos por projeto'
        ]
      }
    ]
  },
  {
    id: 'redes-sociais',
    title: 'Redes Sociais',
    icon: <Share2 size={28} />,
    cards: [
      {
        icon: <Youtube size={28} />,
        heading: 'YouTube, TikTok, Meta',
        percentage: '3%',
        sub: 'Do total arrecadado',
        rules: [
          'Acordos diretos com plataformas',
          'Content ID e sistemas de reconhecimento',
          'Valores por visualização/uso',
          'Crescente importância no mercado'
        ]
      }
    ]
  },
  {
    id: 'telefonia',
    title: 'Telefonia',
    icon: <Phone size={28} />,
    cards: [
      {
        icon: <Smartphone size={28} />,
        heading: 'Toques e Espera',
        percentage: 'Valor fixo',
        sub: 'Por download/assinatura',
        rules: [
          'Ringtones, música de espera',
          'Acordo com operadoras',
          'Percentual sobre vendas',
          'Relatórios mensais de uso'
        ]
      }
    ]
  },
  {
    id: 'sonorizacao',
    title: 'Sonorização Ambiental',
    icon: <Volume2 size={28} />,
    cards: [
      {
        icon: <Building2 size={28} />,
        heading: 'Espaços Públicos',
        percentage: 'Licença anual',
        sub: 'Por local',
        rules: [
          'Academias, clínicas, escritórios',
          'Valor fixo conforme categoria',
          'Renovação anual obrigatória',
          'Fiscalização periódica'
        ]
      }
    ]
  }
]

const valoresPorSegmento = {
  streaming: 0.004,
  radio: 0.5,
  tv: 2.0,
  show: 5.0,
  estabelecimento: 0.15,
  cinema: 10.0,
  sincronizacao: 50.0,
  digital_publico: 0.3
}

const infos = {
  streaming: {
    texto: '📊 Streaming: Valores variam por plataforma (Spotify, Deezer, Apple Music). A arrecadação é proporcional ao número de streams e ao tipo de assinatura do usuário (free/premium).',
    label: 'Número de Streams',
    help: 'Ex: 100.000 streams'
  },
  radio: {
    texto: '📻 Rádio: Valores variam por horário (prime time ou madrugada), tipo de emissora (comercial/comunitária) e alcance da rádio conforme regulamento.',
    label: 'Número de Execuções',
    help: 'Ex: 500 execuções no mês'
  },
  tv: {
    texto: '📺 TV: Valores variam conforme horário de exibição, tipo de programa (novela, filme, comercial) e audiência da emissora segundo regulamento.',
    label: 'Número de Exibições',
    help: 'Ex: 30 exibições'
  },
  show: {
    texto: '🎤 Shows: Valores variam pelo porte do evento (pequeno/médio/grande), número de ingressos vendidos e tipo de local conforme regulamento ECAD.',
    label: 'Número de Execuções',
    help: 'Ex: 20 músicas executadas'
  },
  estabelecimento: {
    texto: '🏪 Estabelecimentos: Valores baseados no tamanho, tipo do estabelecimento (restaurante, academia, loja) e frequência de execução musical.',
    label: 'Execuções Estimadas/Mês',
    help: 'Ex: 5.000 execuções mensais'
  },
  cinema: {
    texto: '🎬 Cinema: Valores variam pela bilheteria do filme, número de salas, duração da música e tipo de uso (tema, trilha, créditos).',
    label: 'Número de Sessões',
    help: 'Ex: 1.000 sessões'
  },
  sincronizacao: {
    texto: '🎞️ Sincronização: Uso de música em propaganda, filme, série ou jogo. Valores variam por tipo de mídia, duração, território e exclusividade.',
    label: 'Número de Usos',
    help: 'Ex: 1 uso em comercial de TV'
  },
  digital_publico: {
    texto: '🌐 Digital Público: Uso em plataformas digitais públicas (YouTube, TikTok). Valores variam por visualizações, monetização e tipo de conteúdo.',
    label: 'Número de Visualizações',
    help: 'Ex: 50.000 views'
  }
}

const formatBRL = (value, maxFrac = 2) =>
  `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: maxFrac })}`

export default function Arrecadacao() {
  const [segmento, setSegmento] = useState('')
  const [execucoes, setExecucoes] = useState('')
  const [participacao, setParticipacao] = useState('50')
  const [results, setResults] = useState(null)

  const info = segmento && infos[segmento] ? infos[segmento] : null
  const labelExecucoes = info ? info.label : 'Volume de Execuções'
  const helpExecucoes = info ? info.help : 'Ex: 10.000 execuções'

  const handleSegmentoChange = (e) => {
    setSegmento(e.target.value)
    setResults(null)
  }

  const calcularSimulacao = () => {
    const exec = parseFloat(execucoes)
    const part = parseFloat(participacao)

    if (!segmento || !exec || !part) {
      alert('Por favor, preencha todos os campos!')
      return
    }

    const valorPorExecucao = valoresPorSegmento[segmento] || 0
    const valorTotal = exec * valorPorExecucao
    const suaParte = valorTotal * (part / 100)

    setResults({
      valorTotal: formatBRL(valorTotal),
      suaParte: formatBRL(suaParte),
      valorPorExecucao: formatBRL(valorPorExecucao, 4)
    })
  }

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.pageWrapper}>
        {/* Sidebar Navigation */}
        <aside className={styles.sidebar}>
          <h3><Compass size={20} />Navegação</h3>
          <ul className={styles.sidebarMenu}>
            {sidebarLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.icon}{link.label}</a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content */}
        <div className={styles.mainContent}>
          {/* Hero */}
          <motion.section
            className={styles.heroSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1>Arrecadação de Direitos Autorais</h1>
            <p className={styles.subtitle}>Entenda como funciona o sistema de arrecadação no Brasil</p>
            <p>Um guia completo sobre as regras, segmentos e formas de cobrança dos direitos autorais. Utilize nosso simulador para estimar valores e compreenda todo o processo de forma clara e transparente.</p>
          </motion.section>

          {/* Disclaimer */}
          <motion.div
            className={styles.disclaimer}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.disclaimerContent}>
              <h3><Info size={32} />Importante: Papel da Figa</h3>
              <p><strong>A Figa NÃO participa do processo de arrecadação de direitos autorais.</strong> Nossa função é fornecer clareza, inteligência e tecnologia para facilitar o entendimento e a gestão das suas informações. A arrecadação no Brasil é realizada por entidades especializadas que atuam em conjunto com as associações de música.</p>
              <p style={{ marginTop: '1rem' }}>A Figa desenvolve <strong>sistemas avançados de dados</strong> para facilitar a leitura de informações, cruzamento de dados e análise de royalties, ajudando artistas e titulares a compreenderem seus direitos.</p>
            </div>
          </motion.div>

          {/* Visão Geral */}
          <section id="visao-geral" className={styles.section}>
            <h2><Eye size={32} />Visão Geral</h2>
            <p>A arrecadação de direitos autorais no Brasil é dividida em diferentes segmentos, cada um com suas regras específicas de cobrança. Os valores arrecadados são distribuídos entre compositores, editores e demais titulares de direitos.</p>

            <div className={styles.infoBox}>
              <h4><Lightbulb size={18} />Como a Figa pode ajudar</h4>
              <p>Desenvolvemos sistemas inteligentes que cruzam dados de diferentes fontes, facilitando a leitura e compreensão dos seus relatórios de arrecadação. Nossa tecnologia identifica inconsistências, oportunidades e fornece análises detalhadas do seu desempenho em cada segmento.</p>
            </div>
          </section>

          {/* Simulador */}
          <section id="simulador" className={styles.section}>
            <h2><Calculator size={32} />Simulador de Arrecadação</h2>
            <p>Calcule estimativas de valores de arrecadação com base em diferentes segmentos e volumes de execução.</p>

            <div className={styles.simulatorCard}>
              <div className={styles.simulatorHeader}>
                <h3><LineChart size={28} />Simulador Interativo</h3>
                <p>Preencha os dados abaixo para calcular uma estimativa de arrecadação baseada nas regras de cada segmento</p>
              </div>

              <form className={styles.simulatorForm} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.formGroup}>
                  <label><Music size={16} />Segmento de Uso</label>
                  <select value={segmento} onChange={handleSegmentoChange} required>
                    <option value="">Selecione o segmento...</option>
                    <option value="streaming">Streaming Musical</option>
                    <option value="radio">Rádio</option>
                    <option value="tv">Televisão (TV Aberta)</option>
                    <option value="show">Shows e Eventos</option>
                    <option value="estabelecimento">Estabelecimentos Comerciais</option>
                    <option value="cinema">Cinema/Audiovisual</option>
                    <option value="sincronizacao">Sincronização</option>
                    <option value="digital_publico">Uso Digital Público</option>
                  </select>
                </div>

                {info && (
                  <div className={styles.infoSegmento}>
                    <p>{info.texto}</p>
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label><Play size={16} /><span>{labelExecucoes}</span></label>
                  <input
                    type="number"
                    value={execucoes}
                    onChange={(e) => setExecucoes(e.target.value)}
                    placeholder="Digite o volume"
                    required
                  />
                  <small className={styles.help}>{helpExecucoes}</small>
                </div>

                <div className={styles.formGroup}>
                  <label><Percent size={16} />Sua Participação (%)</label>
                  <input
                    type="number"
                    value={participacao}
                    onChange={(e) => setParticipacao(e.target.value)}
                    placeholder="Ex: 50"
                    min="1"
                    max="100"
                    required
                  />
                  <small className={styles.help}>Percentual de participação autoral na obra</small>
                </div>
              </form>

              <button className={styles.calculateButton} onClick={calcularSimulacao}>
                <Calculator size={20} />Calcular Estimativa
              </button>

              {results && (
                <div className={`${styles.resultsPanel} ${styles.active}`}>
                  <h4 className={styles.resultsTitle}>
                    <PieChart size={20} /> Resultados da Simulação
                  </h4>
                  <div className={styles.resultsGrid}>
                    <div className={styles.resultItem}>
                      <div className={styles.label}>Valor Total Estimado</div>
                      <div className={styles.value}>{results.valorTotal}</div>
                      <div className={styles.resultSubtitle}>Valor bruto do segmento</div>
                    </div>
                    <div className={styles.resultItem}>
                      <div className={styles.label}>Sua Parte</div>
                      <div className={styles.value}>{results.suaParte}</div>
                      <div className={styles.resultSubtitle}>Baseado na sua participação</div>
                    </div>
                    <div className={styles.resultItem}>
                      <div className={styles.label}>Valor por Execução</div>
                      <div className={styles.value}>{results.valorPorExecucao}</div>
                      <div className={styles.resultSubtitle}>Média do segmento</div>
                    </div>
                  </div>
                  <p className={styles.resultsNote}>
                    <Info size={14} /> Valores estimados com base em médias de mercado. Os valores reais podem variar conforme acordos e regulamentação.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Segmentos */}
          {segments.map((seg) => (
            <section key={seg.id} id={seg.id} className={styles.section}>
              <h2>{seg.icon}{seg.title}</h2>
              <div className={styles.segmentsGrid}>
                {seg.cards.map((card, i) => (
                  <motion.div
                    key={i}
                    className={styles.segmentCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3>{card.icon}{card.heading}</h3>
                    <div className={styles.percentage}>{card.percentage}</div>
                    <p><strong>{card.sub}</strong></p>
                    {card.text && <p>{card.text}</p>}
                    <ul className={styles.rulesList}>
                      {card.rules.map((rule, j) => (
                        <li key={j}><Check size={16} />{rule}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}

          {/* CTA Section */}
          <section className={`${styles.section} ${styles.ctaSection}`}>
            <h2 className={styles.ctaTitle}><Rocket size={32} />Precisa de Ajuda com Seus Dados?</h2>
            <p className={styles.ctaText}>A Figa desenvolve sistemas avançados para análise, cruzamento de dados e gestão inteligente de direitos autorais. Transforme seus relatórios em insights claros e acionáveis.</p>
            <a href="https://wa.me/5521991966325" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
              <MessageCircle size={20} />Fale com Nossa Equipe
            </a>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
