import Link from 'next/link'
import { Instagram, Heart, Leaf } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-sage-700 text-cream-100">
      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="text-sage-300" size={18} strokeWidth={1.5} />
              <span className="font-serif text-xl font-medium">Martha Angelo</span>
            </div>
            <p className="text-cream-200/70 text-sm leading-relaxed mb-6">
              Terapia integrativa para mulheres que querem sair dos padrões que limitam e viver com mais leveza e propósito.
            </p>
            <a
              href="https://www.instagram.com/marthaangeloo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sage-300 hover:text-cream-100 transition-colors text-sm"
            >
              <Instagram size={16} />
              @marthaangeloo
            </a>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans font-medium text-sm tracking-widest uppercase text-sage-300 mb-5">
              Navegação
            </h4>
            <ul className="space-y-3">
              {[
                { href: '/', label: 'Início' },
                { href: '/sobre', label: 'Sobre mim' },
                { href: '/sessoes', label: 'Sessões' },
                { href: '/blog', label: 'Blog' },
                { href: '/agendar', label: 'Agendar sessão' },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-cream-200/70 hover:text-cream-100 transition-colors text-sm"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-sans font-medium text-sm tracking-widest uppercase text-sage-300 mb-5">
              Contato
            </h4>
            <ul className="space-y-3 text-sm text-cream-200/70">
              <li>
                <a
                  href="https://www.instagram.com/marthaangeloo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream-100 transition-colors"
                >
                  Instagram: @marthaangeloo
                </a>
              </li>
              <li>
                <Link href="/agendar" className="hover:text-cream-100 transition-colors">
                  Agendar sessão online
                </Link>
              </li>
              <li>
                <a
                  href="https://hotmart.com/pt-br/marketplace/produtos/conhecendo-o-meu-eu-interior-um-guia-rapido-para-recomecar-com-forca-e-clareza/T104825108D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream-100 transition-colors"
                >
                  Ebook — Eu Interior
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage-600 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-cream-200/50">
          <p>© {new Date().getFullYear()} Martha Angelo. Todos os direitos reservados.</p>
          <p className="flex items-center gap-1">
            Feito com <Heart size={11} className="text-terra-300" /> para mulheres que querem viver com leveza
          </p>
        </div>
      </div>
    </footer>
  )
}
