import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (content: string) => void;
}

export default function ChatInput({ onSend }: ChatInputProps) {
  const [text, setText] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t border-border bg-card p-3 nav-safe-bottom"
    >
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Ketik pesan..."
        className="flex-1 rounded-full border border-border bg-bg px-4 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white transition-all active:scale-90 disabled:opacity-40"
      >
        <Send size={18} />
      </button>
    </form>
  );
}
