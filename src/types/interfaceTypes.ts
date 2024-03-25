export interface APIResponse {
  data: any;
  message?: string;
  success: boolean;
}

export interface CurrentUser {
  id: number;
  name: string;
}
