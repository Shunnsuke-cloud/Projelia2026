import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';
import { isUUID } from '@/lib/utils/helpers';

/**
 * GET /api/tasks/[id]
 * タスク詳細取得
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!isUUID(id)) {
      return NextResponse.json({ error: '無効なタスクIDです' }, { status: 400 });
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

    // タスク情報取得
    const { data: task, error } = await supabaseServer
      .from('tasks')
      .select(`
        *,
        task_assignees(id, user_id, profiles(email, full_name)),
        comments(id, author_id, content, created_at, profiles(email, full_name))
      `)
      .eq('id', id)
      .single();

    if (error || !task) {
      return NextResponse.json({ error: 'タスクが見つかりません' }, { status: 404 });
    }

    // プロジェクトアクセス権限チェック
    const { data: project } = await supabaseServer
      .from('projects')
      .select('owner_id')
      .eq('id', task.project_id)
      .single();

    const { data: isMember } = await supabaseServer
      .from('project_members')
      .select('id')
      .eq('project_id', task.project_id)
      .eq('user_id', user.id)
      .single();

    if (!project || (project.owner_id !== user.id && !isMember)) {
      return NextResponse.json({ error: 'アクセス権限がありません' }, { status: 403 });
    }

    return NextResponse.json({ task }, { status: 200 });
  } catch (err) {
    console.error('Get task error:', err);
    return NextResponse.json({ error: '予期しないエラーが発生しました' }, { status: 500 });
  }
}

/**
 * PUT /api/tasks/[id]
 * タスク更新
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!isUUID(id)) {
      return NextResponse.json({ error: '無効なタスクIDです' }, { status: 400 });
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

    const { title, description, status, priority, due_date, start_date } = await request.json();

    // タスク取得
    const { data: task, error: fetchError } = await supabaseServer
      .from('tasks')
      .select('project_id')
      .eq('id', id)
      .single();

    if (fetchError || !task) {
      return NextResponse.json({ error: 'タスクが見つかりません' }, { status: 404 });
    }

    // プロジェクトアクセス権限チェック
    const { data: project } = await supabaseServer
      .from('projects')
      .select('owner_id')
      .eq('id', task.project_id)
      .single();

    const { data: isMember } = await supabaseServer
      .from('project_members')
      .select('id')
      .eq('project_id', task.project_id)
      .eq('user_id', user.id)
      .single();

    if (!project || (project.owner_id !== user.id && !isMember)) {
      return NextResponse.json({ error: 'アクセス権限がありません' }, { status: 403 });
    }

    // タスク更新
    const updateData: any = { title, description, priority, due_date, start_date };
    
    // ステータスが done に変更された場合、完了日時を記録
    if (status === 'done') {
      updateData.completed_at = new Date().toISOString();
    } else if (status !== 'done') {
      updateData.completed_at = null;
    }

    if (status) {
      updateData.status = status;
    }

    const { data: updated, error } = await supabaseServer
      .from('tasks')
      .update(updateData)
      .eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ task: updated, message: 'タスクを更新しました' }, { status: 200 });
  } catch (err) {
    console.error('Update task error:', err);
    return NextResponse.json({ error: '予期しないエラーが発生しました' }, { status: 500 });
  }
}

/**
 * DELETE /api/tasks/[id]
 * タスク削除
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!isUUID(id)) {
      return NextResponse.json({ error: '無効なタスクIDです' }, { status: 400 });
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

    // タスク取得
    const { data: task, error: fetchError } = await supabaseServer
      .from('tasks')
      .select('project_id, created_by')
      .eq('id', id)
      .single();

    if (fetchError || !task) {
      return NextResponse.json({ error: 'タスクが見つかりません' }, { status: 404 });
    }

    // プロジェクトアクセス権限チェック
    const { data: project } = await supabaseServer
      .from('projects')
      .select('owner_id')
      .eq('id', task.project_id)
      .single();

    const { data: isMember } = await supabaseServer
      .from('project_members')
      .select('id')
      .eq('project_id', task.project_id)
      .eq('user_id', user.id)
      .single();

    if (!project || (project.owner_id !== user.id && !isMember)) {
      return NextResponse.json({ error: 'アクセス権限がありません' }, { status: 403 });
    }

    // タスク削除
    const { error } = await supabaseServer.from('tasks').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'タスクを削除しました' }, { status: 200 });
  } catch (err) {
    console.error('Delete task error:', err);
    return NextResponse.json({ error: '予期しないエラーが発生しました' }, { status: 500 });
  }
}
