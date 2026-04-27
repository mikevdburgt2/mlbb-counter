import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import DashboardContent from './DashboardContent';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login');
  }

  // Tijdelijk hardcoded om build te laten slagen
  const favorites: any[] = [];
  const builds: any[] = [];

  return <DashboardContent favorites={favorites} initialBuilds={builds} user={session.user} />;
}
