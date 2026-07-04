'use client'

import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export default function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleSignOut}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-cream-200/50 hover:text-cream-100 hover:bg-sage-600/50 transition-all text-sm"
    >
      <LogOut size={16} />
      Sair
    </button>
  )
}
