'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else {
        // Redirection based on role
        if (user.role === 'USER') router.push('/dashboard/user');
        else if (user.role === 'ORGANIZATION') router.push('/dashboard/org');
        else if (user.role === 'ADMIN') router.push('/dashboard/admin');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-600 font-medium">Redirecting you to your dashboard...</p>
      </div>
    </div>
  );
}
