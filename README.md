# Projelia

企業向けのシンプルで強力なタスク・プロジェクト管理 Web アプリケーション

## 特徴

- プロジェクト管理 - 複数プロジェクトを一元管理
- タスク管理 - ステータス追跡と優先度管理
- ユーザー認証 - Supabase Auth による安全な認証
- チームコラボレーション - コメント機能でチーム全体で情報共有
- 担当者割り当て - タスクを具体的にチームメンバーへ割り当て
- 将来対応可能 - ファイル添付・カレンダー対応の設計

## 技術スタック

- **フロントエンド**: Next.js 15 + TypeScript + Tailwind CSS
- **バックエンド**: Next.js API Routes
- **データベース**: Supabase (PostgreSQL)
- **認証**: Supabase Auth
- **状態管理**: React Hooks

## ロゴの配置

ロゴ画像は `public/brand/projelia-logo.jpeg` に置いてください。アプリ側はこの固定パスを参照します。

## セットアップ

### 前提条件

- Node.js 18 以上
- Supabase アカウント

### インストール手順

1. **リポジトリをクローン**
```bash
git clone <repository-url>
cd Projelia2026
```

2. **依存関係をインストール**
```bash
npm install
```

3. **環境変数を設定**
`.env.local` ファイルを作成し、Supabase の認証情報を設定します。
```bash
cp .env.example .env.local
```

4. **Supabase を初期化（ローカル開発）**
```bash
npx supabase start
```

5. **マイグレーションを実行**
```bash
npx supabase migration up
```

6. **開発サーバーを起動**
```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開き、アプリケーションにアクセスします。

## プロジェクト構造

```
Projelia2026/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── auth/         # 認証ページ
│   │   ├── dashboard/    # ダッシュボード
│   │   └── api/          # API Routes
│   ├── components/       # React コンポーネント
│   ├── lib/              # ユーティリティ・Supabase 設定
│   └── types/            # TypeScript 型定義
├── supabase/
│   ├── config.toml       # Supabase CLI 設定
│   └── migrations/       # DB マイグレーション
└── public/               # 静的ファイル
```

## 開発ガイド

### API エンドポイント

#### 認証
- `POST /api/auth/signup` - ユーザーサインアップ
- `POST /api/auth/login` - ユーザーログイン
- `POST /api/auth/logout` - ユーザーログアウト

#### プロジェクト
- `GET /api/projects` - プロジェクト一覧
- `POST /api/projects` - プロジェクト作成
- `GET /api/projects/[id]` - プロジェクト詳細
- `PUT /api/projects/[id]` - プロジェクト更新
- `DELETE /api/projects/[id]` - プロジェクト削除

#### タスク
- `GET /api/tasks?project_id=xxx` - タスク一覧
- `POST /api/tasks` - タスク作成
- `GET /api/tasks/[id]` - タスク詳細
- `PUT /api/tasks/[id]` - タスク更新
- `DELETE /api/tasks/[id]` - タスク削除

### 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# 本番ビルド
npm run build

# 本番サーバー起動
npm start

# 新しいマイグレーション作成
npm run supabase:migration <migration_name>

# ローカル Supabase 起動
npm run supabase:start

# ローカル Supabase 停止
npm run supabase:stop
```

## データベーススキーマ

### テーブル一覧

- profiles - ユーザー情報
- projects - プロジェクト
- project_members - プロジェクトメンバー
- tasks - タスク
- task_assignees - タスク担当者
- comments - コメント

詳細は [マイグレーションファイル](supabase/migrations/) を参照してください。

## ロードマップ

- ファイル添付機能
- カレンダービュー
- ガントチャート
- 通知機能
- ダークモード
- モバイルアプリ

## ライセンス

MIT License

## サポート

質問や問題がある場合は、Issues で報告してください。
