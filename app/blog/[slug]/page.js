'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import { api } from '@/lib/api'
import { useAuth } from '@/context/AuthContext'
import styles from './page.module.css'
import {
  Calendar, User, Bot, Eye, Heart, MessageCircle, Info,
  ArrowLeft, Send, Loader2, Tag, AlertCircle
} from 'lucide-react'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=480&fit=crop'

function formatDate(value) {
  if (!value) return ''
  try {
    return new Date(value).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })
  } catch (_e) {
    return ''
  }
}

function avatarFor(name) {
  const safe = encodeURIComponent(name || 'Usuário')
  return `https://ui-avatars.com/api/?name=${safe}&background=14B8A6&color=0A1E35&size=80&bold=true`
}

function CommentItem({ comment }) {
  const author = comment.author || {}
  const name = author.name || 'Anônimo'
  const replies = Array.isArray(comment.replies) ? comment.replies : []
  return (
    <div className={styles.comment}>
      <img
        src={author.avatarUrl || avatarFor(name)}
        alt={name}
        className={styles.commentAvatar}
      />
      <div className={styles.commentBody}>
        <div className={styles.commentHead}>
          <strong>{name}</strong>
          {comment.createdAt && (
            <span className={styles.commentDate}>{formatDate(comment.createdAt)}</span>
          )}
        </div>
        <p className={styles.commentText}>{comment.content}</p>
        {replies.length > 0 && (
          <div className={styles.replies}>
            {replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function BlogPost() {
  const params = useParams()
  const slug = params?.slug
  const { isAuthenticated, user } = useAuth()

  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  // Likes
  const [likesCount, setLikesCount] = useState(0)
  const [liked, setLiked] = useState(false)
  const [likeBusy, setLikeBusy] = useState(false)

  // Comentários
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [commentBusy, setCommentBusy] = useState(false)
  const [commentError, setCommentError] = useState(null)

  // Carrega o post.
  useEffect(() => {
    if (!slug) return
    let active = true
    setLoading(true)
    setNotFound(false)
    api.posts
      .get(slug)
      .then((data) => {
        if (!active) return
        setPost(data)
        setLikesCount(typeof data.likesCount === 'number' ? data.likesCount : 0)
        if (Array.isArray(data.comments)) setComments(data.comments)
      })
      .catch((err) => {
        if (!active) return
        if (err && err.status === 404) setNotFound(true)
        else setNotFound(true)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [slug])

  // Status de like (likesCount é público; liked exige login).
  useEffect(() => {
    if (!post?.id) return
    let active = true
    api.likes
      .status(post.id)
      .then((data) => {
        if (!active) return
        if (typeof data.likesCount === 'number') setLikesCount(data.likesCount)
        if (isAuthenticated) setLiked(Boolean(data.liked))
      })
      .catch(() => {
        /* silencioso: usuário deslogado ou erro de status */
      })
    return () => {
      active = false
    }
  }, [post?.id, isAuthenticated])

  const loadComments = useCallback(async (postId) => {
    try {
      const { data } = await api.comments.listForPost(postId, { page: 1, limit: 50 })
      setComments(Array.isArray(data) ? data : [])
    } catch (_e) {
      /* mantém comentários atuais */
    }
  }, [])

  // Busca comentários da API se não vierem embutidos no post.
  useEffect(() => {
    if (post?.id && !Array.isArray(post.comments)) {
      loadComments(post.id)
    }
  }, [post?.id, post?.comments, loadComments])

  const toggleLike = async () => {
    if (!isAuthenticated || !post?.id || likeBusy) return
    setLikeBusy(true)
    try {
      const res = liked
        ? await api.likes.unlike(post.id)
        : await api.likes.like(post.id)
      setLiked(Boolean(res.liked))
      if (typeof res.likesCount === 'number') setLikesCount(res.likesCount)
    } catch (_e) {
      /* ignora falha de toggle */
    } finally {
      setLikeBusy(false)
    }
  }

  const submitComment = async (e) => {
    e.preventDefault()
    if (!post?.id || commentBusy) return
    const content = commentText.trim()
    if (!content) return
    setCommentBusy(true)
    setCommentError(null)
    try {
      await api.comments.create(post.id, { content })
      setCommentText('')
      await loadComments(post.id)
    } catch (_e) {
      setCommentError('Não foi possível enviar seu comentário. Tente novamente.')
    } finally {
      setCommentBusy(false)
    }
  }

  if (loading) {
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.stateBox}>
            <Loader2 className={styles.spinner} size={36} />
            <p>Carregando artigo...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (notFound || !post) {
    return (
      <main className={styles.main}>
        <Navbar />
        <div className={styles.container}>
          <div className={styles.stateBox}>
            <AlertCircle size={40} />
            <h1 className={styles.notFoundTitle}>Artigo não encontrado</h1>
            <p>O artigo que você procura não existe ou foi removido.</p>
            <Link href="/blog" className={styles.backBtn}>
              <ArrowLeft size={16} /> Voltar para o Blog
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  const categoryLabel = post.category ? (post.category.label || post.category.name) : null
  const author = post.author || {}
  const authorName = author.name || 'Figa'
  const isAi = post.isAiGenerated
  const tags = Array.isArray(post.tags) ? post.tags : []

  return (
    <main className={styles.main}>
      <Navbar />

      <article className={styles.container}>
        <Link href="/blog" className={styles.backLink}>
          <ArrowLeft size={16} /> Voltar para o Blog
        </Link>

        {/* Hero */}
        <motion.header
          className={styles.hero}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className={styles.heroImageWrapper}>
            <img
              src={post.coverImage || FALLBACK_IMAGE}
              alt={post.title || 'Artigo'}
              className={styles.heroImage}
            />
            {post.imageSource && (
              <span className={styles.imageSource}>Imagem: {post.imageSource}</span>
            )}
          </div>

          {categoryLabel && <span className={styles.category}>{categoryLabel}</span>}
          <h1 className={styles.title}>{post.title}</h1>

          <div className={styles.meta}>
            <span>
              {author.avatarUrl ? (
                <img src={author.avatarUrl} alt={authorName} className={styles.authorAvatar} />
              ) : isAi ? <Bot size={16} /> : <User size={16} />}
              {authorName}{author.role ? ` · ${author.role}` : ''}
            </span>
            {post.publishedAt && (
              <span><Calendar size={16} /> {formatDate(post.publishedAt)}</span>
            )}
            {typeof post.views === 'number' && (
              <span><Eye size={16} /> {post.views} visualizações</span>
            )}
            {isAi && (
              <span className={styles.aiBadge}>
                <Bot size={14} /> Gerado por IA{post.aiProvider ? ` (${post.aiProvider})` : ''}
              </span>
            )}
          </div>
        </motion.header>

        {/* Conteúdo */}
        <motion.div
          className={styles.content}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            post.excerpt && <p>{post.excerpt}</p>
          )}
        </motion.div>

        {/* Fonte / disclaimer */}
        {post.source && (
          <div className={styles.source}>
            <Info size={16} /> <span><strong>Fonte:</strong> {post.source}</span>
          </div>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className={styles.tags}>
            {tags.map((tag) => (
              <span key={tag.id || tag.slug || tag.name} className={styles.tag}>
                <Tag size={12} /> {tag.label || tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Likes */}
        <div className={styles.likeBar}>
          {isAuthenticated ? (
            <button
              className={`${styles.likeBtn} ${liked ? styles.likeBtnActive : ''}`}
              onClick={toggleLike}
              disabled={likeBusy}
            >
              <Heart size={18} fill={liked ? 'currentColor' : 'none'} />
              {liked ? 'Curtido' : 'Curtir'} · {likesCount}
            </button>
          ) : (
            <div className={styles.likeBtnGuest}>
              <span className={styles.likeCountGuest}>
                <Heart size={18} /> {likesCount}
              </span>
              <Link href="/login" className={styles.inlineLink}>
                Faça login para curtir
              </Link>
            </div>
          )}
        </div>

        {/* Comentários */}
        <section className={styles.commentsSection}>
          <h2 className={styles.commentsTitle}>
            <MessageCircle size={22} /> Comentários ({comments.length})
          </h2>

          {isAuthenticated ? (
            <form className={styles.commentForm} onSubmit={submitComment}>
              <textarea
                className={styles.commentInput}
                placeholder={`Comentar como ${user?.name || 'você'}...`}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows={4}
              />
              {commentError && <p className={styles.commentFormError}>{commentError}</p>}
              <button
                type="submit"
                className={styles.commentSubmit}
                disabled={commentBusy || !commentText.trim()}
              >
                {commentBusy ? <Loader2 className={styles.spinner} size={16} /> : <Send size={16} />}
                Publicar comentário
              </button>
            </form>
          ) : (
            <div className={styles.loginPrompt}>
              <p>
                <Link href="/login" className={styles.inlineLink}>Faça login</Link> para comentar.
              </p>
            </div>
          )}

          <div className={styles.commentsList}>
            {comments.length === 0 ? (
              <p className={styles.noComments}>Seja o primeiro a comentar.</p>
            ) : (
              comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))
            )}
          </div>
        </section>
      </article>

      <Footer />
    </main>
  )
}
