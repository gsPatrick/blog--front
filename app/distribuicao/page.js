'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from './page.module.css'
import {
  Eye, ListOrdered, Coins, PieChart, Barcode, Gavel, Cpu,
  Compass, ArrowRight, Check, Info, AlertTriangle, BookOpen,
  Radio, Disc3, Film, Music, FileText, UserCircle,
  CalendarDays, Percent, ShieldCheck, Database, ArrowRightLeft,
  Plug, Settings, FileCode, TrendingUp, Rocket, Lightbulb,
  MessageCircle
} from 'lucide-react'

export default function Distribuicao() {
  const sidebarLinks = [
    { id: 'visao-geral', icon: <Eye size={18} />, label: 'Visão Geral' },
    { id: 'processo', icon: <ListOrdered size={18} />, label: 'Processo de Distribuição' },
    { id: 'tipos-direitos', icon: <Coins size={18} />, label: 'Tipos de Direitos' },
    { id: 'splits', icon: <PieChart size={18} />, label: 'Divisão de Royalties' },
    { id: 'codigos', icon: <Barcode size={18} />, label: 'Códigos e Identificação' },
    { id: 'regulamento', icon: <Gavel size={18} />, label: 'Regulamento' },
    { id: 'sistemas-figa', icon: <Cpu size={18} />, label: 'Sistemas & Tecnologia' }
  ]

  const fluxoSteps = [
    { num: 1, label: 'Arrecadação' },
    { num: 2, label: 'Processamento' },
    { num: 3, label: 'Cálculo' },
    { num: 4, label: 'Distribuição' }
  ]

  const processoSteps = [
    { num: 1, title: 'Identificação da Obra', desc: 'Cada execução, stream ou uso da obra é identificado por códigos únicos (ISRC, ISWC) que permitem rastrear seu uso em diferentes plataformas e meios de comunicação.' },
    { num: 2, title: 'Registro de Execução', desc: 'As plataformas, rádios, TVs e outros usuários reportam as execuções através de relatórios (playlists, logs de streaming, setlists de shows). Estes dados são processados e validados.' },
    { num: 3, title: 'Cálculo de Valores', desc: 'Com base nas regras de cada segmento, são calculados os valores devidos por cada uso. Os percentuais variam conforme o tipo de direito (execução pública, mecânico, sincronização).' },
    { num: 4, title: 'Identificação de Titulares', desc: 'Através do cadastro na associação de música, são identificados todos os titulares da obra (compositores, editores, coautores) e suas respectivas participações (splits).' },
    { num: 5, title: 'Distribuição aos Titulares', desc: 'Os valores são distribuídos proporcionalmente às participações cadastradas. Compositores recebem sua parte, editoras a delas, e assim sucessivamente.' },
    { num: 6, title: 'Pagamento', desc: 'As associações realizam o pagamento aos seus filiados conforme periodicidade estabelecida (mensal, trimestral ou semestral), após dedução de taxas administrativas.' }
  ]

  const tiposDireitos = [
    {
      icon: <Radio />, title: 'Execução Pública', percentage: '~70%',
      desc: 'Gerado quando a música é executada publicamente em rádio, TV, shows, estabelecimentos comerciais, streaming e outros ambientes públicos.',
      items: ['Rádio e TV', 'Streaming (Spotify, Apple Music)', 'Shows e eventos', 'Bares, restaurantes, lojas']
    },
    {
      icon: <Disc3 />, title: 'Direito Mecânico', percentage: '~20%',
      desc: 'Gerado pela reprodução mecânica da obra, seja física (CDs, vinis) ou digital (downloads, streams on-demand).',
      items: ['CDs e vinis', 'Downloads digitais', 'Streaming on-demand', 'Ringtones']
    },
    {
      icon: <Film />, title: 'Sincronização', percentage: '~10%',
      desc: 'Gerado quando a música é sincronizada com imagens em produções audiovisuais.',
      items: ['Cinema e séries', 'Comerciais de TV', 'Jogos eletrônicos', 'Vídeos corporativos']
    }
  ]

  const splitsRows = [
    { titular: 'Compositor', part: '25-50%', desc: 'Criador da melodia e/ou harmonia' },
    { titular: 'Letrista', part: '25-50%', desc: 'Autor da letra da música' },
    { titular: 'Editor Musical', part: '20-50%', desc: 'Empresa que explora comercialmente a obra' },
    { titular: 'Coautores', part: 'Variável', desc: 'Participações divididas conforme acordo' }
  ]

  const codigos = [
    { icon: <Music />, title: 'ISRC', full: 'International Standard Recording Code', desc: 'Código único de 12 caracteres que identifica cada gravação específica. É como uma impressão digital da faixa gravada.', example: 'Exemplo: BR-ABC-12-34567' },
    { icon: <FileText />, title: 'ISWC', full: 'International Standard Musical Work Code', desc: 'Código único que identifica a obra musical (composição), independente de quantas versões ou gravações existam.', example: 'Exemplo: T-123.456.789-0' },
    { icon: <UserCircle />, title: 'IPI', full: 'Interested Party Information', desc: 'Código que identifica cada titular de direitos (compositor, editor, etc.) nos sistemas internacionais de gestão coletiva.', example: 'Exemplo: 00123456789' }
  ]

  const regulamentoCards = [
    {
      icon: <CalendarDays />, title: 'Prazos',
      items: ['Distribuição trimestral ou semestral', 'Prazo de até 6 meses para processamento', 'Relatórios disponibilizados aos filiados', 'Possibilidade de contestação em até 90 dias']
    },
    {
      icon: <Percent />, title: 'Taxas',
      items: ['Taxa administrativa: até 25% do arrecadado', 'Varia conforme a associação', 'Cobre custos de fiscalização e operação', 'Transparência nos relatórios']
    },
    {
      icon: <ShieldCheck />, title: 'Direitos',
      items: ['Acesso a relatórios detalhados', 'Contestação de valores', 'Correção de cadastros', 'Fiscalização de terceiros']
    }
  ]

  const sistemasCards = [
    {
      icon: <Database />, title: 'Plataforma de Dados',
      desc: 'Sistema robusto de coleta, processamento e visualização de dados de múltiplas fontes.',
      items: ['Dashboard interativo em tempo real', 'Consolidação automática de relatórios', 'Análise preditiva e alertas inteligentes', 'Visualização gráfica avançada']
    },
    {
      icon: <ArrowRightLeft />, title: 'Cruzamento de Dados',
      desc: 'Integração e reconciliação de dados de streaming, distribuidoras e múltiplas fontes de execução.',
      items: ['Matching automático de obras', 'Detecção de inconsistências', 'Identificação de valores não pagos', 'Histórico completo de execuções']
    },
    {
      icon: <Plug />, title: 'Integrações via API',
      desc: 'APIs robustas para integração com sistemas de terceiros e automação de processos.',
      items: ['RESTful API documentada', 'Webhooks para eventos em tempo real', 'Autenticação segura (OAuth 2.0)', 'SDKs para principais linguagens']
    },
    {
      icon: <Settings />, title: 'Gestão de Catálogo',
      desc: 'Sistema completo para gerenciamento de obras, titulares e participações (splits).',
      items: ['Cadastro e edição de obras', 'Gestão de splits e titularidades', 'Controle de versões e alterações', 'Exportação em formatos padrão']
    },
    {
      icon: <FileCode />, title: 'Metadata Management',
      desc: 'Ferramentas para gestão profissional de metadata musical (DDEX, CWR).',
      items: ['Validação automática de metadata', 'Geração de arquivos DDEX/CWR', 'Enriquecimento de dados', 'Compliance com padrões internacionais']
    },
    {
      icon: <TrendingUp />, title: 'Analytics & BI',
      desc: 'Business Intelligence aplicado a direitos autorais com análises avançadas.',
      items: ['Relatórios customizáveis', 'Análise por obra, período, região', 'Comparação de desempenho', 'Exportação para Excel, PDF, CSV']
    }
  ]

  const [activeSection, setActiveSection] = useState('visao-geral')

  useEffect(() => {
    const sections = sidebarLinks
      .map(l => document.getElementById(l.id))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.getAttribute('id'))
          }
        })
      },
      { root: null, rootMargin: '-100px 0px -66%', threshold: 0 }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.pageWrapper}>
        {/* Sidebar Navigation */}
        <aside className={styles.sidebar}>
          <h3><Compass size={20} /> Navegação</h3>
          <ul className={styles.sidebarMenu}>
            {sidebarLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={activeSection === link.id ? styles.active : ''}
                  onClick={() => setActiveSection(link.id)}
                >
                  {link.icon}{link.label}
                </a>
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
            <h1>Distribuição de <span>Direitos Autorais</span></h1>
            <p className={styles.subtitle}>Como os direitos autorais são distribuídos aos titulares</p>
            <p>Entenda o processo completo de distribuição, desde a arrecadação até o pagamento final aos compositores, intérpretes e demais titulares de direitos.</p>
          </motion.section>

          {/* Visão Geral */}
          <section id="visao-geral" className={styles.section}>
            <h2><Eye /> Visão Geral</h2>
            <p>A distribuição de direitos autorais é o processo pelo qual os valores arrecadados pela utilização de obras musicais são repassados aos seus legítimos titulares. No Brasil, este processo é regulado pela Lei 9.610/98 (Lei de Direitos Autorais) e fiscalizado pelo órgão competente.</p>

            <div className={styles.distributionVisual}>
              <h3 className={styles.visualTitle}>Fluxo de Distribuição</h3>
              <div className={styles.distributionChart}>
                {fluxoSteps.map((step, i) => (
                  <div key={step.num} className={styles.chartGroup}>
                    <div className={styles.chartItem}>
                      <div className={styles.chartCircle}>{step.num}</div>
                      <div className={styles.chartLabel}>{step.label}</div>
                    </div>
                    {i < fluxoSteps.length - 1 && (
                      <ArrowRight className={styles.chartArrow} size={32} />
                    )}
                  </div>
                ))}
              </div>
              <p className={styles.visualCaption}>Os valores são distribuídos conforme a participação de cada titular na obra</p>
            </div>
          </section>

          {/* Processo */}
          <section id="processo" className={styles.section}>
            <h2><ListOrdered /> Processo de Distribuição</h2>
            <p>A distribuição de direitos autorais segue um processo estruturado e regulamentado:</p>

            <div className={styles.timeline}>
              {processoSteps.map((step) => (
                <motion.div
                  key={step.num}
                  className={styles.timelineItem}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className={styles.timelineNumber}>{step.num}</div>
                  <div className={styles.timelineContent}>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Tipos de Direitos */}
          <section id="tipos-direitos" className={styles.section}>
            <h2><Coins /> Tipos de Direitos</h2>
            <p>Os direitos autorais musicais são divididos em categorias principais:</p>

            <div className={styles.cardsGrid}>
              {tiposDireitos.map((card) => (
                <motion.div
                  key={card.title}
                  className={styles.infoCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3>{card.icon} {card.title}</h3>
                  <div className={styles.percentage}>{card.percentage}</div>
                  <p>{card.desc}</p>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}><Check size={16} /> {item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Splits */}
          <section id="splits" className={styles.section}>
            <h2><PieChart /> Divisão de Royalties (Splits)</h2>
            <p>Os royalties são divididos entre os diversos titulares conforme suas participações cadastradas na obra:</p>

            <div className={styles.infoBox}>
              <h4><Info size={20} /> Como funciona</h4>
              <p>Cada obra musical pode ter múltiplos titulares: compositores, letristas, editores musicais e intérpretes. A soma de todas as participações deve totalizar 100%. A distribuição é feita proporcionalmente a essas porcentagens.</p>
            </div>

            <div className={styles.comparisonTable}>
              <table>
                <thead>
                  <tr>
                    <th>Titular</th>
                    <th>Participação Típica</th>
                    <th>Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {splitsRows.map((row) => (
                    <tr key={row.titular}>
                      <td><strong>{row.titular}</strong></td>
                      <td>{row.part}</td>
                      <td>{row.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className={`${styles.infoBox} ${styles.warning}`}>
              <h4><AlertTriangle size={20} /> Atenção</h4>
              <p>É fundamental registrar corretamente os splits antes do lançamento da obra. Alterações posteriores podem ser complexas e demoradas, gerando conflitos e atraso nos pagamentos.</p>
            </div>
          </section>

          {/* Códigos */}
          <section id="codigos" className={styles.section}>
            <h2><Barcode /> Códigos e Identificação</h2>
            <p>Para garantir a correta distribuição, obras e gravações utilizam códigos padronizados internacionalmente:</p>

            <div className={styles.cardsGrid}>
              {codigos.map((card) => (
                <motion.div
                  key={card.title}
                  className={styles.infoCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3>{card.icon} {card.title}</h3>
                  <p><strong>{card.full}</strong></p>
                  <p>{card.desc}</p>
                  <p className={styles.codeExample}>{card.example}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Regulamento */}
          <section id="regulamento" className={styles.section}>
            <h2><Gavel /> Regulamento de Distribuição</h2>
            <p>A distribuição de direitos autorais no Brasil segue regulamentos específicos:</p>

            <div className={styles.infoBox}>
              <h4><BookOpen size={20} /> Base Legal</h4>
              <p>Lei 9.610/98 (Lei de Direitos Autorais) estabelece os princípios fundamentais. O órgão responsável pela arrecadação possui regulamento próprio que define critérios de distribuição, prazos, taxas administrativas e procedimentos de contestação.</p>
            </div>

            <div className={styles.cardsGrid}>
              {regulamentoCards.map((card) => (
                <motion.div
                  key={card.title}
                  className={styles.infoCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3>{card.icon} {card.title}</h3>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}><Check size={16} /> {item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Sistemas e Tecnologia Figa */}
          <section id="sistemas-figa" className={`${styles.section} ${styles.systemsSection}`}>
            <h2><Cpu /> Sistemas e Tecnologia Figa</h2>
            <p className={styles.centeredIntro}>A Figa desenvolve sistemas proprietários para trazer inteligência, clareza e eficiência ao mundo dos direitos autorais. Nossa tecnologia transforma dados complexos em insights acionáveis.</p>

            <div className={styles.cardsGrid}>
              {sistemasCards.map((card) => (
                <motion.div
                  key={card.title}
                  className={styles.infoCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <h3>{card.icon} {card.title}</h3>
                  <p>{card.desc}</p>
                  <ul>
                    {card.items.map((item) => (
                      <li key={item}><Check size={16} /> {item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <div className={styles.infoBox} style={{ marginTop: '3rem' }}>
              <h4><Rocket size={20} /> Tecnologia de Ponta</h4>
              <p>Nossos sistemas são desenvolvidos com as mais modernas tecnologias: cloud computing escalável, machine learning para detecção de padrões, segurança avançada (criptografia end-to-end, LGPD compliant) e arquitetura de microserviços para alta disponibilidade. Oferecemos APIs REST documentadas, suporte a webhooks, SDKs em Python, JavaScript e PHP, e integrações nativas com principais plataformas do mercado.</p>
            </div>

            <div className={styles.missionBox}>
              <h3><Lightbulb size={28} /> Nossa Missão</h3>
              <p>
                Transformar dados complexos em <strong className={styles.accentText}>clareza</strong>, processos manuais em <strong className={styles.secondaryText}>automação</strong> e informações fragmentadas em <strong className={styles.accentText}>inteligência acionável</strong>. Com a Figa, você recupera valores perdidos, identifica oportunidades e maximiza seu potencial de arrecadação.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className={`${styles.section} ${styles.ctaSection}`}>
            <h2 className={styles.ctaTitle}><Rocket /> Simplifique Seus Direitos Autorais</h2>
            <p className={styles.ctaText}>Conte com a tecnologia da Figa para entender, gerenciar e maximizar seus direitos autorais. Entre em contato e descubra como podemos ajudar.</p>
            <a
              href="https://wa.me/5521991966325"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              <MessageCircle size={22} /> Fale com Nossa Equipe
            </a>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
