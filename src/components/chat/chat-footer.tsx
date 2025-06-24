import React from 'react';
interface ChatFooterProps {
  text: string;
  repoUrl?: string;
}

export default function ChatFooter({ text, repoUrl }: ChatFooterProps) {
  return (
    <div className="text-center mt-6 text-neutral-400 text-sm">
      <p>{text}</p>
      {repoUrl && (
        <p className="mt-2">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-300 transition-colors underline"
          >
            View Source Code on GitHub
          </a>
        </p>
      )}
    </div>
  );
}
