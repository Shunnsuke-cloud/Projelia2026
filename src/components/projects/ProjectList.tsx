'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabase/client';
import { Button } from '@/components/common/Button';
import { Loading } from '@/components/common/Loading';
import { formatDate } from '@/lib/utils/helpers';
import type { Project } from '@/types/database';

export function ProjectList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data: sessionData } = await supabaseClient.auth.getSession();
        if (!sessionData?.session?.access_token) {
          throw new Error('認証が必要です');
        }

        const response = await fetch('/api/projects', {
          headers: {
            Authorization: `Bearer ${sessionData.session.access_token}`,
          },
        });

        if (!response.ok) throw new Error('プロジェクト取得に失敗しました');

        const data = await response.json();
        setProjects(data.projects || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : '予期しないエラーが発生しました');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">プロジェクト</h1>
          <p className="text-gray-600 mt-1">全プロジェクトを管理</p>
        </div>
        <Link href="/dashboard/projects/new">
          <Button variant="primary">新規プロジェクト</Button>
        </Link>
      </div>

      {/* エラーメッセージ */}
      {error && <div className="p-4 bg-red-50 text-red-700 rounded-lg">{error}</div>}

      {/* プロジェクト一覧 */}
      {projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 mb-4">プロジェクトがまだ作成されていません</p>
          <Link href="/dashboard/projects/new">
            <Button variant="primary">最初のプロジェクトを作成</Button>
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
              <div className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6 cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex-1">{project.name}</h3>
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: project.color }}
                  ></div>
                </div>

                {project.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                )}

                <div className="space-y-2 text-sm text-gray-500">
                  {project.start_date && (
                    <p>開始日: {formatDate(project.start_date)}</p>
                  )}
                  {project.end_date && (
                    <p>終了日: {formatDate(project.end_date)}</p>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      project.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : project.status === 'archived'
                          ? 'bg-gray-100 text-gray-800'
                          : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {project.status === 'active'
                      ? 'アクティブ'
                      : project.status === 'archived'
                        ? 'アーカイブ'
                        : '完了'}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
