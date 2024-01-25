import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WebFandoh',
  description: 'O WebFandoh é um lugar para explorar, criar e compartilhar com todo tipo de conteúdo com seus amigos!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
      <title>WebFandoh</title>
      <meta name="description" content="O WebFandoh é um lugar para explorar, criar e compartilhar com todo tipo de conteúdo. Uma plataforma onde você pode criar, descobrir e interagir com todos os tipos de conteúdo personalizados e interativos da internet."></meta>
      <meta name="application-name" content="WebFandoh"></meta>
      <meta name="robots" content="index, follow"></meta>
      <meta property="og:title" content="WebFandoh | Sua fonte de conteúdos divertidos!"></meta>
      <meta property="og:url" content="https://webfandoh.com/"></meta>
      <meta property="og:site_name" content="WebFandoh"></meta>

      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
