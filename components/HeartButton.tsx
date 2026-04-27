'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'

interface Props {
  heroId: number
  heroName: string
  heroHead: string
  initialFavorited?: boolean
  onToggle?: (heroId: number, favorited: boolean) => void
  size?: 'sm' | 'md'
}

export default function HeartButton({
  heroId,
  heroName,
  heroHead,
  initialFavorited = false,
  onToggle,
  size = 'md',
}: Props) {
  const { data: session } = useSession()
  const [favorited, setFavorited] = useState(initialFavorited)
  const [loading, setLoading] = useState(false)

  if (!session) return null

  const toggle = async (e: React.MouseEvent) => {
    e.stopPropagation()
    if (loading) return
    setLoading(true)
    const prev = favorited
    setFavorited(!prev)
    onToggle?.(heroId, !prev)

    try {
      if (prev) {
        const res = await fetch(`/api/favorites/${heroId}`, { method: 'DELETE' })
        if (!res.ok) throw new Error()
      } else {
        const res = await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ heroId, heroName, heroHead }),
        })
        if (!res.ok) throw new Error()
      }
    } catch {
      setFavorited(prev)
      onToggle?.(heroId, prev)
    } finally {
      setLoading(false)
    }
  }

  const dim = size === 'sm' ? 16 : 20

  return (
    <button
      onClick={toggle}
      disabled={loading}
      aria-label={favorited ? 'Remove from favourites' : 'Add to favourites'}
      className={`flex items-center justify-center rounded-xl transition-all disabled:opacity-60 ${
        size === 'sm' ? 'w-7 h-7' : 'w-9 h-9'
      } ${
        favorited
          ? 'bg-rose-500/20 border border-rose-500/40 hover:bg-rose-500/30'
          : 'bg-white/5 border border-white/10 hover:bg-rose-500/10 hover:border-rose-500/30'
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        width={dim}
        height={dim}
        className={`transition-transform ${loading ? 'scale-90' : 'scale-100'}`}
      >
        {favorited ? (
          <path
            fill="#f43f5e"
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        ) : (
          <path
            fill="none"
            stroke="#f43f5e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          />
        )}
      </svg>
    </button>
  )
}
