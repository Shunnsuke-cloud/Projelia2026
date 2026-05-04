import { NextRequest, NextResponse } from 'next/server';
import { supabaseClient } from '@/lib/supabase/client';

/**
 * POST /api/auth/logout
 * ユーザーログアウトエンドポイント
 */
export async function POST(request: NextRequest) {
  try {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: 'ログアウト成功' }, { status: 200 });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: '予期しないエラーが発生しました' }, { status: 500 });
  }
}
