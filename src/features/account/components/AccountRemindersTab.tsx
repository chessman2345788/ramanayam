import { BellRing } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccountRemindersTabProps {
  reminders: { [key: string]: boolean };
  toggleReminder: (festival: string) => void;
}

export function AccountRemindersTab({
  reminders,
  toggleReminder,
}: AccountRemindersTabProps) {
  const reminderItems = [
    { festival: "Ganesh Chaturthi", date: "August 27, 2026", desc: "Elephant-headed deity festival essentials setup", emoji: "🐘" },
    { festival: "Navratri", date: "October 2, 2026", desc: "9-Day Akhand Diya & Puja Samagri essentials", emoji: "🔱" },
    { festival: "Diwali", date: "October 20, 2026", desc: "Premium clay diyas, Lakshmi puja accessories", emoji: "🪔" },
  ];

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 32,
          fontWeight: 500,
          color: "var(--text-primary)",
          marginBottom: 32,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <BellRing size={24} color="var(--accent-saffron)" />
        Puja Reminders
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 540 }}>
        {reminderItems.map((r) => {
          const isSet = !!reminders[r.festival];
          return (
            <div
              key={r.festival}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                padding: 24,
                borderRadius: 20,
                border: "1px solid var(--border)",
                background: isSet ? "var(--accent-saffron-light)" : "var(--bg-card)",
                boxShadow: "var(--shadow-xs)",
              }}
            >
              <span style={{ fontSize: 32, userSelect: "none" }}>{r.emoji}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: "var(--text-primary)", margin: 0 }}>
                  {r.festival}
                </h3>
                <p style={{ fontSize: 11, fontWeight: 600, fontFamily: "var(--font-mono)", color: "var(--accent-saffron)", margin: "4px 0" }}>
                  {r.date}
                </p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {r.desc}
                </p>
              </div>
              <button
                onClick={() => toggleReminder(r.festival)}
                className={cn(
                  "btn",
                  isSet ? "btn-primary" : "btn-outline"
                )}
                style={{
                  fontSize: 10,
                  padding: "8px 16px",
                }}
              >
                {isSet ? "Active" : "Alert Me"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default AccountRemindersTab;
