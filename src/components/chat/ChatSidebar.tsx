
import React, { useState } from "react";
import { useSession } from "../../context/SessionContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus } from "lucide-react";
import ConversationalAuthModal from "../auth/ConversationalAuthModal";

const ChatSidebar = () => {
  const { sessions, currentSession, setCurrentSession, removeSession } = useSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const formatSessionName = (session: any) => {
    return session.organization_name || session.session_id.substring(0, 8);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <div className="w-full h-full flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Chat Sessions</CardTitle>
          <Button 
            onClick={() => setIsAuthModalOpen(true)} 
            className="w-full" 
            size="sm"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Session
          </Button>
        </CardHeader>
        
        <Separator />
        
        <ScrollArea className="flex-1 px-4">
          <div className="space-y-2 py-4">
            {sessions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-8">
                No sessions yet. Create your first session!
              </p>
            ) : (
              sessions.map((session) => (
                <Card
                  key={session.session_id}
                  className={`cursor-pointer transition-colors hover:bg-accent ${
                    currentSession?.session_id === session.session_id
                      ? "bg-accent border-primary"
                      : ""
                  }`}
                  onClick={() => setCurrentSession(session)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {formatSessionName(session)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(session.created_at)}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {session.instance_url}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeSession(session.session_id);
                        }}
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      <ConversationalAuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default ChatSidebar;
