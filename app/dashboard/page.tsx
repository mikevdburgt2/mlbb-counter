import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#060c1a] p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Welcome back, {session.user.name || 'Player'}!</h1>
      <p className="text-gray-400">My Builds & Favorites coming soon...</p>
    </div>
  );
}
