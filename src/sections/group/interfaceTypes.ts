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

export interface Task {
  id: 1;
  name: "New task";
  user_id: 2;
  challenge_id: 1;
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
