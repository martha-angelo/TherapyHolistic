import type { Metadata } from 'next'
import './globals.css'
import SiteShell from '@/components/SiteShell'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: {
    default: 'Martha Angelo — Terapia Integrativa',
    template: '%s | Martha Angelo',
  },
  description:
    'Terapeuta integrativa especializada em ansiedade e padrões repetitivos. Ajudo mulheres a desbloquear emoções e viver com leveza. Sessões online.',
  keywords: ['terapia integrativa', 'ansiedade', 'autoconhecimento', 'recomeço', 'Martha Angelo', 'terapeuta holística'],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: process.env.NEXT_PUBLIC_BASE_URL,
    siteName: 'Martha Angelo',
    title: 'Martha Angelo — Terapia Integrativa',
    description: 'Ajudo mulheres a desbloquear emoções e viver com leveza.',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <SiteShell>{children}</SiteShell>
        <Analytics />
      </body>
    </html>
  )
}
