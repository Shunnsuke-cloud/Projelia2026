'use client';

import Link from 'next/link';
import { Button } from '@/components/common/Button';

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">タスク</h1>
          <p className="text-gray-600 mt-1">すべてのタスクを表示します</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-8 text-center">
        <p className="text-gray-600 mb-4">
          プロジェクト内のタスクを表示します。プロジェクトを選択してください。
        </p>
        <Link href="/dashboard/projects">
          <Button variant="primary">プロジェクトを表示</Button>
        </Link>
      </div>
    </div>
  );
}
