
import React from "react";
import { Message } from "../../types/api";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import MarkdownRenderer from "./MarkdownRenderer";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-6 animate-fade-in`}
    >
      {!isUser && (
        <div className="mr-3 mt-1 flex-shrink-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-agent-light text-agent-dark text-xs font-medium">
              AI
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <div 
        className={`
          max-w-[85%] rounded-2xl px-4 py-3 
          ${isUser 
            ? "bg-primary text-primary-foreground ml-12" 
            : "bg-accent text-foreground mr-12"
          }
        `}
      >
        {isUser ? (
          <p className="text-sm leading-relaxed">{message.content}</p>
        ) : (
          <MarkdownRenderer 
            content={message.content} 
            className="text-sm leading-relaxed"
          />
        )}
      </div>
      
      {isUser && (
        <div className="ml-3 mt-1 flex-shrink-0">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
              ME
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
