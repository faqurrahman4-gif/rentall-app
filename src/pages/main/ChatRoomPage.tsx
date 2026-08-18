import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import ChatBubble from "../../components/chat/ChatBubble";
import ChatInput from "../../components/chat/ChatInput";
import { mockMessages, mockConversations } from "../../lib/mockData";
import type { Message } from "../../types";

const CURRENT_USER_ID = "u1";

export default function ChatRoomPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const endRef = useRef<HTMLDivElement>(null);

  const conversation = mockConversations.find((c) => c.id === id);
  const otherName = conversation?.name ?? "Percakapan";

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handleSend(content: string) {
    const newMsg: Message = {
      id: `m${Date.now()}`,
      sender_id: CURRENT_USER_ID,
      receiver_id: id ?? "",
      item_id: null,
      content,
      created_at: new Date().toISOString(),
    };
    setMessages((m) => [...m, newMsg]);
  }

  return (
    <div className="flex h-screen flex-col">
      <header className="sticky top-0 z-40 flex h-14 items-center gap-2 border-b border-border bg-card/95 px-2 backdrop-blur-lg">
        <button
          onClick={() => navigate(-1)}
          className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-bg"
        >
          <ChevronLeft size={22} className="text-ink" />
        </button>
        <img
          src={conversation?.avatar_url ?? ""}
          alt={otherName}
          className="h-8 w-8 rounded-full object-cover"
        />
        <div className="flex-1">
          <p className="text-sm font-bold text-ink">{otherName}</p>
          {conversation?.item_name && (
            <p className="text-xs text-primary">{conversation.item_name}</p>
          )}
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto bg-bg px-4 py-4">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            content={msg.content}
            time={msg.created_at}
            isMe={msg.sender_id === CURRENT_USER_ID}
          />
        ))}
        <div ref={endRef} />
      </div>

      <ChatInput onSend={handleSend} />
    </div>
  );
}
