import { TASK_PRIORITY_LABELS, TASK_PRIORITY_COLORS } from '@/lib/constants';
import type { Task } from '@/types/database';

interface TaskStatusBadgeProps {
  status: Task['status'];
  priority?: Task['priority'];
}

export function TaskStatusBadge({ status, priority }: TaskStatusBadgeProps) {
  const statusColors: Record<Task['status'], string> = {
    todo: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-blue-100 text-blue-800',
    done: 'bg-green-100 text-green-800',
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
      {status === 'todo' ? 'To Do' : status === 'in_progress' ? '進行中' : '完了'}
    </span>
  );
}

export function TaskPriorityBadge({ priority }: { priority: Task['priority'] }) {
  return (
    <span
      className="inline-block px-3 py-1 rounded text-xs font-medium text-white"
      style={{ backgroundColor: TASK_PRIORITY_COLORS[priority] }}
    >
      {TASK_PRIORITY_LABELS[priority]}
    </span>
  );
}
