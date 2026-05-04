import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '@/lib/supabase/server';

/**
 * GET /api/tasks?project_id=xxx
 * プロジェクトのタスク一覧取得
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('project_id');

    if (!projectId) {
      return NextResponse.json({ error: 'project_id パラメータが必須です' }, { status: 400 });
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

    // プロジェクトアクセス権限確認
    const { data: project } = await supabaseServer
      .from('projects')
      .select('owner_id')
      .eq('id', projectId)
      .single();

    const { data: isMember } = await supabaseServer
      .from('project_members')
      .select('id')
      .eq('project_id', projectId)
      .eq('user_id', user.id)
      .single();

    if (!project || (project.owner_id !== user.id && !isMember)) {
      return NextResponse.json({ error: 'アクセス権限がありません' }, { status: 403 });
    }

    // タスク一覧取得
    const { data: tasks, error } = await supabaseServer
      .from('tasks')
      .select(`
        *,
        task_assignees(id, user_id, profiles(email, full_name)),
        comments(count)
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ tasks }, { status: 200 });
  } catch (err) {
    console.error('Get tasks error:', err);
    return NextResponse.json({ error: '予期しないエラーが発生しました' }, { status: 500 });
  }
}

/**
 * POST /api/tasks
 * 新しいタスクを作成
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

    const { project_id, title, description, priority, due_date, start_date } = await request.json();

    if (!project_id || !title) {
      return NextResponse.json(
        { error: 'project_id とタイトルは必須です' },
        { status: 400 }
      );
    }

    // プロジェクトアクセス権限確認
    const { data: project } = await supabaseServer
      .from('projects')
      .select('owner_id')
      .eq('id', project_id)
      .single();

    const { data: isMember } = await supabaseServer
      .from('project_members')
      .select('id')
      .eq('project_id', project_id)
      .eq('user_id', user.id)
      .single();

    if (!project || (project.owner_id !== user.id && !isMember)) {
      return NextResponse.json({ error: 'アクセス権限がありません' }, { status: 403 });
    }

    // タスク作成
    const { data: task, error } = await supabaseServer.from('tasks').insert({
      project_id,
      title,
      description,
      priority: priority || 'medium',
      due_date,
      start_date,
      created_by: user.id,
      status: 'todo',
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ task, message: 'タスクを作成しました' }, { status: 201 });
  } catch (err) {
    console.error('Create task error:', err);
    return NextResponse.json({ error: '予期しないエラーが発生しました' }, { status: 500 });
  }
}
