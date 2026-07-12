'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessage {
  id: number;
  name: string;
  msg: string;
  avatarColor: string;
}

export function LiveChat() {
  const [chatMessage, setChatMessage] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, name: "Priya S.", msg: "🙏 Har Har Mahadev", avatarColor: "from-[#F97316] to-[#B03405]" },
    { id: 2, name: "Rahul K.", msg: "So peaceful watching this morning aarti 🪔", avatarColor: "from-[#C09E3E] to-[#987823]" },
    { id: 3, name: "Anita M.", msg: "Om Namah Shivaya 🕉️", avatarColor: "from-[#540D15] to-[#761821]" },
    { id: 4, name: "Suresh R.", msg: "Blessed to witness this darshan today.", avatarColor: "from-[#D84B16] to-[#F97316]" },
    { id: 5, name: "Meera P.", msg: "Jay Shri Ram 🙏", avatarColor: "from-[#C09E3E] to-[#DFC06C]" },
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Simulate incoming live comments
  useEffect(() => {
    const mockComments = [
      "Jai Bholenath! 🌸",
      "Om Shanti Shanti Om 🕉️",
      "Very clear feed, thank you Ramanayam team! 🙏",
      "Har Har Gange! 💧",
      "Om Namah Shivaya",
      "Alankar looking divine today. 🪔",
      "Blessed morning! ✨",
      "What are the next aarti timings?"
    ];
    
    const mockNames = ["Vikram S.", "Kavita J.", "Amit P.", "Rohan D.", "Sneha T.", "Mohan G.", "Radha K."];
    const mockGradients = [
      "from-[#F97316] to-[#B03405]",
      "from-[#C09E3E] to-[#987823]",
      "from-[#540D15] to-[#761821]",
      "from-[#D84B16] to-[#F97316]"
    ];

    const interval = setInterval(() => {
      const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
      const randomComment = mockComments[Math.floor(Math.random() * mockComments.length)];
      const randomGrad = mockGradients[Math.floor(Math.random() * mockGradients.length)];
      
      const newMsg: ChatMessage = {
        id: Date.now(),
        name: randomName,
        msg: randomComment,
        avatarColor: randomGrad
      };

      setMessages(prev => [...prev.slice(-40), newMsg]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const newMsg: ChatMessage = {
      id: Date.now(),
      name: "You (Devotee)",
      msg: chatMessage,
      avatarColor: "from-[#F97316] to-[#C09E3E]"
    };

    setMessages(prev => [...prev, newMsg]);
    setChatMessage("");
  };

  const handleQuickEmoji = (emoji: string) => {
    const newMsg: ChatMessage = {
      id: Date.now(),
      name: "You (Devotee)",
      msg: emoji,
      avatarColor: "from-[#F97316] to-[#C09E3E]"
    };
    setMessages(prev => [...prev, newMsg]);
  };

  return (
    <div className="w-full h-[650px] rounded-2xl flex flex-col justify-between overflow-hidden shadow-2xl relative liquid-glass">
      
      {/* Sticky Header */}
      <div className="p-4 border-b border-white/5 bg-[#1B1036]/40 backdrop-blur-md flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <MessageCircle className="w-4 h-4 text-[#F97316] animate-pulse" />
          <h3 className="text-white text-xs font-bold uppercase tracking-wider">Sacred Chat</h3>
        </div>
        <span className="text-[9px] bg-green-500/10 text-green-400 border border-green-500/20 px-2.5 py-1 rounded-md font-bold uppercase tracking-wider flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse" />
          Online
        </span>
      </div>

      {/* Feed Area with smooth upward motion transition */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin bg-transparent"
      >
        <AnimatePresence initial={false}>
          {messages.map((chat) => (
            <motion.div 
              key={chat.id} 
              initial={{ opacity: 0, y: 15, scale: 0.98, filter: "blur(3px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex gap-3 items-start"
            >
              {/* Avatar */}
              <div className={cn(
                "w-9 h-9 rounded-full bg-linear-to-br flex items-center justify-center text-[10px] text-white font-bold shrink-0 border border-white/10 select-none shadow-sm",
                chat.avatarColor
              )}>
                {chat.name[0]}
              </div>
              
              {/* Message Box (Liquid glass bubble) */}
              <div className={cn(
                "flex flex-col min-w-0 border rounded-2xl rounded-tl-none px-4 py-2.5 shadow-sm max-w-[80%]",
                chat.name.startsWith("You") 
                  ? "bg-[#F97316]/12 border-[#F97316]/25 text-white"
                  : "bg-white/3 border-white/5 text-white"
              )}>
                <span className="text-[#C8C8D5] text-[9px] font-bold uppercase tracking-wider mb-0.5">
                  {chat.name}
                </span>
                <p className="text-white text-xs leading-relaxed wrap-break-word">{chat.msg}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Emoji Row */}
      <div className="px-4 py-2 bg-[#1B1036]/40 border-t border-white/5 flex justify-between gap-1 z-10 backdrop-blur-md">
        {["🙏", "🪔", "🕉️", "✨", "❤️"].map((emoji) => (
          <motion.button
            key={emoji}
            whileHover={{ scale: 1.15, y: -2 }}
            whileTap={{ scale: 0.85 }}
            onClick={() => handleQuickEmoji(emoji)}
            className="w-9 h-9 rounded-lg hover:bg-white/5 text-base flex items-center justify-center cursor-pointer transition-colors"
            title={`Send ${emoji}`}
          >
            {emoji}
          </motion.button>
        ))}
      </div>

      {/* Sticky Bottom Form (Liquid Glass inputs) */}
      <form 
        onSubmit={handleSendMessage} 
        className="p-3.5 border-t border-white/5 bg-[#1B1036]/40 z-10 backdrop-blur-md"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-white/3 border border-white/8 rounded-xl text-xs text-white placeholder:text-[#C8C8D5]/40 focus:outline-none focus:border-[#F97316]/50 focus:bg-white/5 transition-all"
          />
          <motion.button 
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-[#F97316] text-white rounded-xl hover:bg-[#F97316]/90 transition-colors flex items-center justify-center cursor-pointer shrink-0 shadow-md shadow-[#F97316]/20 border border-white/10"
            aria-label="Send message"
          >
            <Send className="w-3.5 h-3.5" />
          </motion.button>
        </div>
      </form>
    </div>
  );
}
