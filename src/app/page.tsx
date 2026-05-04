import Link from 'next/link';
import { Button } from '@/components/common/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100">
      {/* ナビゲーション */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-2xl font-bold text-primary-600">Projelia</h1>
            <div className="flex gap-4">
              <Link href="/auth/login">
                <Button variant="secondary">ログイン</Button>
              </Link>
              <Link href="/auth/signup">
                <Button variant="primary">サインアップ</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ヒーロー */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            チームを一つに
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Projelia は企業向けのシンプルで強力なタスク・プロジェクト管理ツールです。
            チーム全体の生産性を向上させましょう。
          </p>

          {/* 機能一覧 */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">📋</div>
              <h3 className="font-bold text-gray-900 mb-2">プロジェクト管理</h3>
              <p className="text-gray-600">複数プロジェクトを一元管理</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">✅</div>
              <h3 className="font-bold text-gray-900 mb-2">タスク管理</h3>
              <p className="text-gray-600">ステータス追跡と優先度管理</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="font-bold text-gray-900 mb-2">チームコラボレーション</h3>
              <p className="text-gray-600">コメント機能で円滑なコミュニケーション</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 flex gap-4 justify-center">
            <Link href="/auth/signup">
              <Button variant="primary" size="lg">
                無料で始める
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="secondary" size="lg">
                ログイン
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
