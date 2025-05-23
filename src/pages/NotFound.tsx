
import React from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md p-6">
        <h1 className="text-6xl font-bold gradient-text mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! We couldn't find the page you're looking for.</p>
        <div className="space-y-4">
          <p className="text-gray-500">
            The page at <code className="bg-gray-100 px-2 py-1 rounded">{location.pathname}</code> doesn't exist.
          </p>
          <Link to="/">
            <Button className="w-full">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
