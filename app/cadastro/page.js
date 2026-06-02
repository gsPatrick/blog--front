'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Navbar from '@/components/Navbar/Navbar'
import Footer from '@/components/Footer/Footer'
import styles from './page.module.css'
import {
  UserPlus, User, Briefcase, Music, Target,
  Send, Loader2, CheckCircle, Shield
} from 'lucide-react'

export default function Cadastro() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    documento: '',
    perfil: '',
    experiencia: '',
    nomeArtistico: '',
    qtdObras: '',
    distribuiDigital: '',
    associacao: '',
    interesse: '',
    mensagem: '',
    termos: false
  })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)

    // Submissão mockada (sem backend)
    setTimeout(() => {
      setSubmitting(false)
      setSuccess(true)
    }, 1500)
  }

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.container}>
        {/* Hero */}
        <motion.section
          className={styles.heroSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1><UserPlus size={36} /> Cadastre-se na Figa</h1>
          <p className={styles.subtitle}>Comece a gerenciar seus direitos autorais com inteligência</p>
          <p>Preencha o formulário abaixo e nossa equipe entrará em contato em até 24 horas para agendar uma apresentação personalizada.</p>
        </motion.section>

        {/* Form */}
        {!success && (
          <motion.div
            className={styles.formCard}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <form id="cadastroForm" onSubmit={handleSubmit}>
              {/* Dados Pessoais */}
              <div className={styles.formSection}>
                <h2><User size={26} />Dados Pessoais</h2>
                <p>Informações básicas para identificação</p>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="nome">Nome Completo <span className={styles.required}>*</span></label>
                    <input id="nome" type="text" name="nome" value={formData.nome} onChange={handleChange} required />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">E-mail <span className={styles.required}>*</span></label>
                    <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="telefone">Telefone/WhatsApp <span className={styles.required}>*</span></label>
                    <input id="telefone" type="tel" name="telefone" placeholder="(00) 00000-0000" value={formData.telefone} onChange={handleChange} required />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="documento">CPF/CNPJ</label>
                    <input id="documento" type="text" name="documento" placeholder="000.000.000-00" value={formData.documento} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* Perfil Profissional */}
              <div className={styles.formSection}>
                <h2><Briefcase size={26} />Perfil Profissional</h2>
                <p>Como você atua no mercado musical?</p>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="perfil">Perfil Principal <span className={styles.required}>*</span></label>
                    <select id="perfil" name="perfil" value={formData.perfil} onChange={handleChange} required>
                      <option value="">Selecione...</option>
                      <option value="artista">Artista/Intérprete</option>
                      <option value="compositor">Compositor/Letrista</option>
                      <option value="produtor">Produtor Musical</option>
                      <option value="editora">Editora Musical</option>
                      <option value="gestor">Gestor de Catálogo</option>
                      <option value="associacao">Associação/Entidade</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="experiencia">Tempo de Atuação</label>
                    <select id="experiencia" name="experiencia" value={formData.experiencia} onChange={handleChange}>
                      <option value="">Selecione...</option>
                      <option value="menos-1">Menos de 1 ano</option>
                      <option value="1-3">1 a 3 anos</option>
                      <option value="3-5">3 a 5 anos</option>
                      <option value="5-10">5 a 10 anos</option>
                      <option value="mais-10">Mais de 10 anos</option>
                    </select>
                  </div>

                  <div className={`${styles.formGroup} ${styles.full}`}>
                    <label htmlFor="nomeArtistico">Nome Artístico / Empresa</label>
                    <input id="nomeArtistico" type="text" name="nomeArtistico" placeholder="Se aplicável" value={formData.nomeArtistico} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* Catálogo Musical */}
              <div className={styles.formSection}>
                <h2><Music size={26} />Sobre Seu Catálogo</h2>
                <p>Informações sobre suas obras musicais</p>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label htmlFor="qtdObras">Quantidade de Obras</label>
                    <select id="qtdObras" name="qtdObras" value={formData.qtdObras} onChange={handleChange}>
                      <option value="">Selecione...</option>
                      <option value="1-10">1 a 10 obras</option>
                      <option value="11-50">11 a 50 obras</option>
                      <option value="51-100">51 a 100 obras</option>
                      <option value="101-500">101 a 500 obras</option>
                      <option value="mais-500">Mais de 500 obras</option>
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="distribuiDigital">Já Distribui Digitalmente?</label>
                    <select id="distribuiDigital" name="distribuiDigital" value={formData.distribuiDigital} onChange={handleChange}>
                      <option value="">Selecione...</option>
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                      <option value="parcial">Parcialmente</option>
                    </select>
                  </div>

                  <div className={`${styles.formGroup} ${styles.full}`}>
                    <label htmlFor="associacao">Filiado a Alguma Associação?</label>
                    <input id="associacao" type="text" name="associacao" placeholder="Ex: SBACEM, UBC, ABRAMUS..." value={formData.associacao} onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* Interesse */}
              <div className={styles.formSection}>
                <h2><Target size={26} />Interesse na Figa</h2>
                <p>O que você busca em nossa solução?</p>

                <div className={styles.formGrid}>
                  <div className={`${styles.formGroup} ${styles.full}`}>
                    <label htmlFor="interesse">Principais Necessidades <span className={styles.required}>*</span></label>
                    <select id="interesse" name="interesse" value={formData.interesse} onChange={handleChange} required>
                      <option value="">Selecione...</option>
                      <option value="sistemas">Sistemas de gestão de catálogo</option>
                      <option value="dados">Análise e cruzamento de dados</option>
                      <option value="consultoria">Consultoria em direitos autorais</option>
                      <option value="distribuicao">Distribuição digital</option>
                      <option value="completo">Solução completa</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  <div className={`${styles.formGroup} ${styles.full}`}>
                    <label htmlFor="mensagem">Conte-nos mais sobre suas necessidades</label>
                    <textarea id="mensagem" name="mensagem" placeholder="Descreva seus principais desafios e o que espera da Figa..." value={formData.mensagem} onChange={handleChange}></textarea>
                  </div>
                </div>
              </div>

              {/* Termos */}
              <div className={styles.checkboxGroup}>
                <input id="termos" type="checkbox" name="termos" checked={formData.termos} onChange={handleChange} required />
                <label htmlFor="termos">
                  Li e concordo com a <a href="#" target="_blank">Política de Privacidade</a> e autorizo o uso dos meus dados para contato. <span className={styles.required}>*</span>
                </label>
              </div>

              <button type="submit" className={styles.submitButton} disabled={submitting}>
                {submitting ? (
                  <><Loader2 size={20} className={styles.spinner} />Enviando...</>
                ) : (
                  <><Send size={20} />Enviar Cadastro</>
                )}
              </button>
            </form>
          </motion.div>
        )}

        {/* Success Message */}
        {success && (
          <motion.div
            className={`${styles.successMessage} ${styles.active}`}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <CheckCircle size={64} />
            <h3>Cadastro Enviado com Sucesso!</h3>
            <p>Recebemos suas informações e nossa equipe entrará em contato em até 24 horas. Confira seu e-mail e WhatsApp.</p>
            <p style={{ marginTop: '1.5rem' }}>
              Enquanto isso, explore nosso <Link href="/blog" className={styles.successLink}>blog</Link> ou use o <Link href="/simulador" className={styles.successLink}>simulador de royalties</Link>.
            </p>
          </motion.div>
        )}

        {/* Info Box */}
        <div className={styles.infoBox}>
          <h4><Shield size={20} />Seus Dados Estão Seguros</h4>
          <p>A Figa respeita sua privacidade e protege seus dados pessoais. Utilizamos criptografia de ponta e seguimos as diretrizes da LGPD (Lei Geral de Proteção de Dados). Suas informações serão usadas exclusivamente para contato comercial e nunca serão compartilhadas com terceiros.</p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
