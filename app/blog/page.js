'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { api } from '@/lib/api'
import styles from './page.module.css'
import {
  Newspaper, Database, LayoutGrid, Smartphone, Globe, Bot,
  Scale, BookOpen, User, Calendar, Info, ArrowRight,
  MailOpen, Send, Lock, SquarePen, Linkedin, PenLine,
  Calculator, HandCoins, FileText, Heart, MessageCircle, Loader2
} from 'lucide-react'

const VIEW_MODES = [
  { id: 'grid', icon: <LayoutGrid size={16} />, label: 'Grid' },
  { id: 'jornal', icon: <Newspaper size={16} />, label: 'Jornal' },
  { id: 'app', icon: <Smartphone size={16} />, label: 'App' }
]

// Ícone por slug de categoria (fallback genérico quando não mapeado).
const CATEGORY_ICONS = {
  noticias: <Globe size={14} />,
  'ia-direitos': <Bot size={14} />,
  juridico: <Scale size={14} />,
  legislacao: <BookOpen size={14} />,
}

const COLUNISTAS = [
  {
    avatar: 'https://ui-avatars.com/api/?name=Pedro+Figueira&background=A3E635&color=0A1E35&size=60&bold=true',
    name: 'Pedro Figueira',
    desc: <>Fundador da Figa<br />Dados e IA</>,
    social: [
      { href: 'https://linkedin.com/in/pedrofigueira', title: 'LinkedIn', icon: <Linkedin size={18} /> },
      { href: 'https://geosemfronteiras.org', title: 'Geo Sem Fronteiras', icon: <Globe size={18} /> }
    ]
  },
  {
    avatar: 'https://ui-avatars.com/api/?name=Figa+IA&background=14B8A6&color=0A1E35&size=60&bold=true',
    name: 'Figa IA',
    desc: <>Inteligência Artificial<br />Análise de dados públicos</>,
    social: [
      { href: '#', title: 'IA', icon: <Bot size={18} /> }
    ]
  }
]

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=220&fit=crop'

function formatDate(value) {
  if (!value) return ''
  try {
    return new Date(value).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  } catch (_e) {
    return ''
  }
}

