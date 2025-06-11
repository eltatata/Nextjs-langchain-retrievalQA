import { BrainCircuit } from "lucide-react";

interface WelcomeMessageProps {
  title: string;
  description: string;
  questions: string[];
  onQuestionClick: (question: string) => void;
}

export default function WelcomeMessage({ 
  title, 
  description, 
  questions, 
  onQuestionClick 
}: WelcomeMessageProps) {
  return (
    <div className="text-center py-12 animate-fade-in">
      <div className="p-4 rounded-full bg-gradient-to-r from-emerald-100 to-green-100 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <BrainCircuit className="w-8 h-8 text-emerald-600" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-neutral-300 max-w-md mx-auto">
        {description}
      </p>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="p-3 text-left bg-neutral-700/30 backdrop-blur-sm border border-neutral-600/40 rounded-lg hover:bg-neutral-600/40 transition-all duration-200 text-neutral-200 text-sm"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}
