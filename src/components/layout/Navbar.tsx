'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/lib/supabase/client';
import { BrandLogo } from '@/components/common/BrandLogo';

interface NavbarProps {
  user?: { email?: string; user_metadata?: { full_name?: string } };
}

export function Navbar({ user }: NavbarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    router.push('/auth/login');
  };

  return (
    <nav className="border-b border-slate-200/80 bg-white/85 shadow-sm backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <BrandLogo size="sm" />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors">
              ダッシュボード
            </Link>
            <Link href="/dashboard/projects" className="text-slate-600 hover:text-slate-900 transition-colors">
              プロジェクト
            </Link>
            <Link href="/dashboard/tasks" className="text-slate-600 hover:text-slate-900 transition-colors">
              タスク
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-slate-600">{user.user_metadata?.full_name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-full"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-full"
                >
                  ログイン
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm font-medium bg-slate-900 text-white rounded-full hover:bg-slate-800"
                >
                  サインアップ
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
