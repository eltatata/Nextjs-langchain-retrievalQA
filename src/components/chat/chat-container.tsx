import React from 'react';
import { Card } from '@/components/ui/card';
import { Message } from 'ai';
import WelcomeMessage from './welcome-message';
import ChatMessages from './chat-messages';
import TypingIndicator from './typing-indicator';
import ChatInputForm from './chat-input-form';

interface ChatContainerProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  isTyping: boolean;
  onInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onQuestionClick: (question: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export default function ChatContainer({
  messages,
  input,
  isLoading,
  isTyping,
  onInputChange,
  onSubmit,
  onQuestionClick,
  messagesEndRef,
}: ChatContainerProps) {
  const welcomeQuestions = [
    'What is a binary search tree?',
    'Explain hash table collisions',
    'What is the Big O?',
    'How a stack works? show it to me in code',
  ];

  return (
    <Card className="bg-neutral-800/20 backdrop-blur-md border border-neutral-700/30 shadow-2xl rounded-2xl overflow-hidden">
      <div className="h-[60vh] overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <WelcomeMessage
            title="Welcome to your AI teacher for Data Structures!"
            description="I'm here to help you understand data structures and algorithms. Ask me about arrays, trees, graphs, sorting algorithms, and more!"
            questions={welcomeQuestions}
            onQuestionClick={onQuestionClick}
          />
        )}
        <ChatMessages messages={messages} />
        <TypingIndicator isVisible={isTyping} />
        <div ref={messagesEndRef} />
      </div>
      <ChatInputForm
        input={input}
        isLoading={isLoading}
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        placeholder="Ask about data structures..."
      />
    </Card>
  );
}
