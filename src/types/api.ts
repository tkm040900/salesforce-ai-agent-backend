
export interface SalesforceAuthRequest {
  instance_url?: string;
  access_token?: string;
  client_id?: string;
  client_secret?: string;
  username?: string;
  password?: string;
  grant_type?: "password" | "token";
}

export interface SalesforceAuthResponse {
  access_token: string;
  instance_url: string;
  session_id: string;
  message: string;
}

export interface Message {
  sender: "user" | "system";
  content: string;
}

export interface ChatRequest {
  session_id: string;
  message: string;
}

export interface ChatHistoryResponse {
  history: Message[];
  retrieved_data: any | null;
  data_description: string | null;
}

export interface SessionInfo {
  session_id: string;
  instance_url: string;
}
