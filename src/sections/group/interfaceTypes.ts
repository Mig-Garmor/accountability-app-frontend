export interface ChallengeType {
  id: number;
  group_id: number;
  start_date: string;
}

export interface GroupData {
  id: number;
  challenges: ChallengeType[];
}
