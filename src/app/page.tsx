import Link from 'next/link';
import { Button } from '@/components/common/Button';
import { BrandLogo } from '@/components/common/BrandLogo';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(148,163,184,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(226,232,240,0.7),_transparent_28%)]">
      <nav className="border-b border-slate-200/80 bg-white/80 shadow-sm backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <BrandLogo size="sm" />
            </Link>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/85 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-slate-500"></span>
              企業向けタスク・プロジェクト管理
            </div>

            <div className="space-y-5">
              <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-slate-900 md:text-6xl">
                仕事の流れを、静かに整える。
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">
                Projelia は、プロジェクト、タスク、コメントを一つの場所で扱うための
                落ち着いた業務管理基盤です。情報の見通しを上げ、チームの判断を速くします。
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
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

          <div className="rounded-[2rem] border border-slate-200 bg-white/85 p-8 shadow-xl shadow-slate-200/50 backdrop-blur">
            <div className="flex items-center justify-center rounded-[1.5rem] border border-slate-200 bg-slate-50 px-6 py-8">
              <BrandLogo size="lg" showText={false} />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">プロジェクト</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">一元管理</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">タスク</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">進捗可視化</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 text-center">
                <p className="text-sm text-slate-500">コメント</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">連携強化</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
