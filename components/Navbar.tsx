'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Leaf } from 'lucide-react'

const links = [
  { href: '/', label: 'Início' },
  { href: '/sobre', label: 'Sobre mim' },
  { href: '/sessoes', label: 'Sessões' },
  { href: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-cream-100/95 backdrop-blur-md shadow-sm shadow-sage-500/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <Leaf
            className="text-sage-500 group-hover:text-sage-600 transition-colors"
            size={20}
            strokeWidth={1.5}
          />
          <span className="font-serif text-xl text-sage-700 font-medium tracking-wide">
            Martha Angelo
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              {l.label}
            </Link>
          ))}
          <Link href="/agendar" className="btn-primary !py-2.5 !px-5 text-sm">
            Agendar sessão
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-sage-700 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-cream-100/98 backdrop-blur-md border-t border-sage-100 px-5 py-6 flex flex-col gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-medium text-stone-700 hover:text-sage-600 transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/agendar"
            className="btn-primary justify-center"
            onClick={() => setOpen(false)}
          >
            Agendar sessão
          </Link>
        </div>
      )}
    </header>
  )
}
