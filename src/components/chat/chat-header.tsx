interface ChatHeaderProps {
  title: string;
  subtitle: string;
}

export default function ChatHeader({ title, subtitle }: ChatHeaderProps) {
  return (
    <div className="text-center mb-4 animate-fade-in">
      <h1 className="text-4xl font-bold text-white mb-2">{title}</h1>
      <p className="text-neutral-300 text-lg">{subtitle}</p>
    </div>
  );
}
