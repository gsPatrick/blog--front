'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from './page.module.css'
import {
  Calculator, Coins, FileText, Headphones, Music, Radio,
  Clapperboard, Play, Percent, Ticket, DollarSign, ListMusic,
  LineChart, PieChart, Info, Clock, Globe, Lightbulb,
  Rocket, MessageCircle, Layers, Ruler, Users, Building2, Signal,
  TriangleAlert, BarChart3
} from 'lucide-react'

const fmtBRL = (n, min = 2) =>
  `R$ ${Number(n).toLocaleString('pt-BR', { minimumFractionDigits: min })}`

const fmtCurrency = (n) =>
  Number(n).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

export default function Simulador() {
  // Category + tabs
  const [category, setCategory] = useState('receber')
  const [tab, setTab] = useState('streaming')

  // ---- Streaming ----
  const [streams, setStreams] = useState('')
  const [platform, setPlatform] = useState('0.004')
  const [participation, setParticipation] = useState('100')
  const [streamingRes, setStreamingRes] = useState(null)

  const calcularStreaming = () => {
    const s = parseFloat(streams)
    const perStream = parseFloat(platform)
    const part = parseFloat(participation)
    if (!s || !perStream || !part) {
      alert('Preencha todos os campos!')
      return
    }
    const total = s * perStream
    const yours = total * (part / 100)
    const monthly = yours
    setStreamingRes({
      total,
      yours,
      perStream,
      monthly,
      chart: [yours * 0.8, yours * 0.9, yours, yours * 1.1, yours * 1.15, yours * 1.2]
    })
  }

  // ---- Shows ----
  const [eventType, setEventType] = useState('0.05')
  const [eventRevenue, setEventRevenue] = useState('')
  const [songsPlayed, setSongsPlayed] = useState('')
  const [totalSongs, setTotalSongs] = useState('')
  const [showsRes, setShowsRes] = useState(null)

  const calcularShows = () => {
    const et = parseFloat(eventType)
    const revenue = parseFloat(eventRevenue)
    const played = parseFloat(songsPlayed)
    const total = parseFloat(totalSongs)
    if (!et || !revenue || !played || !total) {
      alert('Preencha todos os campos!')
      return
    }
    const arrec = revenue * et
    const yours = arrec * (played / total)
    const perSong = yours / played
    setShowsRes({ total: arrec, yours, perSong })
  }

  // ---- Rádio & TV ----
  const [mediaType, setMediaType] = useState('0.50')
  const [executions, setExecutions] = useState('')
  const [radioParticipation, setRadioParticipation] = useState('100')
  const [radioRes, setRadioRes] = useState(null)

  const calcularRadioTV = () => {
    const perExec = parseFloat(mediaType)
    const exec = parseFloat(executions)
    const part = parseFloat(radioParticipation)
    if (!perExec || !exec || !part) {
      alert('Preencha todos os campos!')
      return
    }
    const monthly = exec * perExec * (part / 100)
    const yearly = monthly * 12
    const perExecYours = perExec * (part / 100)
    setRadioRes({
      monthly,
      yearly,
      perExecYours,
      chart: Array(12).fill(monthly)
    })
  }

  // ---- Sincronização ----
  const [prodType, setProdType] = useState('2000')
  const [usage, setUsage] = useState('0.5')
  const [territory, setTerritory] = useState('0.5')
  const [sincParticipation, setSincParticipation] = useState('100')
  const [sincRes, setSincRes] = useState(null)

  const calcularSinc = () => {
    const baseValue = parseFloat(prodType)
    const usageMultiplier = parseFloat(usage)
    const territoryMultiplier = parseFloat(territory)
    const part = parseFloat(sincParticipation)
    if (!baseValue || !usageMultiplier || !territoryMultiplier || !part) {
      alert('Preencha todos os campos!')
      return
    }
    const adjusted = baseValue * usageMultiplier * territoryMultiplier
    const yours = adjusted * (part / 100)
    setSincRes({ base: baseValue, adjusted, yours })
  }

  // ---- Quanto Pagar (segmentos) ----
  const [segmento, setSegmento] = useState('')
  const [areaM2, setAreaM2] = useState('')
  const [receitaBruta, setReceitaBruta] = useState('')
  const [rendaEvento, setRendaEvento] = useState('')
  const [publicoEvento, setPublicoEvento] = useState('')
  const [porteComercio, setPorteComercio] = useState('')
  const [alcanceEmissora, setAlcanceEmissora] = useState('')
  const [pagarRes, setPagarRes] = useState(null)

  // Visibility of dynamic fields
  const showArea = ['comercio', 'alimentacao', 'hospedagem', 'fitness', 'streaming'].includes(segmento)
  const showReceita = ['alimentacao', 'hospedagem', 'radio', 'tv'].includes(segmento)
  const showRendaEvento = segmento === 'eventos'
  const showPublico = ['eventos', 'festas'].includes(segmento)
  const showPorte = segmento === 'comercio'
  const showAlcance = ['radio', 'tv'].includes(segmento)

  const calcularPagar = (e) => {
    e.preventDefault()
    const area = parseFloat(areaM2) || 0
    const receita = parseFloat(receitaBruta) || 0
    const renda = parseFloat(rendaEvento) || 0
    const publico = parseFloat(publicoEvento) || 0
    const porte = porteComercio
    const alcance = alcanceEmissora

    if (!segmento) {
      alert('⚠️ Por favor, selecione um segmento')
      return
    }

    let valorEstimado = 0
    let periodo = 'Mensal'
    let baseCalculo = ''
    let contexto = ''
    let nomeSegmento = ''

    switch (segmento) {
      case 'comercio':
        nomeSegmento = '🏪 Comércio & Lojas'
        if (!area || !porte) {
          alert('⚠️ Preencha a área e o porte do estabelecimento')
          return
        }
        if (porte === 'pequeno') {
          valorEstimado = area * 0.45
          baseCalculo = 'Área (R$ 0,45/m²)'
          contexto = '<strong>Comércio Pequeno (até 200m²):</strong> Valor calculado por metragem de área de atendimento ao público. Faixa estimada: R$ 0,40 a R$ 0,60/m².'
        } else if (porte === 'medio') {
          valorEstimado = area * 0.70
          baseCalculo = 'Área (R$ 0,70/m²)'
          contexto = '<strong>Comércio Médio (200-500m²):</strong> Estabelecimentos médios têm valor por m² proporcionalmente maior. Faixa estimada: R$ 0,60 a R$ 0,90/m².'
        } else if (porte === 'grande') {
          valorEstimado = area * 1.00
          baseCalculo = 'Área (R$ 1,00/m²)'
          contexto = '<strong>Comércio Grande (>500m²):</strong> Grandes estabelecimentos podem ter tabelas fixas ou valores por m² maiores. Faixa estimada: R$ 0,90 a R$ 1,20/m².'
        }
        break

      case 'alimentacao':
        nomeSegmento = '🍽️ Alimentação'
        if (!area && !receita) {
          alert('⚠️ Preencha pelo menos a área ou a receita mensal')
          return
        }
        if (receita > 0) {
          valorEstimado = receita * 0.0035
          baseCalculo = 'Receita (0,35%)'
          contexto = '<strong>Restaurante, Bar, Lanchonete:</strong> Calculado sobre a receita bruta mensal. Percentual estimado entre 0,3% e 0,5% conforme o tipo e porte.'
        } else {
          valorEstimado = area * 0.55
          baseCalculo = 'Área (R$ 0,55/m²)'
          contexto = '<strong>Estabelecimento de Alimentação:</strong> Quando não há dados de receita, calcula-se por área. Valor médio R$ 0,50 a R$ 0,70/m².'
        }
        break

      case 'hospedagem':
        nomeSegmento = '🏨 Hospedagem'
        if (!receita && !area) {
          alert('⚠️ Preencha a receita mensal ou a área do estabelecimento')
          return
        }
        if (receita > 0) {
          valorEstimado = receita * 0.0025
          baseCalculo = 'Receita (0,25%)'
          contexto = '<strong>Hotel, Pousada, Hostel:</strong> Cálculo baseado na receita de hospedagem. Percentual médio entre 0,2% e 0,3% conforme porte e categoria.'
        } else {
          valorEstimado = area * 0.40
          baseCalculo = 'Área (R$ 0,40/m²)'
          contexto = '<strong>Estabelecimento de Hospedagem:</strong> Quando não há dados de receita, usa-se a área das áreas comuns e de convivência.'
        }
        break

      case 'fitness':
        nomeSegmento = '💪 Fitness & Bem-estar'
        if (!area) {
          alert('⚠️ Preencha a área do estabelecimento')
          return
        }
        valorEstimado = area * 0.38
        baseCalculo = 'Área (R$ 0,38/m²)'
        contexto = '<strong>Academia, Spa, Estúdio:</strong> Valor calculado pela área de atendimento. Academias geralmente pagam entre R$ 0,35 e R$ 0,50/m².'
        break

      case 'eventos': {
        nomeSegmento = '🎤 Eventos & Shows'
        periodo = 'Por Evento'
        if (!renda || !publico) {
          alert('⚠️ Preencha a renda do evento e o público estimado')
          return
        }
        let percentual = 0.05
        let descricaoPorte = 'pequeno'
        if (publico > 5000) {
          percentual = 0.10
          descricaoPorte = 'grande/festival'
        } else if (publico > 1000) {
          percentual = 0.07
          descricaoPorte = 'médio'
        }
        valorEstimado = renda * percentual
        baseCalculo = `Renda Bruta (${percentual * 100}%)`
        contexto = `<strong>Show/Evento ${descricaoPorte.charAt(0).toUpperCase() + descricaoPorte.slice(1)}:</strong> Percentual sobre a renda bruta do evento (bilheteria + patrocínio). Shows pequenos ~5%, médios ~7%, grandes/festivais ~10%.`
        break
      }

      case 'festas':
        nomeSegmento = '🎉 Festas Privadas'
        periodo = 'Por Evento'
        if (!publico) {
          alert('⚠️ Preencha o número de convidados')
          return
        }
        valorEstimado = Math.max(publico * 2.50, 450)
        baseCalculo = 'Por Convidado (R$ 2,50)'
        contexto = '<strong>Casamento, Formatura, Aniversário:</strong> Valor por convidado estimado entre R$ 2,00 e R$ 5,00, com valor mínimo de R$ 400-500 mesmo para festas pequenas.'
        break

      case 'radio':
        nomeSegmento = '📻 Rádio'
        if (!alcance) {
          alert('⚠️ Selecione o alcance da emissora')
          return
        }
        if (alcance === 'local') {
          valorEstimado = 1200
          baseCalculo = 'Tabela Fixa'
          contexto = '<strong>Rádio Local/Comunitária:</strong> Valor fixo mensal para emissoras de pequeno alcance. Faixa: R$ 800 a R$ 1.800/mês.'
        } else if (alcance === 'regional') {
          valorEstimado = 4500
          baseCalculo = 'Tabela Fixa'
          contexto = '<strong>Rádio Regional:</strong> Valor fixo mensal para emissoras de médio alcance. Faixa: R$ 3.000 a R$ 6.500/mês.'
        } else if (alcance === 'nacional') {
          if (receita > 0) {
            valorEstimado = receita * 0.018
            baseCalculo = 'Receita (1,8%)'
            contexto = '<strong>Rádio Nacional:</strong> Grandes emissoras pagam percentual sobre receita publicitária (geralmente 1,5% a 2,5%).'
          } else {
            valorEstimado = 15000
            baseCalculo = 'Tabela Fixa (Estimada)'
            contexto = '<strong>Rádio Nacional:</strong> Sem dados de receita, usa-se valor médio estimado. O ideal é calcular sobre a receita publicitária.'
          }
        }
        break

      case 'tv':
        nomeSegmento = '📺 Televisão'
        if (!alcance) {
          alert('⚠️ Selecione o alcance da emissora')
          return
        }
        if (alcance === 'local') {
          valorEstimado = 2800
          baseCalculo = 'Tabela Fixa'
          contexto = '<strong>TV Local/Comunitária:</strong> Valor fixo mensal para canais de pequeno alcance. Faixa: R$ 2.000 a R$ 4.000/mês.'
        } else if (alcance === 'regional') {
          if (receita > 0) {
            valorEstimado = receita * 0.014
            baseCalculo = 'Receita (1,4%)'
            contexto = '<strong>TV Regional:</strong> Calculado sobre receita publicitária. Percentual médio entre 1,2% e 1,8%.'
          } else {
            valorEstimado = 8500
            baseCalculo = 'Tabela Fixa (Estimada)'
            contexto = '<strong>TV Regional:</strong> Valor médio estimado. O ideal é calcular sobre a receita publicitária mensal.'
          }
        } else if (alcance === 'nacional') {
          if (receita > 0) {
            valorEstimado = receita * 0.020
            baseCalculo = 'Receita (2,0%)'
            contexto = '<strong>TV Nacional:</strong> Grandes emissoras pagam percentual sobre receita publicitária (geralmente 1,8% a 2,5%).'
          } else {
            valorEstimado = 35000
            baseCalculo = 'Tabela Fixa (Estimada)'
            contexto = '<strong>TV Nacional:</strong> Valor médio estimado para grandes emissoras. O cálculo correto é sobre a receita publicitária.'
          }
        }
        break

      case 'streaming':
        nomeSegmento = '🎵 Streaming/Sonorização'
        if (!area) {
          alert('⚠️ Preencha a área do estabelecimento')
          return
        }
        valorEstimado = area * 0.30
        baseCalculo = 'Área (R$ 0,30/m²)'
        contexto = '<strong>Sonorização Ambiental/Streaming:</strong> Estabelecimentos que usam música de fundo via streaming. Valor por área, geralmente R$ 0,25 a R$ 0,40/m².'
        break

      default:
        alert('⚠️ Segmento inválido')
        return
    }

    setPagarRes({ valor: valorEstimado, periodo, baseCalculo, contexto, nomeSegmento })
  }

  const switchCategory = (cat) => {
    setCategory(cat)
    if (cat === 'receber') setTab('streaming')
    else setTab('quanto-pagar')
  }

  const fadeUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.4 }
  }

  // Helpers for mini charts
  const maxOf = (arr) => Math.max(...arr, 1)
  const months6 = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
  const months12 = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.container}>
        {/* Hero */}
        <section className={styles.heroSection}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1><Calculator size={40} /> Simuladores Figa</h1>
            <p className={styles.subtitle}>Calcule quanto você pode receber ou quanto deve pagar</p>
            <p>Escolha entre simuladores de recebimento (artistas/compositores) ou pagamento (estabelecimentos). Valores baseados em médias de mercado de 2026.</p>
          </motion.div>
        </section>

        {/* Category Selector */}
        <div className={styles.categorySelector} id="receber">
          <button
            className={`${styles.categoryBtn} ${category === 'receber' ? styles.active : ''}`}
            onClick={() => switchCategory('receber')}
            id="pagar-placeholder"
          >
            <Coins size={48} />
            <span>Quanto Vou Receber</span>
            <small>Para artistas e compositores</small>
          </button>
          <button
            className={`${styles.categoryBtn} ${category === 'pagar' ? styles.active : ''}`}
            onClick={() => switchCategory('pagar')}
            id="pagar"
          >
            <FileText size={48} />
            <span>Quanto Vou Pagar</span>
            <small>Para estabelecimentos e usuários</small>
          </button>
        </div>

        {/* Tabs Receber */}
        {category === 'receber' && (
          <div className={styles.tabsContainer}>
            <button className={`${styles.tabButton} ${tab === 'streaming' ? styles.active : ''}`} onClick={() => setTab('streaming')}>
              <Headphones size={20} /><span>Streaming</span>
            </button>
            <button className={`${styles.tabButton} ${tab === 'shows' ? styles.active : ''}`} onClick={() => setTab('shows')}>
              <Music size={20} /><span>Shows</span>
            </button>
            <button className={`${styles.tabButton} ${tab === 'radio-tv' ? styles.active : ''}`} onClick={() => setTab('radio-tv')}>
              <Radio size={20} /><span>Rádio & TV</span>
            </button>
            <button className={`${styles.tabButton} ${tab === 'sinc' ? styles.active : ''}`} onClick={() => setTab('sinc')}>
              <Clapperboard size={20} /><span>Sincronização</span>
            </button>
          </div>
        )}

        {/* Tabs Pagar */}
        {category === 'pagar' && (
          <div className={styles.tabsContainer}>
            <button className={`${styles.tabButton} ${styles.active}`}>
              <Calculator size={20} /><span>Calcular Pagamento</span>
            </button>
          </div>
        )}

        {/* Streaming Simulator */}
        <div className={`${styles.simulatorCard} ${category === 'receber' && tab === 'streaming' ? styles.active : ''}`} id="streaming">
          <div className={styles.simulatorHeader}>
            <h2><Headphones size={32} /> Simulador de Streaming</h2>
            <p>Calcule seus ganhos estimados com streams no Spotify, Apple Music, Deezer e outras plataformas</p>
          </div>

          <form className={styles.simulatorForm} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formGroup}>
              <label><Play size={18} />Número de Streams</label>
              <input type="number" placeholder="Ex: 100000" value={streams} onChange={(e) => setStreams(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label><Headphones size={18} />Plataforma Principal</label>
              <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                <option value="0.004">Spotify (R$ 0,004/stream)</option>
                <option value="0.006">Apple Music (R$ 0,006/stream)</option>
                <option value="0.005">Deezer (R$ 0,005/stream)</option>
                <option value="0.003">YouTube Music (R$ 0,003/stream)</option>
                <option value="0.0045">Média Geral (R$ 0,0045/stream)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label><Percent size={18} />Sua Participação (%)</label>
              <input type="number" placeholder="Ex: 50" min="1" max="100" value={participation} onChange={(e) => setParticipation(e.target.value)} />
            </div>
          </form>

          <button className={styles.calculateButton} onClick={calcularStreaming}>
            <LineChart size={22} />Calcular Estimativa
          </button>

          {streamingRes && (
            <div className={`${styles.resultsPanel} ${styles.active}`}>
              <div className={styles.resultsHeader}>
                <h3><PieChart size={28} /> Resultados do Streaming</h3>
              </div>
              <div className={styles.resultsGrid}>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Valor Total Bruto</div>
                  <div className={styles.value}>{fmtBRL(streamingRes.total)}</div>
                  <div className={styles.resultSubtitle}>Total gerado</div>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Sua Parte</div>
                  <div className={styles.value}>{fmtBRL(streamingRes.yours)}</div>
                  <div className={styles.resultSubtitle}>Conforme participação</div>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Por Stream</div>
                  <div className={styles.value}>{fmtBRL(streamingRes.perStream, 4)}</div>
                  <div className={styles.resultSubtitle}>Valor médio</div>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Mensal (estimado)</div>
                  <div className={styles.value}>{fmtBRL(streamingRes.monthly)}</div>
                  <div className={styles.resultSubtitle}>Se manter volume</div>
                </div>
              </div>
              <div className={styles.chartContainer}>
                <div className={styles.barChart}>
                  {streamingRes.chart.map((v, i) => (
                    <div key={i} className={styles.barCol}>
                      <div className={styles.bar} style={{ height: `${(v / maxOf(streamingRes.chart)) * 100}%` }} />
                      <span>{months6[i]}</span>
                    </div>
                  ))}
                </div>
                <p className={styles.chartLegend}>Receita Estimada (R$)</p>
              </div>
              <p className={styles.disclaimerNote}>
                <Info size={16} /> Valores estimados. Os valores reais variam conforme país, tipo de assinatura e acordos comerciais.
              </p>
            </div>
          )}
        </div>

        {/* Shows Simulator */}
        <div className={`${styles.simulatorCard} ${category === 'receber' && tab === 'shows' ? styles.active : ''}`} id="shows">
          <div className={styles.simulatorHeader}>
            <h2><Music size={32} /> Simulador de Shows & Eventos</h2>
            <p>Calcule a arrecadação estimada de direitos autorais em shows e eventos ao vivo</p>
          </div>

          <form className={styles.simulatorForm} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formGroup}>
              <label><Ticket size={18} />Tipo de Evento</label>
              <select value={eventType} onChange={(e) => setEventType(e.target.value)}>
                <option value="0.05">Show Pequeno (5% renda bruta)</option>
                <option value="0.07">Show Médio (7% renda bruta)</option>
                <option value="0.10">Show Grande/Festival (10% renda bruta)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label><DollarSign size={18} />Renda Bruta do Evento (R$)</label>
              <input type="number" placeholder="Ex: 50000" value={eventRevenue} onChange={(e) => setEventRevenue(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label><Music size={18} />Nº de Músicas Suas Executadas</label>
              <input type="number" placeholder="Ex: 15" value={songsPlayed} onChange={(e) => setSongsPlayed(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label><ListMusic size={18} />Total de Músicas no Evento</label>
              <input type="number" placeholder="Ex: 50" value={totalSongs} onChange={(e) => setTotalSongs(e.target.value)} />
            </div>
          </form>

          <button className={styles.calculateButton} onClick={calcularShows}>
            <LineChart size={22} />Calcular Estimativa
          </button>

          {showsRes && (
            <div className={`${styles.resultsPanel} ${styles.active}`}>
              <div className={styles.resultsHeader}>
                <h3><PieChart size={28} /> Resultados do Show</h3>
              </div>
              <div className={styles.resultsGrid}>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Arrecadação Total</div>
                  <div className={styles.value}>{fmtBRL(showsRes.total)}</div>
                  <div className={styles.resultSubtitle}>Total do evento</div>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Sua Parte Estimada</div>
                  <div className={styles.value}>{fmtBRL(showsRes.yours)}</div>
                  <div className={styles.resultSubtitle}>Proporcional às músicas</div>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Por Música</div>
                  <div className={styles.value}>{fmtBRL(showsRes.perSong)}</div>
                  <div className={styles.resultSubtitle}>Valor médio por faixa</div>
                </div>
              </div>
              <p className={styles.disclaimerNote}>
                <Info size={16} /> Estimativa educacional. Valores reais dependem de diversos fatores e negociações.
              </p>
            </div>
          )}
        </div>

        {/* Radio/TV Simulator */}
        <div className={`${styles.simulatorCard} ${category === 'receber' && tab === 'radio-tv' ? styles.active : ''}`} id="radio-tv">
          <div className={styles.simulatorHeader}>
            <h2><Radio size={32} /> Simulador de Rádio & TV</h2>
            <p>Estime seus ganhos com execuções em rádio e televisão</p>
          </div>

          <form className={styles.simulatorForm} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formGroup}>
              <label><Radio size={18} />Tipo de Mídia</label>
              <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
                <option value="0.50">Rádio Comunitária (R$ 0,50/execução)</option>
                <option value="1.50">Rádio FM Regional (R$ 1,50/execução)</option>
                <option value="3.00">Rádio FM Grande Porte (R$ 3,00/execução)</option>
                <option value="5.00">TV Aberta Regional (R$ 5,00/execução)</option>
                <option value="10.00">TV Aberta Nacional (R$ 10,00/execução)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label><Play size={18} />Execuções por Mês</label>
              <input type="number" placeholder="Ex: 200" value={executions} onChange={(e) => setExecutions(e.target.value)} />
            </div>
            <div className={styles.formGroup}>
              <label><Percent size={18} />Sua Participação (%)</label>
              <input type="number" placeholder="Ex: 50" min="1" max="100" value={radioParticipation} onChange={(e) => setRadioParticipation(e.target.value)} />
            </div>
          </form>

          <button className={styles.calculateButton} onClick={calcularRadioTV}>
            <LineChart size={22} />Calcular Estimativa
          </button>

          {radioRes && (
            <div className={`${styles.resultsPanel} ${styles.active}`}>
              <div className={styles.resultsHeader}>
                <h3><PieChart size={28} /> Resultados Rádio/TV</h3>
              </div>
              <div className={styles.resultsGrid}>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Mensal</div>
                  <div className={styles.value}>{fmtBRL(radioRes.monthly)}</div>
                  <div className={styles.resultSubtitle}>Por mês</div>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Anual</div>
                  <div className={styles.value}>{fmtBRL(radioRes.yearly)}</div>
                  <div className={styles.resultSubtitle}>12 meses</div>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Por Execução</div>
                  <div className={styles.value}>{fmtBRL(radioRes.perExecYours)}</div>
                  <div className={styles.resultSubtitle}>Valor médio</div>
                </div>
              </div>
              <div className={styles.chartContainer}>
                <div className={styles.barChart}>
                  {radioRes.chart.map((v, i) => (
                    <div key={i} className={styles.barCol}>
                      <div className={`${styles.bar} ${styles.barAccent}`} style={{ height: `${(v / maxOf(radioRes.chart)) * 100}%` }} />
                      <span>{months12[i]}</span>
                    </div>
                  ))}
                </div>
                <p className={styles.chartLegend}>Receita Mensal (R$)</p>
              </div>
              <p className={styles.disclaimerNote}>
                <Info size={16} /> Valores estimados baseados em médias de mercado. Podem variar conforme região e acordos.
              </p>
            </div>
          )}
        </div>

        {/* Sincronização Simulator */}
        <div className={`${styles.simulatorCard} ${category === 'receber' && tab === 'sinc' ? styles.active : ''}`} id="sinc">
          <div className={styles.simulatorHeader}>
            <h2><Clapperboard size={32} /> Simulador de Sincronização</h2>
            <p>Calcule valores de sincronização para cinema, TV, publicidade e jogos</p>
          </div>

          <form className={styles.simulatorForm} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.formGroup}>
              <label><Clapperboard size={18} />Tipo de Produção</label>
              <select value={prodType} onChange={(e) => setProdType(e.target.value)}>
                <option value="2000">Vídeo YouTube/Redes (R$ 500 - 2.000)</option>
                <option value="5000">Curta-Metragem (R$ 2.000 - 5.000)</option>
                <option value="15000">Comercial Regional (R$ 5.000 - 15.000)</option>
                <option value="50000">Série Streaming (R$ 20.000 - 50.000)</option>
                <option value="100000">Comercial Nacional TV (R$ 50.000 - 100.000)</option>
                <option value="250000">Filme Cinema (R$ 100.000 - 250.000+)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label><Clock size={18} />Tempo de Uso</label>
              <select value={usage} onChange={(e) => setUsage(e.target.value)}>
                <option value="0.5">Até 30 segundos (50%)</option>
                <option value="0.75">30s - 1 minuto (75%)</option>
                <option value="1">Mais de 1 minuto (100%)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label><Globe size={18} />Território</label>
              <select value={territory} onChange={(e) => setTerritory(e.target.value)}>
                <option value="0.5">Regional/Local (50%)</option>
                <option value="1">Nacional (100%)</option>
                <option value="2">Internacional (200%)</option>
                <option value="3">Mundial (300%)</option>
              </select>
            </div>
            <div className={styles.formGroup}>
              <label><Percent size={18} />Sua Participação (%)</label>
              <input type="number" placeholder="Ex: 50" min="1" max="100" value={sincParticipation} onChange={(e) => setSincParticipation(e.target.value)} />
            </div>
          </form>

          <button className={styles.calculateButton} onClick={calcularSinc}>
            <LineChart size={22} />Calcular Estimativa
          </button>

          {sincRes && (
            <div className={`${styles.resultsPanel} ${styles.active}`}>
              <div className={styles.resultsHeader}>
                <h3><PieChart size={28} /> Resultados Sincronização</h3>
              </div>
              <div className={styles.resultsGrid}>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Valor Base</div>
                  <div className={styles.value}>{fmtBRL(sincRes.base)}</div>
                  <div className={styles.resultSubtitle}>Tipo de produção</div>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Valor Ajustado</div>
                  <div className={styles.value}>{fmtBRL(sincRes.adjusted)}</div>
                  <div className={styles.resultSubtitle}>Com multiplicadores</div>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Sua Parte</div>
                  <div className={styles.value}>{fmtBRL(sincRes.yours)}</div>
                  <div className={styles.resultSubtitle}>Conforme participação</div>
                </div>
              </div>
              <p className={styles.disclaimerNote}>
                <Info size={16} /> Valores de sincronização são altamente variáveis e negociáveis. Esta é apenas uma estimativa educacional.
              </p>
            </div>
          )}
        </div>

        {/* Quanto Pagar Simulator */}
        <div className={`${styles.simulatorCard} ${category === 'pagar' && tab === 'quanto-pagar' ? styles.active : ''}`} id="quanto-pagar">
          <div className={styles.simulatorHeader}>
            <h2><Calculator size={32} /> Simulador de Cobrança de Direitos Autorais</h2>
            <p>Calcule valores estimados de direitos autorais por segmento</p>

            <div className={styles.alertBox}>
              <p>
                <strong><TriangleAlert size={16} className={styles.iconWarn} /> IMPORTANTE - SIMULADOR EDUCACIONAL</strong><br /><br />
                ⚠️ A Figa <strong>NÃO COBRA</strong> nem participa do processo de arrecadação de direitos autorais.<br />
                ⚠️ Este simulador é <strong>APENAS EDUCACIONAL</strong> e tem fins informativos.<br />
                ⚠️ Os valores são <strong>ESTIMATIVAS</strong> baseadas em regulamentos públicos de 2026.<br />
                ⚠️ Valores reais devem ser consultados nos regulamentos oficiais de arrecadação.
              </p>
            </div>
          </div>

          <form className={styles.simulatorForm} onSubmit={calcularPagar}>
            <div className={`${styles.formGroup} ${styles.fullWidth}`}>
              <label className={styles.labelHighlight}><Layers size={18} /> Selecione o Segmento</label>
              <select value={segmento} onChange={(e) => setSegmento(e.target.value)}>
                <option value="">-- Escolha um segmento --</option>
                <option value="comercio">🏪 Comércio & Lojas</option>
                <option value="alimentacao">🍽️ Alimentação (Restaurante, Bar, Lanchonete)</option>
                <option value="hospedagem">🏨 Hospedagem (Hotel, Pousada)</option>
                <option value="fitness">💪 Fitness & Bem-estar (Academia, Spa)</option>
                <option value="eventos">🎤 Eventos & Shows</option>
                <option value="festas">🎉 Festas Privadas (Casamento, Formatura)</option>
                <option value="radio">📻 Rádio</option>
                <option value="tv">📺 Televisão</option>
                <option value="streaming">🎵 Streaming/Sonorização Ambiental</option>
              </select>
              <small className={styles.fieldHint}>
                <Info size={14} /> Cada segmento possui regras específicas de cálculo
              </small>
            </div>

            {showArea && (
              <div className={styles.formGroup}>
                <label><Ruler size={18} /> Área do Estabelecimento (m²)</label>
                <input type="number" placeholder="Ex: 300" min="1" value={areaM2} onChange={(e) => setAreaM2(e.target.value)} />
                <small className={styles.fieldHint}><Info size={14} /> Informe a área total de atendimento ao público</small>
              </div>
            )}

            {showReceita && (
              <div className={styles.formGroup}>
                <label><DollarSign size={18} /> Receita Bruta Mensal (R$)</label>
                <input type="number" placeholder="Ex: 50000" min="0" step="100" value={receitaBruta} onChange={(e) => setReceitaBruta(e.target.value)} />
                <small className={styles.fieldHint}><Info size={14} /> Receita média mensal do estabelecimento</small>
              </div>
            )}

            {showRendaEvento && (
              <div className={styles.formGroup}>
                <label><DollarSign size={18} /> Renda Bruta do Evento (R$)</label>
                <input type="number" placeholder="Ex: 100000" min="0" step="500" value={rendaEvento} onChange={(e) => setRendaEvento(e.target.value)} />
                <small className={styles.fieldHint}><Info size={14} /> Receita total do evento (bilheteria + patrocínio)</small>
              </div>
            )}

            {showPublico && (
              <div className={styles.formGroup}>
                <label><Users size={18} /> Público Estimado</label>
                <input type="number" placeholder="Ex: 1000" min="1" value={publicoEvento} onChange={(e) => setPublicoEvento(e.target.value)} />
                <small className={styles.fieldHint}><Info size={14} /> Número estimado de participantes</small>
              </div>
            )}

            {showPorte && (
              <div className={styles.formGroup}>
                <label><Building2 size={18} /> Porte do Estabelecimento</label>
                <select value={porteComercio} onChange={(e) => setPorteComercio(e.target.value)}>
                  <option value="">Selecione...</option>
                  <option value="pequeno">Pequeno (até 200m²)</option>
                  <option value="medio">Médio (200-500m²)</option>
                  <option value="grande">Grande (acima de 500m²)</option>
                </select>
              </div>
            )}

            {showAlcance && (
              <div className={styles.formGroup}>
                <label><Signal size={18} /> Alcance da Emissora</label>
                <select value={alcanceEmissora} onChange={(e) => setAlcanceEmissora(e.target.value)}>
                  <option value="">Selecione...</option>
                  <option value="local">Local/Comunitária</option>
                  <option value="regional">Regional</option>
                  <option value="nacional">Nacional</option>
                </select>
              </div>
            )}

            <button type="submit" className={`${styles.calculateButton} ${styles.fullWidth}`}>
              <Calculator size={22} /> Calcular Valor Estimado
            </button>
          </form>

          {pagarRes && (
            <div className={`${styles.resultsPanel} ${styles.active}`}>
              <div className={styles.resultsHeader}>
                <h3><BarChart3 size={28} /> Resultado da Simulação</h3>
              </div>

              <div className={styles.dashedNote}>
                <p><Info size={16} className={styles.iconWarn} /> <strong>Estes valores são apenas estimativas educacionais</strong></p>
              </div>

              <div className={styles.resultsGrid}>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Valor Estimado (Período)</div>
                  <div className={styles.value}>{fmtCurrency(pagarRes.valor)}</div>
                  <div className={styles.resultSubtitle}>{pagarRes.periodo}</div>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Base de Cálculo</div>
                  <div className={`${styles.value} ${styles.valueSm} ${styles.valueSecondary}`}>{pagarRes.baseCalculo}</div>
                  <div className={styles.resultSubtitle}>Método utilizado</div>
                </div>
                <div className={styles.resultItem}>
                  <div className={styles.label}>Segmento</div>
                  <div className={`${styles.value} ${styles.valueSm}`}>{pagarRes.nomeSegmento}</div>
                  <div className={styles.resultSubtitle}>Categoria selecionada</div>
                </div>
              </div>

              <div className={styles.contextBox}>
                <h4><Info size={22} /> Sobre este Cálculo</h4>
                <p dangerouslySetInnerHTML={{ __html: pagarRes.contexto }} />
                <div className={styles.contextWarn}>
                  <p>
                    <strong className={styles.warnLabel}><TriangleAlert size={14} /> Lembre-se:</strong><br />
                    • Este é um <strong>simulador educacional</strong> com valores estimados<br />
                    • Os valores reais podem variar conforme regulamentos específicos de cada entidade arrecadadora<br />
                    • Consulte sempre os regulamentos oficiais para valores exatos<br />
                    • A Figa <strong>NÃO cobra</strong> nem participa do processo de arrecadação
                  </p>
                </div>
              </div>

              <div className={styles.finalDisclaimer}>
                <p>
                  <TriangleAlert size={16} className={styles.iconWarn} /> <strong>ATENÇÃO:</strong><br />
                  Este é um <strong>simulador educacional</strong>. Valores reais devem ser consultados nos regulamentos oficiais.<br />
                  A Figa <strong>NÃO participa</strong> do processo de arrecadação e <strong>NÃO cobra</strong> esses valores.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className={styles.infoBox}>
          <h4><Lightbulb size={20} />Sobre os Simuladores</h4>
          <p>Os simuladores da Figa utilizam médias de mercado atualizadas para 2026. Os valores reais podem variar significativamente conforme acordos comerciais, região geográfica, tipo de licenciamento e outros fatores. Utilize estas estimativas apenas para fins educacionais e de planejamento. Para valores precisos, consulte sua distribuidora, associação de música ou nossa equipe de especialistas.</p>
        </div>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <h2><Rocket size={32} /> Maximize Seus Royalties com a Figa</h2>
          <p>Nossa tecnologia ajuda você a identificar oportunidades, cruzar dados e otimizar seus ganhos. Fale com nossa equipe.</p>
          <a href="https://wa.me/5521991966325" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
            <MessageCircle size={22} />Fale com Especialistas
          </a>
        </section>
      </div>

      <Footer />
    </main>
  )
}
