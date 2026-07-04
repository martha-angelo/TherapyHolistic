'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import FlyingButterfly from './FlyingButterfly'

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/admin')

  return (
    <>
      {!isAdmin && <Navbar />}
      <main>{children}</main>
      {!isAdmin && <Footer />}
      {!isAdmin && <WhatsAppButton />}
      {/* Borboleta que passeia pela tela em todas as páginas públicas */}
      {!isAdmin && <FlyingButterfly />}
    </>
  )
}
