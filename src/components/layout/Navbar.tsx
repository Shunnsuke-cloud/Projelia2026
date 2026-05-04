'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { supabaseClient } from '@/lib/supabase/client';

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
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary-600">Projelia</span>
          </Link>

          {/* ナビゲーション */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-gray-700 hover:text-primary-600">
              ダッシュボード
            </Link>
            <Link href="/dashboard/projects" className="text-gray-700 hover:text-primary-600">
              プロジェクト
            </Link>
            <Link href="/dashboard/tasks" className="text-gray-700 hover:text-primary-600">
              タスク
            </Link>
          </div>

          {/* ユーザーメニュー */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-700">{user.user_metadata?.full_name || user.email}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  ログイン
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-4 py-2 text-sm font-medium bg-primary-600 text-white rounded-lg hover:bg-primary-700"
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
