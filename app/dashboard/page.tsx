import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import DashboardContent from './DashboardContent'
import SignOutButton from './SignOutButton'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <main className="min-h-screen bg-[#060c1a] text-white">
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1
              className="text-2xl font-black"
              style={{
                background: 'linear-gradient(90deg, #a78bfa, #22d3ee)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Dashboard
            </h1>
            {session.user?.name && (
              <p className="text-xs text-gray-500 mt-0.5">{session.user.name}</p>
            )}
          </div>
          <SignOutButton />
        </div>
        <DashboardContent />
      </div>
    </main>
  )
}
