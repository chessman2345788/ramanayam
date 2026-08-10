import { useState } from "react";
import type { LiveDarshan } from "@/types/products";

interface ChatMessage {
  user: string;
  message: string;
  time: string;
}

export function useLiveDarshan(initialStream: LiveDarshan) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { user: 'Priya S.', message: 'Har Har Mahadev 🙏', time: '2m ago' },
    { user: 'Rajesh K.', message: 'Beautiful darshan! So peaceful', time: '3m ago' },
    { user: 'Ananya P.', message: 'Om Namah Shivaya 🙏🙏', time: '5m ago' },
    { user: 'Suresh R.', message: 'Blessed to witness this live', time: '6m ago' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [imgError, setImgError] = useState(false);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMessage: ChatMessage = {
      user: 'You',
      message: chatInput,
      time: 'Just now',
    };

    setMessages((prev) => [newMessage, ...prev]);
    setChatInput('');
  };

  return {
    messages,
    chatInput,
    imgError,
    setChatInput,
    setImgError,
    handleSendMessage,
  };
}
export default useLiveDarshan;
