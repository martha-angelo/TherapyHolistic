// Layout raiz do segmento /admin
// NÃO faz verificação de sessão aqui — isso fica em (protected)/layout.tsx
// Assim /admin/login escapa do auth check e não entra em loop de redirect
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
