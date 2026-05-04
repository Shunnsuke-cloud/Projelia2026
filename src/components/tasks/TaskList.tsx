'use client';

import { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase/client';
import { Button } from '@/components/common/Button';
import { Loading } from '@/components/common/Loading';
import { TASK_STATUS, TASK_PRIORITY_COLORS, TASK_STATUS_LABELS } from '@/lib/constants';
import { formatDate } from '@/lib/utils/helpers';
import type { Task } from '@/types/database';

interface TaskListProps {
  projectId: string;
}

export function TaskList({ projectId }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | 'todo' | 'in_progress' | 'done'>('all');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data: sessionData } = await supabaseClient.auth.getSession();
        if (!sessionData?.session?.access_token) {
          throw new Error('認証が必要です');
        }

        const response = await fetch(`/api/tasks?project_id=${projectId}`, {
          headers: {
            Authorization: `Bearer ${sessionData.session.access_token}`,
          },
        });

        if (!response.ok) throw new Error('タスク取得に失敗しました');

        const data = await response.json();
        setTasks(data.tasks || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [projectId]);

  const filteredTasks = tasks.filter(task => 
    filter === 'all' ? true : task.status === filter
  );

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      {/* フィルター */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'todo', 'in_progress', 'done'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === status
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status === 'all' ? 'すべて' : TASK_STATUS_LABELS[status]}
          </button>
        ))}
      </div>

      {/* エラーメッセージ */}
      {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}

      {/* タスク一覧 */}
      {filteredTasks.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
          タスクがありません
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900">{task.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium text-white`}
                      style={{ backgroundColor: TASK_PRIORITY_COLORS[task.priority] }}
                    >
                      {task.priority === 'low' ? '低' : task.priority === 'high' ? '高' : task.priority === 'urgent' ? '緊急' : '中'}
                    </span>
                  </div>

                  {task.description && (
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{task.description}</p>
                  )}

                  <div className="flex gap-4 text-xs text-gray-500">
                    <span>ステータス: {TASK_STATUS_LABELS[task.status]}</span>
                    {task.due_date && <span>期限: {formatDate(task.due_date)}</span>}
                  </div>
                </div>

                <div className="text-right">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    task.status === TASK_STATUS.TODO ? 'bg-gray-100 text-gray-800' :
                    task.status === TASK_STATUS.IN_PROGRESS ? 'bg-blue-100 text-blue-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {TASK_STATUS_LABELS[task.status]}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
