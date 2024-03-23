export interface MessagesData {
  data: MessageType[];
}

export interface MessageType {
  id: number;
  group_id: number;
  type: string;
  title: string | null;
  content: string;
  target_user_id: number;
  created_at: string;
  updated_at: string;
  sender_id: number | null;
}
