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
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Welcome, {session.user.name || 'Player'}!</h1>
        <p className="text-gray-400 text-lg">My Builds & Favorites are coming soon...</p>

        <div className="mt-12 text-center text-sm text-gray-500">
          Login werkt • Favorites werken • Builds komen later
        </div>
      </div>
    </div>
  );
}
