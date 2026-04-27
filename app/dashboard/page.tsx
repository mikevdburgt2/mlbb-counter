import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from './SignOutButton'
import DashboardContent from './DashboardContent'
import { prisma } from '@/lib/prisma'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const userId = (session.user as { id?: string }).id
  const [favorites, builds] = await Promise.all([
    userId
      ? prisma.favorite.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
      : Promise.resolve([]),
    userId
      ? prisma.build.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } })
      : Promise.resolve([]),
  ])

  return (
    <div className="min-h-screen bg-[#060c1a] text-gray-100" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#080e1e]/90 backdrop-blur-md border-b border-purple-900/30" style={{ boxShadow: '0 1px 0 rgba(139,92,246,0.15)' }}>
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <svg viewBox="0 0 20 20" className="w-6 h-6 fill-current flex-shrink-0" style={{ color: '#f5a623', filter: 'drop-shadow(0 0 6px rgba(245,166,35,0.7))' }}>
              <path d="M10 2L12.4 7.5H18L13.3 11l1.9 5.8L10 13.5l-5.2 3.3L6.7 11 2 7.5h5.6z"/>
            </svg>
            <span className="font-black text-xl tracking-wide" style={{ textShadow: '0 0 20px rgba(139,92,246,0.6)' }}>MLBB Counter</span>
          </Link>
          <SignOutButton />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-10">

        {/* Welcome card */}
        <div className="bg-[#0d1624] rounded-2xl border border-purple-900/40 p-6 mb-6" style={{ boxShadow: '0 0 40px rgba(139,92,246,0.08)' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl font-black" style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
              {(session.user?.name ?? session.user?.email ?? '?')[0].toUpperCase()}
            </div>
            <div>
              <div className="font-bold text-lg text-white">{session.user?.name ?? 'Player'}</div>
              <div className="text-sm text-gray-500">{session.user?.email}</div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-purple-900/30">
            <StatCard label="Saved Builds" value={String(builds.length)} color="text-purple-400" />
            <StatCard label="Favourites" value={String(favorites.length)} color="text-cyan-400" />
            <StatCard label="Counters Viewed" value="—" color="text-amber-400" />
          </div>
        </div>

        {/* Tabs + content */}
        <DashboardContent favorites={favorites} initialBuilds={builds} />

      </main>
    </div>
  )
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-purple-950/25 rounded-xl p-3 border border-purple-900/20 text-center">
      <div className={`text-xl font-black ${color}`}>{value}</div>
      <div className="text-[11px] text-gray-500 mt-0.5">{label}</div>
    </div>
  )
}
