'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from './page.module.css'
import {
  Banknote, Info, Eye, Users, Settings, Calculator, Gavel,
  Headphones, RadioTower, Music, Store, Film, Share2, Phone,
  Volume2, HelpCircle, Lightbulb, Radio,
  Tv, Ticket, ShoppingCart, Video, Youtube, Smartphone, Building2,
  Check, AlertTriangle, Scale, FileText, Landmark, FileSpreadsheet,
  Rocket, MessageCircle, Compass
} from 'lucide-react'

export default function ComoPagar() {
  const sidebarLinks = [
    { id: 'visao-geral', label: 'Visão Geral', icon: <Eye size={18} /> },
    { id: 'quem-deve-pagar', label: 'Quem Deve Pagar', icon: <Users size={18} /> },
    { id: 'como-funciona', label: 'Como Funciona', icon: <Settings size={18} /> },
    { id: 'simulador', label: 'Simulador', icon: <Calculator size={18} /> },
    { id: 'legislacao', label: 'Legislação', icon: <Gavel size={18} /> },
    { id: 'streaming', label: 'Streaming', icon: <Headphones size={18} /> },
    { id: 'radio-tv', label: 'Rádio & TV', icon: <RadioTower size={18} /> },
    { id: 'shows', label: 'Shows & Eventos', icon: <Music size={18} /> },
    { id: 'estabelecimentos', label: 'Estabelecimentos', icon: <Store size={18} /> },
    { id: 'cinema', label: 'Cinema & Audiovisual', icon: <Film size={18} /> },
    { id: 'redes-sociais', label: 'Redes Sociais', icon: <Share2 size={18} /> },
    { id: 'telefonia', label: 'Telefonia', icon: <Phone size={18} /> },
    { id: 'sonorizacao', label: 'Sonorização Ambiental', icon: <Volume2 size={18} /> },
    { id: 'duvidas-frequentes', label: 'Dúvidas Frequentes', icon: <HelpCircle size={18} /> }
  ]

  const quemDevePagar = [
    {
      icon: <Store size={20} />,
      title: 'Estabelecimentos Comerciais',
      items: ['Bares e restaurantes', 'Lojas e shopping centers', 'Academias e clubes', 'Hotéis e pousadas', 'Clínicas e consultórios']
    },
    {
      icon: <Music size={20} />,
      title: 'Entretenimento',
      items: ['Shows e festivais', 'Casas de eventos', 'Boates e baladas', 'Circos e parques', 'Produtoras de eventos']
    },
    {
      icon: <RadioTower size={20} />,
      title: 'Mídia e Comunicação',
      items: ['Emissoras de rádio', 'Canais de TV', 'Plataformas de streaming', 'Produtoras audiovisuais', 'Agências de publicidade']
    }
  ]

  const processo = [
    {
      num: 1,
      title: 'Identificação do Uso Musical',
      desc: 'O estabelecimento ou usuário identifica que utilizará música protegida por direitos autorais em suas atividades.'
    },
    {
      num: 2,
      title: 'Cálculo do Valor Devido',
      desc: 'O valor é calculado com base no segmento de atuação, porte do estabelecimento, faturamento ou outros critérios específicos definidos em regulamento.'
    },
    {
      num: 3,
      title: 'Pagamento ao Órgão Arrecadador',
      desc: 'O pagamento é realizado ao órgão centralizador responsável pela arrecadação de direitos de execução pública no Brasil.'
    },
    {
      num: 4,
      title: 'Distribuição aos Titulares',
      desc: 'Os valores arrecadados são distribuídos aos compositores, editores e demais titulares de direitos através das associações de música, conforme os registros de execução e splits de participação.'
    }
  ]

  const legislacao = [
    {
      icon: <Scale size={20} />,
      title: 'Lei 9.610/98 - Lei de Direitos Autorais',
      desc: 'Estabelece os direitos de autor sobre obras intelectuais, incluindo obras musicais. Define que a execução pública de música protegida requer autorização e pagamento aos titulares.',
      note: <><strong>Artigos principais:</strong> Arts. 28, 29, 68, 97, 98, 99</>
    },
    {
      icon: <FileText size={20} />,
      title: 'Regulamentos de Arrecadação',
      desc: 'Regulamentos específicos definem os valores e metodologias de cobrança para cada segmento (rádio, TV, estabelecimentos comerciais, shows, streaming, etc.).',
      note: <><strong>Atualização:</strong> Os regulamentos são periodicamente revisados e atualizados conforme mudanças no mercado e na tecnologia.</>
    },
    {
      icon: <Landmark size={20} />,
      title: 'Decisões do MinC e Judiciário',
      desc: 'O Ministério da Cultura (MinC) e decisões judiciais também influenciam as regras de arrecadação e distribuição de direitos autorais no país.',
      note: null
    }
  ]

  const simuladorCards = [
    { emoji: '🏪', title: 'Comércio', desc: 'Lojas, restaurantes, bares' },
    { emoji: '🎤', title: 'Eventos', desc: 'Shows, festas, casamentos' },
    { emoji: '📻', title: 'Rádio & TV', desc: 'Emissoras e canais' },
    { emoji: '🏨', title: 'Outros', desc: 'Hotéis, academias, etc.' }
  ]

  const segmentos = [
    {
      id: 'streaming',
      sectionIcon: <Headphones size={28} />,
      sectionTitle: 'Streaming Musical',
      cards: [
        {
          icon: <Music size={28} />,
          title: 'Plataformas Digitais',
          percentage: '~0,003-0,005',
          subtitle: 'Por stream',
          paragraph: 'As plataformas de streaming pagam valores que variam conforme acordos comerciais e região de reprodução.',
          rules: ['Spotify, Apple Music, Deezer, etc.', 'Pagamento por stream individual', 'Valores variam por país e assinatura', 'Mínimo de 30 segundos reproduzidos']
        }
      ]
    },
    {
      id: 'radio-tv',
      sectionIcon: <RadioTower size={28} />,
      sectionTitle: 'Rádio & TV',
      cards: [
        {
          icon: <Radio size={28} />,
          title: 'Rádio',
          percentage: '35%',
          subtitle: 'Do total arrecadado',
          rules: ['Cobrança sobre faturamento da emissora', 'Valores variam por porte e localização', 'Fiscalização de playlist obrigatória', 'Pagamento mensal ao ECAD']
        },
        {
          icon: <Tv size={28} />,
          title: 'TV Aberta e Por Assinatura',
          percentage: '30%',
          subtitle: 'Do total arrecadado',
          rules: ['Base de cálculo sobre receita bruta', 'Novelas, programas, vinhetas', 'Relatório de uso trimestral', 'Percentual fixo por tipo de emissora']
        }
      ]
    },
    {
      id: 'shows',
      sectionIcon: <Music size={28} />,
      sectionTitle: 'Shows & Eventos',
      cards: [
        {
          icon: <Ticket size={28} />,
          title: 'Shows Públicos',
          percentage: '20%',
          subtitle: 'Do total arrecadado',
          rules: ['5% a 10% da renda bruta do evento', 'Declaração prévia obrigatória', 'Pagamento antes da realização', 'Setlist deve ser informado']
        }
      ]
    },
    {
      id: 'estabelecimentos',
      sectionIcon: <Store size={28} />,
      sectionTitle: 'Estabelecimentos Comerciais',
      cards: [
        {
          icon: <ShoppingCart size={28} />,
          title: 'Comércio',
          percentage: '12%',
          subtitle: 'Do total arrecadado',
          rules: ['Restaurantes, bares, lojas', 'Valor fixo mensal por m²', 'Varia conforme categoria do estabelecimento', 'Licença anual renovável']
        }
      ]
    },
    {
      id: 'cinema',
      sectionIcon: <Film size={28} />,
      sectionTitle: 'Cinema & Audiovisual',
      cards: [
        {
          icon: <Video size={28} />,
          title: 'Sincronização',
          percentage: 'Negociável',
          subtitle: 'Por obra/projeto',
          rules: ['Filmes, séries, comerciais', 'Negociação direta com titulares', 'Valores variam por tipo de uso', 'Contratos específicos por projeto']
        }
      ]
    },
    {
      id: 'redes-sociais',
      sectionIcon: <Share2 size={28} />,
      sectionTitle: 'Redes Sociais',
      cards: [
        {
          icon: <Youtube size={28} />,
          title: 'YouTube, TikTok, Meta',
          percentage: '3%',
          subtitle: 'Do total arrecadado',
          rules: ['Acordos diretos com plataformas', 'Content ID e sistemas de reconhecimento', 'Valores por visualização/uso', 'Crescente importância no mercado']
        }
      ]
    },
    {
      id: 'telefonia',
      sectionIcon: <Phone size={28} />,
      sectionTitle: 'Telefonia',
      cards: [
        {
          icon: <Smartphone size={28} />,
          title: 'Toques e Espera',
          percentage: 'Valor fixo',
          subtitle: 'Por download/assinatura',
          rules: ['Ringtones, música de espera', 'Acordo com operadoras', 'Percentual sobre vendas', 'Relatórios mensais de uso']
        }
      ]
    },
    {
      id: 'sonorizacao',
      sectionIcon: <Volume2 size={28} />,
      sectionTitle: 'Sonorização Ambiental',
      cards: [
        {
          icon: <Building2 size={28} />,
          title: 'Espaços Públicos',
          percentage: 'Licença anual',
          subtitle: 'Por local',
          rules: ['Academias, clínicas, escritórios', 'Valor fixo conforme categoria', 'Renovação anual obrigatória', 'Fiscalização periódica']
        }
      ]
    }
  ]

  const faqs = [
    {
      q: 'Sou obrigado a pagar direitos autorais?',
      a: <>Sim. Se você utiliza música de forma pública em seu estabelecimento, evento ou plataforma, a Lei 9.610/98 determina que você deve pagar direitos autorais aos titulares das obras executadas.</>
    },
    {
      q: 'Como é calculado o valor que devo pagar?',
      a: <>O valor varia conforme o segmento: pode ser baseado em faturamento (restaurantes), área do estabelecimento (comércio), número de espectadores (shows), alcance (rádio/TV) ou outros critérios específicos definidos em regulamento.</>
    },
    {
      q: 'A Figa cobra direitos autorais?',
      a: <><strong>NÃO.</strong> A Figa não participa do processo de cobrança. Somos uma empresa de tecnologia que desenvolve sistemas de inteligência de dados para facilitar a gestão e compreensão de informações sobre direitos autorais.</>
    },
    {
      q: 'Para quem devo pagar?',
      a: <>No Brasil, o pagamento de direitos de execução pública é centralizado e gerenciado por órgão específico em conjunto com as associações de música. Entre em contato com as entidades oficiais para regularizar seu estabelecimento ou atividade.</>
    },
    {
      q: 'O que acontece se eu não pagar?',
      a: <>A utilização de música sem autorização ou sem pagamento pode resultar em multas civis, processos judiciais e, em casos graves, até sanções criminais previstas na Lei de Direitos Autorais.</>
    },
    {
      q: 'O simulador da Figa fornece valores oficiais?',
      a: <><strong>NÃO.</strong> O simulador é uma ferramenta educacional que apresenta estimativas baseadas em regulamentos públicos de 2026. Para valores exatos e oficiais, consulte sempre os órgãos responsáveis pela arrecadação.</>
    },
    {
      q: 'Posso usar música apenas durante parte do dia e pagar menos?',
      a: <>Depende do segmento e do regulamento específico. Alguns segmentos possuem categorias diferenciadas para uso parcial ou eventual. Consulte os regulamentos oficiais para seu caso específico.</>
    },
    {
      q: 'Música ao vivo também requer pagamento?',
      a: <>Sim. Tanto músicas reproduzidas mecanicamente (som ambiente, DJ) quanto músicas executadas ao vivo (bandas, músicos) estão sujeitas ao pagamento de direitos autorais se forem obras protegidas.</>
    },
    {
      q: 'Como a Figa pode me ajudar?',
      a: <>A Figa oferece sistemas avançados de cruzamento de dados, análise de relatórios, dashboards inteligentes e consultoria especializada para ajudar você a entender melhor seus direitos e obrigações autorais. Nosso foco é clareza e inteligência de dados.</>
    }
  ]

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
            <h1>Como Pagar Direitos Autorais</h1>
            <p className={styles.subtitle}>Entenda como funciona o sistema de pagamento no Brasil</p>
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
              <h3><Info size={28} /> Importante: Papel da Figa</h3>
              <p><strong>A Figa NÃO cobra nem participa do processo de cobrança de direitos autorais.</strong> Nossa função é fornecer clareza, inteligência e tecnologia para facilitar o entendimento e a gestão das suas informações. O pagamento de direitos autorais no Brasil é gerenciado por entidades especializadas que atuam em conjunto com as associações de música.</p>
              <p style={{ marginTop: '1rem' }}>A Figa desenvolve <strong>sistemas avançados de dados</strong> para facilitar a leitura de informações, cruzamento de dados e análise de royalties, ajudando artistas e titulares a compreenderem seus direitos.</p>
            </div>
          </motion.div>

          {/* Visão Geral */}
          <section id="visao-geral" className={styles.section}>
            <h2><Eye size={32} /> Visão Geral</h2>
            <p>O pagamento de direitos autorais no Brasil é dividido em diferentes segmentos, cada um com suas regras específicas de cobrança. Os valores pagos são distribuídos entre compositores, editores e demais titulares de direitos.</p>

            <div className={styles.infoBox}>
              <h4><Lightbulb size={20} /> Como a Figa pode ajudar</h4>
              <p>Desenvolvemos sistemas inteligentes que cruzam dados de diferentes fontes, facilitando a leitura e compreensão dos seus relatórios de pagamento. Nossa tecnologia identifica inconsistências, oportunidades e fornece análises detalhadas do seu desempenho em cada segmento.</p>
            </div>
          </section>

          {/* Quem Deve Pagar */}
          <section id="quem-deve-pagar" className={styles.section}>
            <h2><Users size={32} /> Quem Deve Pagar</h2>
            <p>Qualquer estabelecimento ou entidade que utilize música de forma pública deve pagar direitos autorais, conforme previsto na Lei 9.610/98 (Lei de Direitos Autorais).</p>

            <div className={styles.cardsGrid}>
              {quemDevePagar.map((card, i) => (
                <div key={i} className={styles.infoBox}>
                  <h4>{card.icon} {card.title}</h4>
                  <ul className={styles.checkList}>
                    {card.items.map((item, j) => (
                      <li key={j}><Check size={16} /> {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className={styles.alertBox}>
              <h3><AlertTriangle size={24} /> Importante</h3>
              <p>A utilização de música sem autorização ou sem pagamento dos devidos direitos autorais pode resultar em multas e processos judiciais. A Lei 9.610/98 prevê sanções civis e criminais para uso não autorizado de obras protegidas.</p>
            </div>
          </section>

          {/* Como Funciona */}
          <section id="como-funciona" className={styles.section}>
            <h2><Settings size={32} /> Como Funciona o Processo de Pagamento</h2>
            <p>O pagamento de direitos autorais no Brasil segue um fluxo específico regulamentado por lei:</p>

            <div className={styles.processBox}>
              <div className={styles.processSteps}>
                {processo.map((step) => (
                  <div key={step.num} className={styles.processStep}>
                    <div className={styles.processNum}>{step.num}</div>
                    <div>
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${styles.infoBox} ${styles.infoBoxSecondary}`}>
              <h4><Info size={20} /> A Figa Não Cobra</h4>
              <p>A Figa <strong>NÃO participa</strong> do processo de cobrança. Oferecemos sistemas de inteligência de dados para facilitar a compreensão dos relatórios, cruzamento de informações e análise de royalties.</p>
            </div>
          </section>

          {/* Legislação */}
          <section id="legislacao" className={styles.section}>
            <h2><Gavel size={32} /> Legislação e Regulamentação</h2>
            <p>O pagamento de direitos autorais no Brasil é fundamentado em leis federais e regulamentos específicos:</p>

            {legislacao.map((item, i) => (
              <div key={i} className={styles.lawCard}>
                <h4>{item.icon} {item.title}</h4>
                <p className={styles.lawDesc}>{item.desc}</p>
                {item.note && <p className={styles.lawNote}>{item.note}</p>}
              </div>
            ))}

            <div className={styles.alertBox}>
              <h3><Info size={24} /> Observação</h3>
              <p>Este guia apresenta informações educacionais baseadas em regulamentos públicos de 2026. Para valores exatos e atualizados, consulte sempre os órgãos oficiais responsáveis pela arrecadação.</p>
            </div>
          </section>

          {/* Simulador Integrado */}
          <section id="simulador" className={styles.section}>
            <div className={styles.simulatorWrapper}>
              <h2 className={styles.simulatorTitle}>
                <Calculator size={36} /> Simulador de Pagamento
              </h2>
              <p className={styles.simulatorIntro}>
                Calcule quanto estabelecimentos e usuários devem pagar em direitos autorais por segmento
              </p>

              <div className={styles.simulatorInner}>
                <h3 className={styles.simulatorInnerTitle}>
                  <FileSpreadsheet size={26} /> Simulador Completo por Segmento
                </h3>
                <p className={styles.simulatorInnerDesc}>
                  Acesse nosso simulador completo com 9 segmentos específicos e cálculos baseados em regulamentos oficiais
                </p>

                <div className={styles.simSegGrid}>
                  {simuladorCards.map((card, i) => (
                    <div key={i} className={styles.simSegCard}>
                      <div className={styles.simSegEmoji}>{card.emoji}</div>
                      <h4>{card.title}</h4>
                      <p>{card.desc}</p>
                    </div>
                  ))}
                </div>

                <div className={styles.simAccessWrapper}>
                  <Link href="/simulador" className={styles.simAccessBtn}>
                    <Calculator size={20} /> Acessar Simulador Completo
                  </Link>
                </div>
              </div>

              <div className={styles.simWarning}>
                <p>
                  <AlertTriangle size={16} /> <strong>Importante:</strong> Os simuladores são educacionais. A Figa NÃO cobra nem participa do processo de cobrança.
                </p>
              </div>
            </div>
          </section>

          {/* Segmentos */}
          {segmentos.map((seg) => (
            <section key={seg.id} id={seg.id} className={styles.section}>
              <h2>{seg.sectionIcon} {seg.sectionTitle}</h2>
              <div className={styles.segmentsGrid}>
                {seg.cards.map((card, i) => (
                  <motion.div
                    key={i}
                    className={styles.segmentCard}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <h3>{card.icon} {card.title}</h3>
                    <div className={styles.percentage}>{card.percentage}</div>
                    {card.subtitle && <p><strong>{card.subtitle}</strong></p>}
                    {card.paragraph && <p>{card.paragraph}</p>}
                    <ul className={styles.rulesList}>
                      {card.rules.map((rule, j) => (
                        <li key={j}><Check size={16} /> {rule}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}

          {/* Dúvidas Frequentes */}
          <section id="duvidas-frequentes" className={styles.section}>
            <h2><HelpCircle size={32} /> Dúvidas Frequentes</h2>

            <div className={styles.faqGrid}>
              {faqs.map((faq, i) => (
                <div key={i} className={`${styles.infoBox} ${styles.faqItem}`}>
                  <h4><HelpCircle size={20} /> {faq.q}</h4>
                  <p className={styles.faqAnswer}>{faq.a}</p>
                </div>
              ))}
            </div>

            <div className={`${styles.alertBox} ${styles.alertAccent}`}>
              <h3><Lightbulb size={24} /> Ainda tem dúvidas?</h3>
              <p>Entre em contato com nossa equipe através do WhatsApp ou e-mail. Teremos prazer em ajudar você a entender melhor como funcionam os direitos autorais no seu segmento específico.</p>
            </div>
          </section>

          {/* CTA Section */}
          <section className={`${styles.section} ${styles.ctaSection}`}>
            <h2 className={styles.ctaTitle}><Rocket size={32} /> Precisa de Ajuda com Seus Dados?</h2>
            <p className={styles.ctaText}>A Figa desenvolve sistemas avançados para análise, cruzamento de dados e gestão inteligente de direitos autorais. Transforme seus relatórios em insights claros e acionáveis.</p>
            <a href="https://wa.me/5521991966325" target="_blank" rel="noopener noreferrer" className={styles.ctaButton}>
              <MessageCircle size={20} /> Fale com Nossa Equipe
            </a>
          </section>
        </div>
      </div>

      <Footer />
    </main>
  )
}
