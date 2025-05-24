// Corresponds to SessionDataLogEntry in backend/schemas.py
export interface SessionDataLogEntry {
  log_id: string;
  timestamp: string; // ISO string format for datetime
  description?: string;
  data: any; // Or a more specific type if you know the structure of 'data'
  triggering_message_turn_index?: number;
}

// Corresponds to SessionDataLogResponse in backend/schemas.py
export interface SessionDataLogResponse {
  log: SessionDataLogEntry[];
}

// Update ChatHistoryResponse type if it's defined in the frontend
// This assumes there's a type definition for ChatHistoryResponse, possibly in a file like 'chat.ts' or 'api.ts'
// If ChatHistoryResponse is defined in types/api.ts or similar, that file should be updated.
// For now, I'll define it here for completeness, but it should be co-located with other API response types.

export interface Message {
  sender: string;
  content: string;
}

export interface ChatHistoryResponse {
  history: Message[];
  latest_retrieved_data?: any; // Or a more specific type
  latest_data_description?: string;
} 