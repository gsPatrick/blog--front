'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from './page.module.css'
import {
  Video,
  PlayCircle,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Info,
  Instagram,
  Download,
  Image as ImageIcon,
  Palette,
  Lightbulb,
  Youtube,
  Globe,
  MessageCircle
} from 'lucide-react'

const slides = [
  {
    img: 'https://www.genspark.ai/api/files/s/ONRgGFaO?cache_control=3600',
    alt: 'Slide 1 - Abertura',
    number: 'SLIDE 1 - ABERTURA (0-3s)',
    title: 'Introdução: FIGA - Proteção Inteligente de Direitos Musicais'
  },
  {
    img: 'https://www.genspark.ai/api/files/s/jm06Lr5x?cache_control=3600',
    alt: 'Slide 2 - Como Trabalhamos',
    number: 'SLIDE 2 - PROCESSO (3-6s)',
    title: 'Como Trabalhamos: Diagnóstico → Análise → Implementação → Otimização'
  },
  {
    img: 'https://www.genspark.ai/api/files/s/UdK2PmIU?cache_control=3600',
    alt: 'Slide 3 - Sistemas',
    number: 'SLIDE 3 - TECNOLOGIA (6-9s)',
    title: 'Dashboards em Tempo Real, Big Data & BI, Cruzamento Inteligente de Dados'
  },
  {
    img: 'https://www.genspark.ai/api/files/s/2nFQHNp1?cache_control=3600',
    alt: 'Slide 4 - Simuladores',
    number: 'SLIDE 4 - FERRAMENTAS (9-12s)',
    title: 'Simuladores: Quanto Vou Receber + Quanto Vou Pagar'
  },
  {
    img: 'https://www.genspark.ai/api/files/s/lHPh7Oyl?cache_control=3600',
    alt: 'Slide 5 - Call to Action',
    number: 'SLIDE 5 - CALL TO ACTION (12-15s)',
    title: 'Acesse Agora: figa.app.br | WhatsApp | Instagram'
  }
]

const videoSpecs = [
  { label: 'Formato:', text: ' 16:9 (1920x1080px ou 1376x768px)' },
  { label: 'Duração sugerida:', text: ' 15 segundos (3s por slide)' },
  { label: 'Plataformas:', text: ' YouTube, LinkedIn, Facebook, Site' },
  { label: 'Transições:', text: ' Fade ou slide suave entre cenas' },
  { label: 'Música de fundo:', text: ' Instrumental corporativo moderno' },
  { label: 'Cores principais:', text: ' Navy (#0A1E35), Teal (#14B8A6), Lima Neon (#A3E635)' }
]

const carouselCards = [
  { img: 'https://www.genspark.ai/api/files/s/kYQhp3RJ?cache_control=3600', alt: 'Card 1', label: 'CARD 1: CAPA - FIGA' },
  { img: 'https://www.genspark.ai/api/files/s/68O1nKeW?cache_control=3600', alt: 'Card 2', label: 'CARD 2: O QUE É A FIGA?' },
  { img: 'https://www.genspark.ai/api/files/s/iiEiqopK?cache_control=3600', alt: 'Card 3', label: 'CARD 3: SISTEMAS AVANÇADOS' },
  { img: 'https://www.genspark.ai/api/files/s/zMp9A28r?cache_control=3600', alt: 'Card 4', label: 'CARD 4: TECNOLOGIAS DE PONTA' },
  { img: 'https://www.genspark.ai/api/files/s/SRwJpOIf?cache_control=3600', alt: 'Card 5', label: 'CARD 5: CONSULTORIA & ROI' },
  { img: 'https://www.genspark.ai/api/files/s/uAtQLHZO?cache_control=3600', alt: 'Card 6', label: 'CARD 6: SIMULADORES INTELIGENTES' },
  { img: 'https://www.genspark.ai/api/files/s/3HmEg94R?cache_control=3600', alt: 'Card 7', label: 'CARD 7: PARA QUEM?' },
  { img: 'https://www.genspark.ai/api/files/s/oZcl6LRN?cache_control=3600', alt: 'Card 8', label: 'CARD 8: POR QUE FIGA?' },
  { img: 'https://www.genspark.ai/api/files/s/ophvMKj3?cache_control=3600', alt: 'Card 9', label: 'CARD 9: COMECE AGORA (CTA)' }
]

