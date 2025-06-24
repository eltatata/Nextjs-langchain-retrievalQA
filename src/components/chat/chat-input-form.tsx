import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, FileText } from 'lucide-react';

interface ChatInputFormProps {
  input: string;
  isLoading: boolean;
  onInputChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
}

export default function ChatInputForm({
  input,
  isLoading,
  onInputChange,
  onSubmit,
  placeholder = 'Ask about data structures...',
}: ChatInputFormProps) {
  return (
    <div className="p-6 border-t border-neutral-700/20 bg-neutral-800/10 backdrop-blur-sm">
      <form onSubmit={onSubmit} className="flex space-x-3">
        <div className="flex-1 relative">
          <Input
            name="message"
            value={input}
            onChange={onInputChange}
            placeholder={placeholder}
            className="bg-neutral-700/50 backdrop-blur-sm border-neutral-600/30 focus:border-emerald-400 focus:ring-emerald-400/20 rounded-xl pl-4 pr-12 py-3 text-neutral-100 placeholder-neutral-400"
            disabled={isLoading}
          />
          <FileText className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
        </div>
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
}
