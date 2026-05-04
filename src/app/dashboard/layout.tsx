'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase/client';
import { Loading } from '@/components/common/Loading';
import { Navbar } from '@/components/layout/Navbar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // セッションをチェック
    const checkSession = async () => {
      const { data, error } = await supabaseClient.auth.getSession();

      if (error || !data.session) {
        // セッションがない場合はログインページにリダイレクト
        router.push('/auth/login');
        return;
      }

      setUser(data.session.user);
      setLoading(false);
    };

    checkSession();

    // リアルタイムで認証状態を監視
    const { data: authListener } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push('/auth/login');
      } else {
        setUser(session.user);
      }
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [router]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
