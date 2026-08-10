"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, Users, Send } from "lucide-react";
import { motion } from "framer-motion";
import { LiveDarshanService } from "@/services/liveDarshan.service";
import { useLiveDarshan } from "@/features/live-darshan/hooks/useLiveDarshan";
import { DarshanStream } from "@/features/live-darshan/components/DarshanStream";

const AARTI_TIMES = [
  { name: "Mangla Aarti", time: "03:00 AM", active: false },
  { name: "Morning Aarti", time: "05:30 AM", active: true },
  { name: "Bhog Aarti", time: "11:15 AM", active: false },
  { name: "Sandhya Aarti", time: "07:00 PM", active: false },
  { name: "Shayan Aarti", time: "10:30 PM", active: false },
];

export function LiveDarshanContent() {
  const streams = LiveDarshanService.getStreams();
  const mainStream = streams[0];

  const {
    messages,
    chatInput,
    imgError,
    setChatInput,
    setImgError,
    handleSendMessage,
  } = useLiveDarshan(mainStream);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F0E8",
        paddingTop: 100,
        paddingBottom: 96,
      }}
    >
      <div style={{ maxWidth: 1540, margin: "0 auto", padding: "0 clamp(20px, 4vw, 64px)" }}>
        {/* Back link */}
        <Link
          href="/home"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "rgba(26,15,10,0.6)",
            textDecoration: "none",
            marginBottom: 24,
          }}
        >
          <ArrowLeft size={14} /> Back to Shop
        </Link>

        {/* Header matching screenshot 5 */}
        <div style={{ marginBottom: 36 }}>
          <h1
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 600,
              color: "#1A0F0A",
              margin: "0 0 12px",
              lineHeight: 1.1,
            }}
          >
            {mainStream.temple}
          </h1>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <MapPin size={14} color="#A8822A" />
              <span style={{ fontSize: 13, color: "rgba(26,15,10,0.6)" }}>
                {mainStream.location}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Users size={14} color="#A8822A" />
              <span style={{ fontSize: 13, color: "rgba(26,15,10,0.6)" }}>
                {mainStream.viewerCount.toLocaleString()} watching live
              </span>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gap: 28,
          }}
        >
          {/* Video Player + Donate Container */}
          <div className="col-span-12 lg:col-span-8">
            <div
              style={{
                aspectRatio: "16/9",
                borderRadius: 20,
                overflow: "hidden",
                border: "0.5px solid rgba(26,15,10,0.08)",
                position: "relative",
                background: "#1A1008",
                boxShadow: "0 12px 36px rgba(0,0,0,0.06)",
              }}
            >
              <DarshanStream
                mainStream={mainStream}
                imgError={imgError}
                setImgError={setImgError}
              />
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  zIndex: 10,
                  background: "rgba(0,0,0,0.5)",
                  padding: "6px 14px",
                  borderRadius: 100,
                }}
              >
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "#EF4444",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#FFFFFF",
                    letterSpacing: "0.12em",
                  }}
                >
                  LIVE
                </span>
              </div>
            </div>

            {/* Offering Strip */}
            <div
              style={{
                marginTop: 20,
                padding: "20px 24px",
                background: "#FFFFFF",
                borderRadius: 16,
                border: "0.5px solid rgba(26,15,10,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                flexWrap: "wrap",
                gap: 16,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: "#1A0F0A",
                    margin: "0 0 4px",
                  }}
                >
                  Make a Sacred Offering
                </p>
                <p
                  style={{
                    fontSize: 13,
                    color: "rgba(26,15,10,0.55)",
                    margin: 0,
                  }}
                >
                  Send authentic prasad or donate directly to the temple shrine
                </p>
              </div>
              <button
                type="button"
                style={{
                  height: 44,
                  padding: "0 28px",
                  borderRadius: 100,
                  background: "#E8660A",
                  border: "none",
                  color: "white",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(232,102,10,0.25)",
                }}
              >
                Donate ₹
              </button>
            </div>
          </div>

          {/* Sidebar matching screenshot 5 */}
          <div className="col-span-12 lg:col-span-4" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            
            {/* Today's Schedule Card matching screenshot 5 */}
            <div
              style={{
                padding: 24,
                background: "#FFFFFF",
                borderRadius: 20,
                border: "0.5px solid rgba(26,15,10,0.08)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "#A8822A",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  marginTop: 0,
                }}
              >
                TODAY'S SCHEDULE
              </p>
              {AARTI_TIMES.map(({ name, time, active }) => (
                <div
                  key={name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "12px 0",
                    borderBottom: "0.5px solid rgba(26,15,10,0.06)",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      color: active ? "#1A0F0A" : "rgba(26,15,10,0.6)",
                      fontWeight: active ? 700 : 400,
                    }}
                  >
                    {name}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      fontFamily: "monospace",
                      fontWeight: active ? 700 : 500,
                      color: active ? "#E8660A" : "rgba(26,15,10,0.45)",
                    }}
                  >
                    {time}
                  </span>
                </div>
              ))}
            </div>

            {/* Live Chat Card matching screenshot 5 */}
            <div
              style={{
                padding: 20,
                background: "#FFFFFF",
                borderRadius: 20,
                border: "0.5px solid rgba(26,15,10,0.08)",
                boxShadow: "0 4px 20px rgba(0,0,0,0.03)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <p
                style={{
                  fontSize: 11,
                  color: "#A8822A",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 16,
                  marginTop: 0,
                }}
              >
                LIVE CHAT
              </p>
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  minHeight: 180,
                  maxHeight: 240,
                  marginBottom: 16,
                }}
              >
                {messages.map((msg: any, i) => (
                  <div key={i} style={{ fontSize: 13, lineHeight: 1.5 }}>
                    <span style={{ color: "#E8660A", fontWeight: 600 }}>
                      {msg.author || msg.userName || "Devotee"}:{" "}
                    </span>
                    <span style={{ color: "rgba(26,15,10,0.8)" }}>
                      {msg.content || msg.text || msg.message || ""}
                    </span>
                  </div>
                ))}
              </div>

              <form
                onSubmit={handleSendMessage}
                style={{ display: "flex", gap: 8 }}
              >
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Send 🙏 blessings..."
                  style={{
                    flex: 1,
                    height: 40,
                    padding: "0 14px",
                    borderRadius: 100,
                    background: "#F5F0E8",
                    border: "0.5px solid rgba(26,15,10,0.12)",
                    color: "#1A0F0A",
                    fontSize: 13,
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "#E8660A",
                    border: "none",
                    cursor: "pointer",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
