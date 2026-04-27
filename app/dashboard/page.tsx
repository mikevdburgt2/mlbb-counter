import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-[#060c1a] text-white flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-5xl font-black mb-4">Welcome back!</h1>
        <p className="text-xl text-gray-400 mb-8">{session.user.name || session.user.email}</p>
        <p className="text-gray-500">Favorites and My Builds are working locally.</p>
        <p className="text-sm text-purple-400 mt-8">Site is now live on Vercel</p>
      </div>
    </div>
  );
}
