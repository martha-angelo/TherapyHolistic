// Layout exclusivo para a página de login — NÃO usa o AdminLayout
// Isso evita que o check de sessão do AdminLayout se aplique ao login
export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
