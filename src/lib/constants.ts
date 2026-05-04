// ステータス定義
export const TASK_STATUS = {
  TODO: 'todo',
  IN_PROGRESS: 'in_progress',
  DONE: 'done',
} as const;

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.TODO]: 'To Do',
  [TASK_STATUS.IN_PROGRESS]: '進行中',
  [TASK_STATUS.DONE]: '完了',
} as const;

// 優先度定義
export const TASK_PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export const TASK_PRIORITY_LABELS = {
  [TASK_PRIORITY.LOW]: '低',
  [TASK_PRIORITY.MEDIUM]: '中',
  [TASK_PRIORITY.HIGH]: '高',
  [TASK_PRIORITY.URGENT]: '緊急',
} as const;

export const TASK_PRIORITY_COLORS = {
  [TASK_PRIORITY.LOW]: '#10b981',
  [TASK_PRIORITY.MEDIUM]: '#f59e0b',
  [TASK_PRIORITY.HIGH]: '#ef4444',
  [TASK_PRIORITY.URGENT]: '#991b1b',
} as const;

// ロール定義
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  USER: 'user',
} as const;

export const PROJECT_ROLES = {
  OWNER: 'owner',
  MANAGER: 'manager',
  MEMBER: 'member',
} as const;

// プロジェクトステータス
export const PROJECT_STATUS = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  COMPLETED: 'completed',
} as const;

export const PROJECT_STATUS_LABELS = {
  [PROJECT_STATUS.ACTIVE]: 'アクティブ',
  [PROJECT_STATUS.ARCHIVED]: 'アーカイブ',
  [PROJECT_STATUS.COMPLETED]: '完了',
} as const;
