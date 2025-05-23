
import React, { createContext, useContext, useState, ReactNode } from "react";
import { SessionInfo } from "../types/api";

interface SessionContextType {
  sessionInfo: SessionInfo | null;
  setSessionInfo: (session: SessionInfo | null) => void;
  clearSession: () => void;
  isAuthenticated: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionProvider = ({ children }: { children: ReactNode }) => {
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(() => {
    // Check if we have a saved session in localStorage
    const savedSession = localStorage.getItem("sessionInfo");
    return savedSession ? JSON.parse(savedSession) : null;
  });

  const saveSession = (session: SessionInfo | null) => {
    setSessionInfo(session);
    if (session) {
      localStorage.setItem("sessionInfo", JSON.stringify(session));
    } else {
      localStorage.removeItem("sessionInfo");
    }
  };

  const clearSession = () => {
    localStorage.removeItem("sessionInfo");
    setSessionInfo(null);
  };

  return (
    <SessionContext.Provider
      value={{
        sessionInfo,
        setSessionInfo: saveSession,
        clearSession,
        isAuthenticated: !!sessionInfo
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
