import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#060c1a] text-white p-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-black mb-6">Welcome, {session.user.name || 'Player'}!</h1>
        <p className="text-xl text-gray-400">Your dashboard is ready.</p>
        <p className="mt-8 text-gray-500">Favorites work. Builds coming soon.</p>
      </div>
    </div>
  );
}
