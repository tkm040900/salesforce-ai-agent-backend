
import React from "react";
import { useSession } from "../../context/SessionContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, clearSession } = useSession();

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold gradient-text">OpenOrg AI</span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link to="/chat">
                <Button variant="outline">Chat Interface</Button>
              </Link>
              <Button 
                variant="destructive" 
                onClick={clearSession}
              >
                Logout
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
