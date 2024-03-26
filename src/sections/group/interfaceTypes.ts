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

export interface UserType {
  id: number;
  name: string;
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
