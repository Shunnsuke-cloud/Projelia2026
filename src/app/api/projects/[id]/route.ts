import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { isUUID } from '@/lib/utils/helpers';

/**
 * GET /api/projects/[id]
 * プロジェクト詳細取得
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!isUUID(id)) {
      return NextResponse.json({ error: '無効なプロジェクトIDです' }, { status: 400 });
    }

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

    // プロジェクト情報取得
    const { data: project, error } = await supabaseServer
      .from('projects')
      .select(`
        *,
        project_members(id, user_id, role, profiles(email, full_name))
      `)
      .eq('id', id)
      .single();

    if (error || !project) {
      return NextResponse.json({ error: 'プロジェクトが見つかりません' }, { status: 404 });
    }

    // アクセス権限チェック
    const isOwner = project.owner_id === user.id;
    const isMember = project.project_members?.some((m: any) => m.user_id === user.id);

    if (!isOwner && !isMember) {
      return NextResponse.json({ error: 'アクセス権限がありません' }, { status: 403 });
    }

    return NextResponse.json({ project }, { status: 200 });
  } catch (err) {
    console.error('Get project error:', err);
    return NextResponse.json({ error: '予期しないエラーが発生しました' }, { status: 500 });
  }
}

/**
 * PUT /api/projects/[id]
 * プロジェクト更新
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!isUUID(id)) {
      return NextResponse.json({ error: '無効なプロジェクトIDです' }, { status: 400 });
    }

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

    // プロジェクトの所有者確認
    const { data: project, error: fetchError } = await supabaseServer
      .from('projects')
      .select('owner_id')
      .eq('id', id)
      .single();

    if (fetchError || !project) {
      return NextResponse.json({ error: 'プロジェクトが見つかりません' }, { status: 404 });
    }

    if (project.owner_id !== user.id) {
      return NextResponse.json({ error: 'プロジェクトの更新権限がありません' }, { status: 403 });
    }

    const { name, description, status, start_date, end_date, color } = await request.json();

    // プロジェクト更新
    const { data: updated, error } = await supabaseServer
      .from('projects')
      .update({
        name,
        description,
        status,
        start_date,
        end_date,
        color,
      })
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ project: updated, message: 'プロジェクトを更新しました' }, { status: 200 });
  } catch (err) {
    console.error('Update project error:', err);
    return NextResponse.json({ error: '予期しないエラーが発生しました' }, { status: 500 });
  }
}

/**
 * DELETE /api/projects/[id]
 * プロジェクト削除
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!isUUID(id)) {
      return NextResponse.json({ error: '無効なプロジェクトIDです' }, { status: 400 });
    }

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

    // プロジェクトの所有者確認
    const { data: project, error: fetchError } = await supabaseServer
      .from('projects')
      .select('owner_id')
      .eq('id', id)
      .single();

    if (fetchError || !project) {
      return NextResponse.json({ error: 'プロジェクトが見つかりません' }, { status: 404 });
    }

    if (project.owner_id !== user.id) {
      return NextResponse.json({ error: 'プロジェクトの削除権限がありません' }, { status: 403 });
    }

    // プロジェクト削除（カスケード削除により、関連するタスク・コメント等も削除される）
    const { error } = await supabaseServer.from('projects').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'プロジェクトを削除しました' }, { status: 200 });
  } catch (err) {
    console.error('Delete project error:', err);
    return NextResponse.json({ error: '予期しないエラーが発生しました' }, { status: 500 });
  }
}
