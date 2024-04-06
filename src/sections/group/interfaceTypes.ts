export interface ChallengeType {
  id: number;
  group_id: number;
  start_date: string;
  users?: UserType[];
}

export interface GroupData {
  id: number;
  challenges: ChallengeType[];
}

export interface CompletedTask {
  id: number;
  day: number;
  task_id: number;
}

export interface Task {
  id: number;
  name: string;
  user_id: number;
  challenge_id: number;
  completed_tasks: CompletedTask[];
}

export interface UserType {
  id: number;
  name: string;
  tasks: Task[];
}

export interface UsersData {
  users: UserType[];
}

export type TabOptions = "home" | "challenges" | "inviteUsers";

export interface TaskFormData {
  name: string;
}

export interface TaskFormErrors {
  name: boolean;
}

export interface TasksTableProps {
  tasks: Task[] | undefined;
}
