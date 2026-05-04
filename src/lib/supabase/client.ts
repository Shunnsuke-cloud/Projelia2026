import { createClient } from '@supabase/supabase-js';

// クライアント用の Supabase インスタンス
// ブラウザ側で使用する設定
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// エクスポート用
export default supabaseClient;
