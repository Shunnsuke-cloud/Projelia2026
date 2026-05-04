import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

/**
 * POST /api/auth/signup
 * ユーザーサインアップエンドポイント
 */
export async function POST(request: NextRequest) {
  try {
    const { email, password, full_name } = await request.json();

    // バリデーション
    if (!email || !password) {
      return NextResponse.json({ error: 'メールアドレスとパスワードは必須です' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: 'パスワードは6文字以上である必要があります' }, { status: 400 });
    }

    // Supabase Auth でユーザー作成
    const { data: authData, error: authError } = await supabaseServer.auth.admin.createUser({
      email,
      password,
      user_metadata: { full_name },
      email_confirm: true, // 本番環境ではメール確認を必須にする
    });

    if (authError || !authData.user) {
      return NextResponse.json({ error: authError?.message || 'サインアップに失敗しました' }, { status: 400 });
    }

    // Profile レコード作成
    const { error: profileError } = await supabaseServer.from('profiles').insert({
      id: authData.user.id,
      email,
      full_name,
    });

    if (profileError) {
      // Profile 作成失敗時はユーザーを削除
      await supabaseServer.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json(
        { error: 'プロフィール作成に失敗しました' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'サインアップ成功', user: authData.user },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: '予期しないエラーが発生しました' }, { status: 500 });
  }
}
