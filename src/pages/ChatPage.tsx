
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../context/SessionContext";
import { sendChatMessage, getChatHistory, getSessionDataLog } from "../services/api";
import { ChatHistoryResponse, Message } from "../types/api";
import { SessionDataLogEntry, SessionDataLogResponse } from "../types/dataLog";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar";
import ChatMessage from "../components/chat/ChatMessage";
import ChatSidebar from "../components/chat/ChatSidebar";
import DataTable from "../components/ui/data-table";

const ChatPage = () => {
  const navigate = useNavigate();
  const { currentSession, isAuthenticated } = useSession();
  
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [retrievedData, setRetrievedData] = useState<any[] | null>(null);
  const [dataDescription, setDataDescription] = useState<string | null>(null);

  const [sessionDataLog, setSessionDataLog] = useState<SessionDataLogEntry[]>([]);
  const [showDataLog, setShowDataLog] = useState<boolean>(false);
  const [dataLogLoading, setDataLogLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Redirect to auth page if not authenticated
    if (!isAuthenticated || !currentSession) {
      navigate("/auth");
      return;
    }

    // Load chat history when current session changes
    const loadHistory = async () => {
      try {
        setLoading(true);
        const response = await getChatHistory(currentSession.session_id);
        setChatHistory(response.history);
        // Clear previous data when switching sessions
        setRetrievedData(null);
        setDataDescription(null);
        setShowDataLog(false);
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
  }, [currentSession, isAuthenticated, navigate, toast]);

  useEffect(() => {
    // Scroll to bottom when chat history updates
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleNewSession = () => {
    navigate("/auth");
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentSession?.session_id || !userInput.trim()) {
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
        session_id: currentSession.session_id,
        message: userMessage.content
      });

      // Update with full chat history from response
      setChatHistory(response.history);
      
      // Set any retrieved data (now latest_retrieved_data)
      setRetrievedData(response.latest_retrieved_data || null);
      setDataDescription(response.latest_data_description || null);
      
      // Clear previous session log display if new data comes in
      setShowDataLog(false);
      
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

  const handleFetchDataLog = async () => {
    if (!currentSession?.session_id) return;

    // If already showing the log, just hide it without fetching
    if (showDataLog) {
      setShowDataLog(false);
      return;
    }

    setDataLogLoading(true);
    setShowDataLog(true);
    
    try {
      const response = await getSessionDataLog(currentSession.session_id);
      setSessionDataLog(response.log);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to load data log",
        description: "Could not retrieve the history of fetched data.",
      });
      setShowDataLog(false);
    } finally {
      setDataLogLoading(false);
    }
  };

  const getCurrentSessionName = () => {
    if (!currentSession) return "No Session";
    return currentSession.organization_name || currentSession.session_id.substring(0, 8);
  };

  if (!isAuthenticated || !currentSession) {
    return null; // Will redirect in useEffect
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <SidebarContent>
            <ChatSidebar onNewSession={handleNewSession} />
          </SidebarContent>
        </Sidebar>
        
        <SidebarInset className="flex flex-col">
          {/* Header */}
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center gap-3">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold">
                {getCurrentSessionName()} - Salesforce AI Chat
              </h1>
            </div>
            <Button onClick={handleFetchDataLog} variant="outline" disabled={dataLogLoading || loading}>
              {dataLogLoading ? "Loading Log..." : showDataLog ? "Hide Data Log" : "View Data Log"}
            </Button>
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
            <div className="max-w-4xl mx-auto">
              {chatHistory.length === 0 && !loading ? (
                <div className="text-center text-muted-foreground py-16">
                  <h2 className="text-2xl font-semibold mb-4">Welcome to Salesforce AI Assistant</h2>
                  <p className="text-lg mb-6">Start a conversation with the AI agent to interact with your Salesforce data.</p>
                  <div className="space-y-2">
                    <p className="text-sm">Try asking questions like:</p>
                    <div className="space-y-2 text-primary">
                      <div className="bg-accent/50 rounded-lg p-3 text-sm">"Show me the top 5 opportunities"</div>
                      <div className="bg-accent/50 rounded-lg p-3 text-sm">"Create a new contact for John Doe"</div>
                      <div className="bg-accent/50 rounded-lg p-3 text-sm">"Find accounts in California"</div>
                    </div>
                  </div>
                </div>
              ) : (
                chatHistory.map((message, index) => (
                  <ChatMessage key={index} message={message} />
                ))
              )}
              
              {loading && (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-pulse-slow text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <p className="text-muted-foreground mt-2">AI is thinking...</p>
                  </div>
                </div>
              )}
              
              {/* Display retrieved data if available */}
              {retrievedData && !showDataLog && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Latest Retrieved Data:</h3>
                  <DataTable data={retrievedData} description={dataDescription} />
                </div>
              )}

              {/* Display Session Data Log */}
              {showDataLog && (
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-2 text-foreground">Session Data Log:</h3>
                  {dataLogLoading && <p>Loading data log...</p>}
                  {!dataLogLoading && sessionDataLog.length === 0 && <p>No data has been retrieved in this session yet.</p>}
                  {!dataLogLoading && sessionDataLog.length > 0 && (
                    <div className="space-y-4">
                      {sessionDataLog.map((logEntry) => (
                        <Card key={logEntry.log_id}>
                          <CardContent className="p-4">
                            <p className="text-sm text-muted-foreground mb-1">
                              Logged at: {new Date(logEntry.timestamp).toLocaleString()}
                            </p>
                            <p className="font-medium mb-2">{logEntry.description || "Retrieved Data"}</p>
                            {logEntry.data && (
                               Array.isArray(logEntry.data) ? (
                                <DataTable data={logEntry.data} description={null} />
                               ) : ( <pre className="bg-muted p-2 rounded-md text-xs overflow-auto">
                                {JSON.stringify(logEntry.data, null, 2)}
                              </pre> )
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Message Input - Fixed at bottom */}
          <div className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="max-w-4xl mx-auto p-4">
              <form onSubmit={handleSendMessage} className="flex space-x-3">
                <Input
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ask the Salesforce AI agent anything..."
                  disabled={loading}
                  className="flex-grow text-base"
                />
                <Button type="submit" disabled={loading || !userInput.trim()} size="lg">
                  Send
                </Button>
              </form>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default ChatPage;
