interface ChatFooterProps {
  text: string;
}

export default function ChatFooter({ text }: ChatFooterProps) {
  return (
    <div className="text-center mt-6 text-neutral-400 text-sm">
      <p>{text}</p>
    </div>
  );
}