export default function Blog() {
  const [view, setView] = useState('grid')
  const [filter, setFilter] = useState('todos')
  const [search, setSearch] = useState('')
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const [categories, setCategories] = useState([])
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Carrega categorias uma vez.
  useEffect(() => {
    let active = true
    api.categories
      .list()
      .then((data) => {
        if (active) setCategories(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (active) setCategories([])
      })
    return () => {
      active = false
    }
  }, [])

  // Carrega posts quando o filtro ou a busca mudam (com debounce na busca).
  const loadPosts = useCallback(async (categorySlug, searchTerm) => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await api.posts.list({
        categorySlug: categorySlug === 'todos' ? undefined : categorySlug,
        search: searchTerm || undefined,
        limit: 24,
      })
      setPosts(Array.isArray(data) ? data : [])
    } catch (_e) {
      setError('Não foi possível carregar os artigos. Tente novamente em instantes.')
      setPosts([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const handle = setTimeout(() => {
      loadPosts(filter, search)
    }, 300)
    return () => clearTimeout(handle)
  }, [filter, search, loadPosts])

  const categoryButtons = [
    { slug: 'todos', icon: <LayoutGrid size={14} />, label: 'Todos' },
    ...categories.map((cat) => ({
      slug: cat.slug,
      icon: CATEGORY_ICONS[cat.slug] || <Newspaper size={14} />,
      label: cat.label || cat.name,
    })),
  ]

  const subscribeNewsletter = () => {
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      alert('Por favor, insira um email válido.')
      return
    }
    alert(`✅ Obrigado! Você será inscrito em breve com o email: ${newsletterEmail}\n\nEm breve você receberá nossos artigos e análises sobre direitos autorais.`)
    setNewsletterEmail('')
  }

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.container}>
        {/* Hero */}
        <motion.div
          className={styles.hero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1><Newspaper size={32} /> Blog Figa</h1>
          <p>Centro de conhecimento sobre direitos autorais, IA, legislação e o futuro da música</p>
          <p className={styles.heroSub}>
            <Database size={16} /> Informações baseadas em <strong>dados oficiais públicos</strong> + análise especializada
          </p>
        </motion.div>

        {/* View Mode & Categories */}
        <div className={styles.controlsContainer}>
          <div className={styles.viewModes}>
            {VIEW_MODES.map((mode) => (
              <button
                key={mode.id}
                className={`${styles.viewBtn} ${view === mode.id ? styles.viewBtnActive : ''}`}
                onClick={() => setView(mode.id)}
              >
                {mode.icon} <span>{mode.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.categoryFilter}>
            {categoryButtons.map((cat) => (
              <button
                key={cat.slug}
                className={`${styles.categoryBtn} ${filter === cat.slug ? styles.categoryBtnActive : ''}`}
                onClick={() => setFilter(cat.slug)}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Layout */}
        <div className={styles.blogLayout}>
          {/* Posts Container */}
          <div
            className={`${styles.postsContainer} ${
              view === 'grid' ? styles.gridView : view === 'jornal' ? styles.jornalView : styles.appView
            }`}
          >
            {loading && (
              <div className={styles.stateBox}>
                <Loader2 className={styles.spinner} size={32} />
                <p>Carregando artigos...</p>
              </div>
            )}

            {!loading && error && (
              <div className={styles.stateBox}>
                <Info size={32} />
                <p>{error}</p>
              </div>
            )}

            {!loading && !error && posts.length === 0 && (
              <div className={styles.stateBox}>
                <Newspaper size={32} />
                <p>Nenhum artigo encontrado para os filtros selecionados.</p>
              </div>
            )}

            {!loading && !error && posts.map((post, i) => {
              const categoryLabel = post.category
                ? (post.category.label || post.category.name)
                : null
              const authorName = post.author ? post.author.name : 'Figa'
              const isAi = post.isAiGenerated

              return (
                <motion.article
                  key={post.id || post.slug || i}
                  className={styles.postCard}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link href={`/blog/${post.slug}`} className={styles.cardLink}>
                    <img
                      src={post.coverImage || FALLBACK_IMAGE}
                      alt={post.title || 'Artigo'}
                      className={styles.postImage}
                    />
                    <div className={styles.postContent}>
                      {categoryLabel && (
                        <span className={styles.postCategory}>{categoryLabel}</span>
                      )}
                      <h3 className={styles.postTitle}>{post.title}</h3>
                      <div className={styles.postMeta}>
                        <span>
                          {isAi ? <Bot size={14} /> : <User size={14} />} {authorName}
                        </span>
                        {post.publishedAt && (
                          <span><Calendar size={14} /> {formatDate(post.publishedAt)}</span>
                        )}
                      </div>
                      {post.source && (
                        <div className={styles.postDisclaimer}>
                          <Info size={14} /> <span><strong>Fonte:</strong> {post.source}</span>
                        </div>
                      )}
                      {post.excerpt && (
                        <p className={styles.postExcerpt}>{post.excerpt}</p>
                      )}
                      <div className={styles.postFooter}>
                        <span className={styles.postLink}>
                          Ler artigo completo <ArrowRight size={16} />
                        </span>
                        <div className={styles.postStats}>
                          {typeof post.likesCount === 'number' && (
                            <span><Heart size={14} /> {post.likesCount}</span>
                          )}
                          {typeof post.commentsCount === 'number' && (
                            <span><MessageCircle size={14} /> {post.commentsCount}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              )
            })}
          </div>

          {/* Sidebar */}
          <aside className={styles.sidebar}>
            {/* Busca */}
            <div className={styles.sidebarSection}>
              <input
                type="text"
                className={styles.searchBox}
                placeholder="Buscar artigos..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Newsletter */}
            <div className={styles.sidebarSection}>
              <div className={styles.newsletterForm}>
                <h3><MailOpen size={18} /> Newsletter Editorial</h3>
                <p>Receba artigos, análises e atualizações sobre direitos autorais.</p>
                <input
                  type="email"
                  className={styles.newsletterInput}
                  placeholder="Seu melhor email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') subscribeNewsletter() }}
                />
                <button className={styles.newsletterBtn} onClick={subscribeNewsletter}>
                  <Send size={16} /> Quero Receber
                </button>
                <p className={styles.newsletterNote}>
                  <Lock size={14} /> Seus dados estão protegidos conforme LGPD
                </p>
              </div>
            </div>

            {/* Colunistas */}
            <div className={styles.sidebarSection}>
              <h3><SquarePen size={18} /> Colunistas</h3>
              <div className={styles.colunistasGrid}>
                {COLUNISTAS.map((c, i) => (
                  <div key={i} className={styles.colunistaCard}>
                    <img src={c.avatar} alt={c.name} className={styles.colunistaAvatar} />
                    <div className={styles.colunistaInfo}>
                      <h4>{c.name}</h4>
                      <p>{c.desc}</p>
                      <div className={styles.colunistaSocial}>
                        {c.social.map((s, j) => (
                          <a key={j} href={s.href} target="_blank" rel="noreferrer" title={s.title}>
                            {s.icon}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Seja Colunista ou Convidado */}
              <div className={styles.sejaColunista}>
                <h4><PenLine size={16} /> Convidados & Colunistas</h4>
                <p>Escreva um artigo ou editorial conosco!</p>
                <Link href="/contato?assunto=colunista" className={styles.sejaColunistaBtn}>
                  <Send size={14} /> Enviar Artigo
                </Link>
                <p className={styles.sejaColunistaNote}>Compartilhe sua experiência em direitos autorais, música e tecnologia.</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Simuladores CTA (Bottom) */}
        <motion.div
          className={styles.simuladoresCta}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2><Calculator size={32} /> Nossos Simuladores</h2>
          <p>Ferramentas práticas para calcular royalties e direitos autorais</p>

          <div className={styles.simuladoresGrid}>
            <div className={styles.simCard}>
              <HandCoins className={styles.simIcon} size={48} />
              <h3>Quanto Vou Receber</h3>
              <p>Calcule seus royalties estimados de streaming, shows, rádio, TV e sincronização. Baseado em dados reais do mercado musical brasileiro.</p>
              <Link href="/simulador#receber">
                Acessar Simulador <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.simCard}>
              <FileText className={styles.simIcon} size={48} />
              <h3>Quanto Vou Pagar</h3>
              <p>Calcule quanto seu estabelecimento ou evento deve pagar em direitos autorais. Simulador por segmento com base nos regulamentos oficiais de 2026.</p>
              <Link href="/simulador#pagar">
                Acessar Simulador <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