const visualIdentity = [
  { label: 'Navy Blue:', text: ' #0A1E35 (Cor principal, fundos escuros)' },
  { label: 'Teal:', text: ' #14B8A6 (Gradientes, destaques)' },
  { label: 'Lima Neon:', text: ' #A3E635 (Cor de destaque, CTAs, ícones)' },
  { label: 'Branco:', text: ' #FFFFFF (Textos principais)' },
  { label: 'Fonte:', text: ' Sans-serif moderna, alta legibilidade' }
]

const SLIDE_DURATION = 3000

export default function VideoPromocional() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(false)

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    if (!playing) return
    const timer = setInterval(() => {
      setCurrent((c) => {
        if (c + 1 >= slides.length) {
          setPlaying(false)
          return c
        }
        return c + 1
      })
    }, SLIDE_DURATION)
    return () => clearInterval(timer)
  }, [playing])

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
              <Video size={50} color="var(--primary)" />
            </div>
            <h1>Vídeo Promocional <span>FIGA</span></h1>
            <p className={styles.subtitle}>Material completo de divulgação para redes sociais</p>
          </motion.div>
        </div>
      </section>

      {/* VÍDEO PROMOCIONAL */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.videoContainer}>
            <h2 className={styles.blockTitle}>
              <PlayCircle size={28} /> Sequência de Slides para Vídeo (16:9)
            </h2>

            {/* Player com controles */}
            <div className={styles.player}>
              <motion.div
                key={current}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className={styles.playerStage}
              >
                <img src={slides[current].img} alt={slides[current].alt} />
                <div className={styles.slideInfo}>
                  <div className={styles.slideNumber}>{slides[current].number}</div>
                  <div className={styles.slideTitle}>{slides[current].title}</div>
                </div>
              </motion.div>

              <div className={styles.controls}>
                <button onClick={prev} aria-label="Slide anterior" className={styles.controlBtn}>
                  <SkipBack size={20} />
                </button>
                <button
                  onClick={() => setPlaying((p) => !p)}
                  aria-label={playing ? 'Pausar' : 'Reproduzir'}
                  className={`${styles.controlBtn} ${styles.controlBtnMain}`}
                >
                  {playing ? <Pause size={22} /> : <Play size={22} />}
                </button>
                <button onClick={next} aria-label="Próximo slide" className={styles.controlBtn}>
                  <SkipForward size={20} />
                </button>
              </div>

              <div className={styles.dots}>
                {slides.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`Ir para slide ${i + 1}`}
                    className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
                  />
                ))}
              </div>
            </div>

            {/* Grade de todos os slides */}
            <div className={styles.videoSlides}>
              {slides.map((slide, i) => (
                <motion.div
                  key={i}
                  className={styles.slide}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setCurrent(i)}
                >
                  <img src={slide.img} alt={slide.alt} />
                  <div className={styles.slideInfo}>
                    <div className={styles.slideNumber}>{slide.number}</div>
                    <div className={styles.slideTitle}>{slide.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className={styles.specs}>
              <h3><Info size={20} /> Especificações do Vídeo</h3>
              <ul>
                {videoSpecs.map((spec, i) => (
                  <li key={i}><strong>{spec.label}</strong>{spec.text}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CARROSSEL INSTAGRAM */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.carouselSection}>
            <h2 className={styles.blockTitle}>
              <Instagram size={28} /> Carrossel para Instagram (9 Cards)
            </h2>
            <p className={styles.blockSubtitle}>
              Formato: 1080x1080px (1:1) | Para Instagram, Facebook, LinkedIn
            </p>

            <div className={styles.carouselGrid}>
              {carouselCards.map((card, i) => (
                <motion.div key={i} className={styles.carouselCard} whileHover={{ y: -5 }}>
                  <img src={card.img} alt={card.alt} />
                  <div className={styles.cardLabel}>{card.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO DE DOWNLOAD */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.downloadSection}>
            <h2><Download size={26} /> Download das Artes</h2>
            <p className={styles.downloadIntro}>
              Clique nos links abaixo para baixar as imagens em alta resolução (sem marca d&apos;água)
            </p>

            <div className={styles.downloadLinks}>
              <a
                href="https://www.genspark.ai/api/files/s/kYQhp3RJ?cache_control=3600"
                className={styles.downloadBtn}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <ImageIcon size={18} /> Carrossel Completo
              </a>
              <a
                href="https://www.genspark.ai/api/files/s/ONRgGFaO?cache_control=3600"
                className={styles.downloadBtn}
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                <Video size={18} /> Slides do Vídeo
              </a>
            </div>

            <div className={styles.specs}>
              <h3><Palette size={20} /> Identidade Visual</h3>
              <ul>
                {visualIdentity.map((item, i) => (
                  <li key={i}><strong>{item.label}</strong>{item.text}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* INSTRUÇÕES DE USO */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.downloadSection}>
            <h2><Lightbulb size={26} /> Como Usar Este Material</h2>

            <div className={styles.instructions}>
              <h3 className={styles.instructionTitle}><Instagram size={20} /> Instagram:</h3>
              <ul className={styles.checkList}>
                <li>✓ Poste o carrossel de 9 cards na ordem apresentada</li>
                <li>✓ Legenda sugerida: &quot;🎵 Conheça a FIGA: Proteção Inteligente de Direitos Musicais! 💡 Sistemas avançados, tecnologias de ponta e consultoria focada em ROI. 📊 Acesse nossos simuladores e descubra quanto você pode receber! 👉 figa.app.br #DireitosAutorais #MusicaBrasileira #Royalties #Figa&quot;</li>
                <li>✓ Use hashtags: #DireitosAutorais #MusicaBrasileira #Royalties #Streaming #Compositores</li>
              </ul>

              <h3 className={styles.instructionTitle}><Youtube size={20} /> YouTube / LinkedIn:</h3>
              <ul className={styles.checkList}>
                <li>✓ Use os 5 slides para criar um vídeo de 15 segundos</li>
                <li>✓ Adicione música de fundo instrumental (corporativo/tech)</li>
                <li>✓ Transições suaves entre slides (fade ou slide)</li>
                <li>✓ Título: &quot;FIGA - Proteção Inteligente de Direitos Musicais&quot;</li>
              </ul>

              <h3 className={styles.instructionTitle}><Globe size={20} /> Site / WhatsApp:</h3>
              <ul className={styles.checkList}>
                <li>✓ Use os cards individuais em posts de blog</li>
                <li>✓ Compartilhe o vídeo no WhatsApp Status</li>
                <li>✓ Adicione os cards na seção &quot;Sobre&quot; do site</li>
              </ul>
            </div>
          </div>

          {/* FOOTER INTERNO */}
          <div className={styles.pageFooter}>
            <p>Material de divulgação criado para o Portal Figa</p>
            <div className={styles.pageFooterLinks}>
              <a href="https://figa.app.br" target="_blank" rel="noopener noreferrer">
                <Globe size={16} /> figa.app.br
              </a>
              <a href="https://wa.me/5521991966325" target="_blank" rel="noopener noreferrer">
                <MessageCircle size={16} /> (21) 99196-6325
              </a>
              <a href="https://instagram.com/figa.app.br" target="_blank" rel="noopener noreferrer">
                <Instagram size={16} /> @figa.app.br
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
