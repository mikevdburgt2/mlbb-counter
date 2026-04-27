'use client'

import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/' })}
      className="text-sm text-gray-500 hover:text-gray-300 transition-colors px-3 py-1.5 rounded-lg border border-transparent hover:border-purple-900/40"
    >
      Sign out
    </button>
  )
}
