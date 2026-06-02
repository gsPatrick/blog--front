import './globals.css'
import { Inter, Space_Grotesk } from 'next/font/google'
import Providers from './providers'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
})

export const metadata = {
  title: 'Figa - Proteção Inteligente de Direitos Musicais',
  description: 'Sistemas, Tecnologias e Consultoria com Precisão de Dados para o Mercado Musical.',
  keywords: 'direitos autorais, royalties musicais, gestão musical, metadata, distribuição digital',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
