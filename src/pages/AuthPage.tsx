
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "../context/SessionContext";
import { authenticateWithSalesforce } from "../services/api";
import { SalesforceAuthRequest } from "../types/api";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addSession } = useSession();

  const [authData, setAuthData] = useState<SalesforceAuthRequest>({
    instance_url: "",
    client_id: "",
    client_secret: "",
    username: "",
    password: "",
    grant_type: "password",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate required fields
      if (!authData.instance_url || !authData.username || !authData.password || !authData.client_id || !authData.client_secret) {
        throw new Error("All fields are required");
      }

      const response = await authenticateWithSalesforce(authData);

      // Extract organization name from instance URL or username for display
      const organizationName = authData.instance_url.replace(/https?:\/\//, '').split('.')[0] || 
                              authData.username.split('@')[1]?.split('.')[0] || 
                              'Organization';

      // Add new session
      addSession({
        session_id: response.session_id,
        instance_url: response.instance_url,
        organization_name: organizationName,
        created_at: new Date().toISOString()
      });

      toast({
        title: "Authentication successful",
        description: `New session created for ${organizationName}`,
      });

      // Redirect to chat page
      navigate("/chat");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-[calc(100vh-200px)]">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Connect to Salesforce</CardTitle>
          <CardDescription>
            Create a new chat session with your Salesforce organization
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="instance_url">Instance URL</Label>
              <Input
                id="instance_url"
                name="instance_url"
                placeholder="https://yourinstance.my.salesforce.com"
                value={authData.instance_url}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client_id">Client ID</Label>
              <Input
                id="client_id"
                name="client_id"
                placeholder="Your Connected App Client ID"
                value={authData.client_id}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="client_secret">Client Secret</Label>
              <Input
                id="client_secret"
                name="client_secret"
                placeholder="Your Connected App Client Secret"
                value={authData.client_secret}
                onChange={handleChange}
                type="password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                placeholder="user@example.com"
                value={authData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Password + Security Token"
                value={authData.password}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                Note: For many orgs, your password needs to include your security token
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              type="submit" 
              disabled={isLoading}
            >
              {isLoading ? "Connecting..." : "Create New Session"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default AuthPage;
