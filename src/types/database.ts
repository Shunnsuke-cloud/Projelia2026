/* Supabase Database Types */

// Profile 型
export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  department: string | null;
  role: 'admin' | 'manager' | 'user';
  created_at: string;
  updated_at: string;
};

// Project 型
export type Project = {
  id: string;
  owner_id: string;
  name: string;
  description: string | null;
  status: 'active' | 'archived' | 'completed';
  start_date: string | null;
  end_date: string | null;
  color: string;
  created_at: string;
  updated_at: string;
};

// ProjectMember 型
export type ProjectMember = {
  id: string;
  project_id: string;
  user_id: string;
  role: 'owner' | 'manager' | 'member';
  joined_at: string;
};

// Task 型
export type Task = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  due_date: string | null;
  start_date: string | null;
  created_by: string;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
};

// TaskAssignee 型
export type TaskAssignee = {
  id: string;
  task_id: string;
  user_id: string;
  assigned_at: string;
};

// Comment 型
export type Comment = {
  id: string;
  task_id: string;
  author_id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

// 拡張型（リレーション含む）
export type ProjectWithMembers = Project & {
  project_members: ProjectMember[];
};

export type TaskWithAssignees = Task & {
  task_assignees: TaskAssignee[];
  comments: Comment[];
};

export type TaskWithAuthor = Task & {
  author?: Profile;
};
