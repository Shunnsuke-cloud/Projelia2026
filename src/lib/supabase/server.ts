import { createClient } from '@supabase/supabase-js';

// サーバー用の Supabase インスタンス（サービスロールキー使用）
// サーバーコンポーネント、API ルートで使用
export const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// エクスポート用
export default supabaseServer;
