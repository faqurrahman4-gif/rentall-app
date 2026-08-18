import { Check } from "lucide-react";
import type { BookingStatus } from "../../types";
import { cn, formatDate } from "../../lib/utils";

const steps: { key: BookingStatus; label: string }[] = [
  { key: "requested", label: "Diminta" },
  { key: "confirmed", label: "Dikonfirmasi" },
  { key: "ongoing", label: "Sedang Disewa" },
  { key: "returned", label: "Dikembalikan" },
];

const statusOrder: BookingStatus[] = [
  "requested",
  "confirmed",
  "ongoing",
  "returned",
];

interface TrackingTimelineProps {
  status: BookingStatus;
  createdAt: string;
  dates?: { label: string; date: string }[];
}

export default function TrackingTimeline({
  status,
  createdAt,
  dates = [],
}: TrackingTimelineProps) {
  const currentIndex = statusOrder.indexOf(status);
  const isCancelled = status === "cancelled";

  if (isCancelled) {
    return (
      <div className="rounded-card border border-border bg-red-50 p-4 text-center">
        <p className="text-sm font-semibold text-error">
          Pesanan Dibatalkan
        </p>
        <p className="mt-1 text-xs text-muted">
          Dibatalkan pada {formatDate(createdAt)}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-card border border-border bg-card p-4">
      <h3 className="mb-4 text-sm font-bold text-ink">Status Sewa</h3>
      <div className="relative">
        {steps.map((step, i) => {
          const done = i <= currentIndex;
          const isLast = i === steps.length - 1;
          const stepDate = dates[i];

          return (
            <div key={step.key} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-7 w-7 items-center justify-center rounded-full transition-colors",
                    done
                      ? "bg-primary text-white"
                      : "border-2 border-border bg-card text-muted"
                  )}
                >
                  {done ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    <span className="text-[10px] font-bold">{i + 1}</span>
                  )}
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "my-1 w-0.5 flex-1",
                      i < currentIndex ? "bg-primary" : "bg-border"
                    )}
                    style={{ minHeight: 28 }}
                  />
                )}
              </div>
              <div className={isLast ? "pb-0" : "pb-6"}>
                <p
                  className={cn(
                    "text-sm font-semibold",
                    done ? "text-ink" : "text-muted"
                  )}
                >
                  {step.label}
                </p>
                {stepDate && (
                  <p className="mt-0.5 text-xs text-muted">
                    {formatDate(stepDate.date)}
                  </p>
                )}
                {!stepDate && i === 0 && (
                  <p className="mt-0.5 text-xs text-muted">
                    {formatDate(createdAt)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
