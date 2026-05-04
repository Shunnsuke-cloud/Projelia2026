'use client';

import Link from 'next/link';
import { Button } from '@/components/common/Button';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">ダッシュボード</h1>
        <p className="text-slate-600">プロジェクトとタスクを落ち着いた画面で管理できます。</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">プロジェクト</h2>
          <p className="text-slate-600 mb-6">プロジェクトを作成・管理します。</p>
          <div className="flex gap-2">
            <Link href="/dashboard/projects">
              <Button variant="primary">一覧を表示</Button>
            </Link>
            <Link href="/dashboard/projects/new">
              <Button variant="secondary">新規作成</Button>
            </Link>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">タスク</h2>
          <p className="text-slate-600 mb-6">タスクを作成・管理します。</p>
          <div className="flex gap-2">
            <Link href="/dashboard/tasks">
              <Button variant="primary">一覧を表示</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">概要</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">プロジェクト</p>
            <p className="text-2xl font-semibold text-slate-900">-</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">タスク</p>
            <p className="text-2xl font-semibold text-slate-900">-</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">完了済み</p>
            <p className="text-2xl font-semibold text-slate-900">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}
