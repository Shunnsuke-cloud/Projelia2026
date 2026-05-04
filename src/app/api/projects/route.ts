import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

/**
 * GET /api/projects
 * 現在のユーザーが属するプロジェクト一覧取得
 */
export async function GET(request: NextRequest) {
  try {
    // ヘッダーからトークンを取得（フロントエンドから渡される）
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    // トークンからユーザー情報を取得
    const {
      data: { user },
      error: userError,
    } = await supabaseServer.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: '認証に失敗しました' }, { status: 401 });
    }

    // ユーザーが所有または参加しているプロジェクトを取得
    const { data: projects, error } = await supabaseServer
      .from('projects')
      .select(`
        *,
        project_members(id, user_id, role)
      `)
      .or(`owner_id.eq.${user.id},project_members.user_id.eq.${user.id}`)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ projects }, { status: 200 });
  } catch (err) {
    console.error('Get projects error:', err);
    return NextResponse.json({ error: '予期しないエラーが発生しました' }, { status: 500 });
  }
}

/**
 * POST /api/projects
 * 新しいプロジェクトを作成
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: '認証が必要です' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');
    const {
      data: { user },
      error: userError,
    } = await supabaseServer.auth.getUser(token);

    if (userError || !user) {
      return NextResponse.json({ error: '認証に失敗しました' }, { status: 401 });
    }

    const { name, description, start_date, end_date, color } = await request.json();

    if (!name) {
      return NextResponse.json({ error: 'プロジェクト名は必須です' }, { status: 400 });
    }

    // プロジェクトを作成
    const { data: project, error } = await supabaseServer.from('projects').insert({
      owner_id: user.id,
      name,
      description,
      start_date,
      end_date,
      color: color || '#0ea5e9',
      status: 'active',
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ project, message: 'プロジェクトを作成しました' }, { status: 201 });
  } catch (err) {
    console.error('Create project error:', err);
    return NextResponse.json({ error: '予期しないエラーが発生しました' }, { status: 500 });
  }
}
