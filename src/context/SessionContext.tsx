
import React, { createContext, useContext, useState, ReactNode } from "react";
import { SessionInfo } from "../types/api";

interface SessionContextType {
  sessions: SessionInfo[];
  currentSession: SessionInfo | null;
  setCurrentSession: (session: SessionInfo | null) => void;
  addSession: (session: SessionInfo) => void;
  removeSession: (sessionId: string) => void;
  clearAllSessions: () => void;
  isAuthenticated: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessions, setSessions] = useState<SessionInfo[]>(() => {
    // Load all sessions from localStorage
    const savedSessions = localStorage.getItem("sessions");
    return savedSessions ? JSON.parse(savedSessions) : [];
  });

  const [currentSession, setCurrentSessionState] = useState<SessionInfo | null>(() => {
    // Load current session from localStorage
    const savedCurrentSession = localStorage.getItem("currentSession");
    if (savedCurrentSession) {
      const session = JSON.parse(savedCurrentSession);
      // Verify the session still exists in the sessions list
      const savedSessions = localStorage.getItem("sessions");
      const sessionsList = savedSessions ? JSON.parse(savedSessions) : [];
      return sessionsList.find((s: SessionInfo) => s.session_id === session.session_id) || null;
    }
    return null;
  });

  const saveSessions = (newSessions: SessionInfo[]) => {
    setSessions(newSessions);
    localStorage.setItem("sessions", JSON.stringify(newSessions));
  };

  const setCurrentSession = (session: SessionInfo | null) => {
    setCurrentSessionState(session);
    if (session) {
      localStorage.setItem("currentSession", JSON.stringify(session));
    } else {
      localStorage.removeItem("currentSession");
    }
  };

  const addSession = (session: SessionInfo) => {
    const sessionWithTimestamp = {
      ...session,
      created_at: session.created_at || new Date().toISOString()
    };
    
    const updatedSessions = [...sessions, sessionWithTimestamp];
    saveSessions(updatedSessions);
    setCurrentSession(sessionWithTimestamp);
  };

  const removeSession = (sessionId: string) => {
    const updatedSessions = sessions.filter(s => s.session_id !== sessionId);
    saveSessions(updatedSessions);
    
    // If we're removing the current session, clear it
    if (currentSession?.session_id === sessionId) {
      setCurrentSession(null);
    }
  };

  const clearAllSessions = () => {
    localStorage.removeItem("sessions");
    localStorage.removeItem("currentSession");
    setSessions([]);
    setCurrentSession(null);
  };

  return (
    <SessionContext.Provider
      value={{
        sessions,
        currentSession,
        setCurrentSession,
        addSession,
        removeSession,
        clearAllSessions,
        isAuthenticated: !!currentSession
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = (): SessionContextType => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
