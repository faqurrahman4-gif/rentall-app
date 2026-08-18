import { useNavigate } from "react-router-dom";
import TopNav from "../../components/ui/TopNav";
import { mockConversations } from "../../lib/mockData";

export default function InboxPage() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in">
      <TopNav title="Pesan" />

      <div className="divide-y divide-border">
        {mockConversations.map((c) => (
          <button
            key={c.id}
            onClick={() => navigate(`/inbox/${c.id}`)}
            className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-bg active:bg-bg"
          >
            <img
              src={c.avatar_url ?? ""}
              alt={c.name}
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-primary-light"
            />
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-ink">{c.name}</p>
                <span className="text-xs text-muted">{c.last_time}</span>
              </div>
              {c.item_name && (
                <p className="text-xs font-medium text-primary">{c.item_name}</p>
              )}
              <p className="truncate text-sm text-muted">{c.last_message}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
