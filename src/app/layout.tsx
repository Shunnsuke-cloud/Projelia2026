import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Projelia - タスク・プロジェクト管理ツール',
  description: '企業向けの落ち着いたデザインのタスク・プロジェクト管理Webアプリ',
  keywords: 'プロジェクト管理, タスク管理, チームコラボレーション',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="bg-slate-50 text-slate-900">{children}</body>
    </html>
  );
}
