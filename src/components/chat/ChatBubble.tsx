import { cn, formatTime } from "../../lib/utils";

interface ChatBubbleProps {
  content: string;
  time: string;
  isMe: boolean;
}

export default function ChatBubble({ content, time, isMe }: ChatBubbleProps) {
  return (
    <div
      className={cn(
        "flex w-full animate-fade-in",
        isMe ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[75%] rounded-2xl px-3.5 py-2.5",
          isMe
            ? "rounded-br-md bg-primary text-white"
            : "rounded-bl-md bg-primary-light text-ink"
        )}
      >
        <p className="text-sm leading-relaxed">{content}</p>
        <p
          className={cn(
            "mt-1 text-[10px]",
            isMe ? "text-white/60" : "text-muted"
          )}
        >
          {formatTime(time)}
        </p>
      </div>
    </div>
  );
}
