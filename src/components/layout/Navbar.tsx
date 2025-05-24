
import React, { useState } from "react";
import { useSession } from "../../context/SessionContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import ConversationalAuthModal from "../auth/ConversationalAuthModal";

const Navbar = () => {
  const { isAuthenticated, clearAllSessions, sessions } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <>
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold gradient-text">OpenOrg AI</span>
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/chat">
                  <Button variant="outline">
                    Chat Interface {sessions.length > 0 && `(${sessions.length})`}
                  </Button>
                </Link>
                <Button 
                  variant="secondary"
                  onClick={() => setIsAuthModalOpen(true)}
                >
                  New Session
                </Button>
                <Button 
                  variant="destructive" 
                  onClick={clearAllSessions}
                >
                  Clear All Sessions
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsAuthModalOpen(true)}>
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>

      <ConversationalAuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
