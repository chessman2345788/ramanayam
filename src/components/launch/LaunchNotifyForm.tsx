"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

type FormState = "idle" | "submitting" | "success" | "error";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * VIP Email Subscription Form for Ramanayam Launching Soon.
 * Premium Dark Glassmorphism style with gold accent borders & saffron action button.
 */
export function LaunchNotifyForm() {
  const [email, setEmail] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const validateEmail = (value: string): boolean => {
    if (!value.trim()) {
      setErrorMessage("Please enter your email address");
      return false;
    }
    if (!EMAIL_REGEX.test(value.trim())) {
      setErrorMessage("Please enter a valid email address");
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setFormState("error");
      inputRef.current?.focus();
      return;
    }

    setFormState("submitting");

    // Simulate API delay (UI-only for now; ready for backend fetch endpoint)
    await new Promise((resolve) => setTimeout(resolve, 800));

    setFormState("success");
  };

  // --- Success state ---
  if (formState === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: "center",
          padding: "20px 0",
        }}
      >
        {/* Diya icon */}
        <div
          style={{
            fontSize: 32,
            marginBottom: 12,
            lineHeight: 1,
            filter: "drop-shadow(0 0 12px rgba(232, 102, 10, 0.6))",
          }}
        >
          🪔
        </div>
        <p
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: "clamp(20px, 3vw, 24px)",
            fontWeight: 500,
            fontStyle: "italic",
            color: "#FAF8F5",
            marginBottom: 6,
          }}
        >
          You&rsquo;ll Be The First To Know
        </p>
        <p
          style={{
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 13,
            color: "rgba(245, 230, 208, 0.65)",
          }}
        >
          We will send you a private invitation when Ramanayam launches.
        </p>
      </motion.div>
    );
  }

  // --- Form ---
  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      noValidate
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        width: "100%",
        maxWidth: 460,
      }}
    >
      <label
        htmlFor="launch-notify-email"
        style={{
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: 11,
          fontWeight: 600,
          color: "rgba(212, 175, 55, 0.7)",
          textTransform: "uppercase" as const,
          letterSpacing: "0.2em",
          marginBottom: 2,
        }}
      >
        Receive VIP Launch Invitation
      </label>

      <div
        style={{
          display: "flex",
          width: "100%",
          gap: 0,
          borderRadius: 999,
          overflow: "hidden",
          border: `1px solid ${
            formState === "error"
              ? "rgba(239, 68, 68, 0.6)"
              : "rgba(212, 175, 55, 0.3)"
          }`,
          background: "rgba(255, 255, 255, 0.04)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
          transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        }}
      >
        <input
          ref={inputRef}
          id="launch-notify-email"
          type="email"
          required
          autoComplete="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (formState === "error") {
              setFormState("idle");
              setErrorMessage("");
            }
          }}
          disabled={formState === "submitting"}
          style={{
            flex: 1,
            padding: "16px 24px",
            background: "transparent",
            border: "none",
            outline: "none",
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 14,
            color: "#FAF8F5",
            minWidth: 0,
          }}
          aria-describedby={errorMessage ? "launch-notify-error" : undefined}
          aria-invalid={formState === "error"}
        />

        <button
          type="submit"
          disabled={formState === "submitting"}
          style={{
            padding: "16px 30px",
            background:
              formState === "submitting"
                ? "#D4AF37"
                : "linear-gradient(135deg, #E8660A 0%, #C9570A 100%)",
            color: "#FFFFFF",
            border: "none",
            borderRadius: 999,
            fontFamily: '"DM Sans", system-ui, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
            cursor: formState === "submitting" ? "wait" : "pointer",
            transition: "all 0.25s ease",
            whiteSpace: "nowrap" as const,
            flexShrink: 0,
            margin: "4px",
            boxShadow: "0 4px 16px rgba(232, 102, 10, 0.35)",
          }}
          onMouseEnter={(e) => {
            if (formState !== "submitting") {
              e.currentTarget.style.transform = "scale(1.02)";
              e.currentTarget.style.boxShadow =
                "0 6px 20px rgba(232, 102, 10, 0.5)";
            }
          }}
          onMouseLeave={(e) => {
            if (formState !== "submitting") {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow =
                "0 4px 16px rgba(232, 102, 10, 0.35)";
            }
          }}
        >
          {formState === "submitting" ? "Sending…" : "Notify Me"}
        </button>
      </div>

      {/* Error message */}
      <AnimatePresence>
        {formState === "error" && errorMessage && (
          <motion.p
            id="launch-notify-error"
            role="alert"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              fontFamily: '"DM Sans", system-ui, sans-serif',
              fontSize: 12,
              color: "#EF4444",
              margin: 0,
            }}
          >
            {errorMessage}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.form>
  );
}
