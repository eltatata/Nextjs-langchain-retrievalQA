import { Bot, User } from "lucide-react";
import { Message } from "ai";

interface ChatMessagesProps {
  messages: Message[];
}

export default function ChatMessages({ messages }: ChatMessagesProps) {
  return (
    <>
      {messages.map((message, index) => (
        <div
          key={message.id}
          className="flex items-start space-x-3 message-enter-fast"
          style={{
            animationDelay: `${index * 0.05}s`,
          }}        >
          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
              message.role === "user"
                ? "bg-gradient-to-r from-neutral-600 to-neutral-700"
                : "bg-gradient-to-r from-emerald-500 to-green-600"
            }`}
          >
            {message.role === "user" ? (
              <User className="w-4 h-4 text-white" />
            ) : (
              <Bot className="w-4 h-4 text-white" />
            )}
          </div>
          <div className={`flex-1 ${message.role === "user" ? "max-w-[80%]" : ""}`}>
            <div
              className={`p-4 rounded-2xl shadow-lg ${
                message.role === "user"
                  ? "bg-gradient-to-r from-neutral-600 to-neutral-700 text-white ml-auto"
                  : "bg-neutral-700/40 backdrop-blur-sm border border-neutral-600/30 text-neutral-100"
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed">{message.content}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
