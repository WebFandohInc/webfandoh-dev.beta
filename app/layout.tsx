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
        <meta name="generator" content="WebFandoh"></meta>   
        <link rel="icon" href="/app/favicon.ico" type="image/x-icon" sizes="56x56" />
        <meta property="og:type" content="website"></meta>
        <meta name="google-adsense-account" content="ca-pub-3554757782177589" />
        <meta property="og:site_name" content="WebFandoh"></meta>
        <meta property="og:locale" content="pt-br"></meta>
        <link rel="icon" href="/favicon.ico" sizes="any"></link>
        <link rel="icon" href="/app/favicon.ico" />
        <meta property="og:image" content="/public/logo.ico"></meta>
        <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon.png"></link>

        <link rel="icon" href="https://webfandoh.com/favicon.ico" />
        <meta name="keywords" content="conteúdo interativo, criação de conteúdo, plataforma de compartilhamento, WebFandoh, comunidade online, conteúdo personalizado, experiências online, interação na internet, descobrir conteúdo, compartilhar conteúdo, explorar conteúdo, mídia interativa, entretenimento online, comunidade de criadores, diversão online, conteúdo da internet, participação online, criação de mídia, redes sociais, interatividade online, conteúdo criativo, WebFandoh comunidade, descoberta de conteúdo, plataforma de entretenimento, mídia online, compartilhamento criativo, diversidade de conteúdo, experiências digitais"></meta>
        <meta property="og:title" content="WebFandoh | Sua fonte de conteúdos divertidos!"></meta>
        <meta property="og:url" content="https://webfandoh.com/"></meta>
        <meta property="og:site_name" content="WebFandoh"></meta>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3554757782177589" crossOrigin="anonymous"></script>

        {/* Script do Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EK39T2EK57"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EK39T2EK57');
          `,
        }} />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
