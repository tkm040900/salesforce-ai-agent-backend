
import React from "react";
import { Message } from "../../types/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in`}
    >
      {!isUser && (
        <div className="mr-3 mt-1">
          <Avatar>
            <AvatarFallback className="bg-agent-light text-agent-dark">AI</AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <div 
        className={isUser ? "chat-message-user" : "chat-message-ai"}
      >
        {message.content}
      </div>
      
      {isUser && (
        <div className="ml-3 mt-1">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">ME</AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
