import { ChatRequest, ChatHistoryResponse, SalesforceAuthRequest, SalesforceAuthResponse } from "../types/api";
import { SessionDataLogResponse } from "../types/dataLog";

// This is the base URL for our API calls
const API_BASE_URL = "http://localhost:8000";

// Authentication with Salesforce
export const authenticateWithSalesforce = async (
  authRequest: SalesforceAuthRequest
): Promise<SalesforceAuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/salesforce/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authRequest),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Authentication failed");
    }

    return await response.json();
  } catch (error) {
    console.error("Authentication error:", error);
    throw error;
  }
};

// Send chat message
export const sendChatMessage = async (
  chatRequest: ChatRequest
): Promise<ChatHistoryResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/send`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(chatRequest),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to send message");
    }

    return await response.json();
  } catch (error) {
    console.error("Chat message error:", error);
    throw error;
  }
};

// Get chat history
export const getChatHistory = async (
  sessionId: string
): Promise<ChatHistoryResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/history/${sessionId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch chat history");
    }

    return await response.json();
  } catch (error) {
    console.error("Get chat history error:", error);
    throw error;
  }
};

// Get Session Data Log
export const getSessionDataLog = async (
  sessionId: string
): Promise<SessionDataLogResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/sessions/${sessionId}/retrieved_data_log`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || "Failed to fetch session data log");
    }

    return await response.json();
  } catch (error) {
    console.error("Get session data log error:", error);
    throw error;
  }
};
