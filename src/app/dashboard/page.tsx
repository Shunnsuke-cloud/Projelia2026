'use client';

import Link from 'next/link';
import { Button } from '@/components/common/Button';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">ダッシュボード</h1>
        <p className="text-gray-600 mt-2">プロジェクトとタスクを管理しましょう</p>
      </div>

      {/* クイックアクション */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* プロジェクト */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">プロジェクト</h2>
          <p className="text-gray-600 mb-6">プロジェクトを作成・管理します</p>
          <div className="flex gap-2">
            <Link href="/dashboard/projects">
              <Button variant="primary">一覧を表示</Button>
            </Link>
            <Link href="/dashboard/projects/new">
              <Button variant="secondary">新規作成</Button>
            </Link>
          </div>
        </div>

        {/* タスク */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">タスク</h2>
          <p className="text-gray-600 mb-6">タスクを作成・管理します</p>
          <div className="flex gap-2">
            <Link href="/dashboard/tasks">
              <Button variant="primary">一覧を表示</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 統計情報プレースホルダー */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4">概要</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-primary-50 rounded-lg">
            <p className="text-sm text-gray-600">プロジェクト</p>
            <p className="text-2xl font-bold text-primary-600">-</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">タスク</p>
            <p className="text-2xl font-bold text-blue-600">-</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">完了済み</p>
            <p className="text-2xl font-bold text-green-600">-</p>
          </div>
        </div>
      </div>
    </div>
  );
}
