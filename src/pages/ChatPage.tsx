
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { sendChatMessage, getChatHistory } from "../services/api";
import { ChatHistoryResponse, Message } from "../types/api";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ChatMessage from "../components/chat/ChatMessage";
import DataTable from "../components/ui/data-table";

const ChatPage = () => {
  const navigate = useNavigate();
  const { sessionInfo, isAuthenticated } = useSession();
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [retrievedData, setRetrievedData] = useState<any[] | null>(null);
  const [dataDescription, setDataDescription] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Redirect to auth page if not authenticated
    if (!isAuthenticated) {
      navigate("/auth");
      return;
    }

    // Load chat history on initial render
    const loadHistory = async () => {
      try {
        setLoading(true);
        if (sessionInfo?.session_id) {
          const response = await getChatHistory(sessionInfo.session_id);
          setChatHistory(response.history);
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Error loading chat history",
          description: "Failed to load previous conversation",
        });
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [sessionInfo, isAuthenticated, navigate, toast]);

  useEffect(() => {
    // Scroll to bottom when chat history updates
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!sessionInfo?.session_id || !userInput.trim()) {
      return;
    }

    const userMessage: Message = {
      sender: "user",
      content: userInput
    };

    // Optimistically update chat history with user message
    setChatHistory((prev) => [...prev, userMessage]);
    setUserInput("");
    
    try {
      setLoading(true);
      
      const response = await sendChatMessage({
        session_id: sessionInfo.session_id,
        message: userMessage.content
      });

      // Update with full chat history from response
      setChatHistory(response.history);
      
      // Set any retrieved data
      setRetrievedData(response.retrieved_data);
      setDataDescription(response.data_description);
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to send message",
        description: "There was an error processing your request",
      });
      
      // Remove the optimistically added message on error
      setChatHistory((prev) => prev.filter(message => message !== userMessage));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-5xl">
      <Card className="shadow-lg border-t-4 border-t-primary">
        <CardContent className="p-6">
          <div className="flex flex-col h-[calc(100vh-280px)]">
            {/* Chat History */}
            <div className="flex-grow overflow-y-auto p-4 scroll-container">
              {chatHistory.length === 0 && !loading ? (
                <div className="text-center text-muted-foreground py-8">
                  <p>Start a conversation with the Salesforce AI agent.</p>
                  <p className="text-sm mt-2">Try asking questions like:</p>
                  <ul className="text-sm mt-1 space-y-1 text-primary">
                    <li>"Show me the top 5 opportunities"</li>
                    <li>"Create a new contact for John Doe"</li>
                    <li>"Find accounts in California"</li>
                  </ul>
                </div>
              ) : (
                chatHistory.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))
              )}
              
              {loading && (
                <div className="flex items-center justify-center py-4">
                  <div className="animate-pulse-slow text-center">
                    <p className="text-muted-foreground">AI is thinking...</p>
                  </div>
                </div>
              )}
              
              {/* Display retrieved data if available */}
              {retrievedData && (
                <DataTable data={retrievedData} description={dataDescription} />
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Message Input */}
            <div className="pt-4 border-t">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask the Salesforce AI agent..."
                  disabled={loading}
                  className="flex-grow"
                />
                <Button type="submit" disabled={loading || !userInput.trim()}>
                  Send
                </Button>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatPage;
