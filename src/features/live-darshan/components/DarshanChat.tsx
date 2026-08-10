import { Send } from "lucide-react";
import { motion } from "framer-motion";

interface ChatMessage {
  user: string;
  message: string;
  time: string;
}

interface DarshanChatProps {
  messages: ChatMessage[];
  chatInput: string;
  setChatInput: (val: string) => void;
  onSendMessage: (e: React.FormEvent) => void;
}

export function DarshanChat({
  messages,
  chatInput,
  setChatInput,
  onSendMessage,
}: DarshanChatProps) {
  return (
    <div
      style={{
        flex: 1, padding: 24, borderRadius: 24,
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <p style={{ fontSize: 12, color: 'var(--accent-gold)', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
        Live Chat
      </p>
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 220, maxHeight: 300 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: 10 }}>
            <div
              style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'var(--accent-saffron-light)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, color: 'var(--accent-saffron)', fontWeight: 600, flexShrink: 0,
              }}
            >
              {msg.user.charAt(0)}
            </div>
            <div>
              <p style={{ fontSize: 12, margin: 0 }}>
                <span style={{ color: 'var(--accent-saffron)', fontWeight: 600 }}>{msg.user}</span>
                <span style={{ color: 'var(--text-faint)', marginLeft: 8, fontSize: 11 }}>{msg.time}</span>
              </p>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '4px 0 0', lineHeight: 1.5 }}>
                {msg.message}
              </p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={onSendMessage} style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <input
          placeholder="Send 🙏..."
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          className="input"
          style={{ flex: 1, height: 42, borderRadius: 100, fontSize: 14, padding: '0 18px' }}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            width: 42, height: 42, borderRadius: '50%',
            background: 'var(--accent-saffron)', border: 'none',
            cursor: 'pointer', color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(245,124,0,0.2)',
          }}
        >
          <Send size={15} />
        </motion.button>
      </form>
    </div>
  );
}
export default DarshanChat;
