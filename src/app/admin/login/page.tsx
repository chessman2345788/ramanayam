"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuthStore } from "@/store/auth";
import { Lock, Mail, ShieldCheck, AlertCircle, Loader2, KeyRound } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const returnUrl = searchParams.get("returnUrl") || "/admin";
  const sessionExpired = searchParams.get("sessionExpired") === "true";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { login, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const user = await login({ email, password, rememberMe });
      if (user && user.role !== "ADMIN") {
        setErrorMessage("Access Denied: Your account does not have Admin Portal permissions.");
        return;
      }
      router.push(decodeURIComponent(returnUrl));
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 401) {
        setErrorMessage("Invalid credentials. Please verify your email and password.");
      } else if (status === 403) {
        setErrorMessage("Access Forbidden: Your account is disabled or lacks admin privileges.");
      } else if (status === 429) {
        setErrorMessage("Too many login attempts. Please wait a few minutes and try again.");
      } else if (status >= 500) {
        setErrorMessage("Server error encountered. Please try again later.");
      } else if (err.message && err.message.includes("Network")) {
        setErrorMessage("Network error: Unable to reach the authentication server.");
      } else {
        setErrorMessage(err.message || "Authentication failed. Please try again.");
      }
    }
  };

  return (
    <div className="bg-white/90 backdrop-blur-md py-8 px-6 sm:px-10 shadow-2xl border border-stone-200/80 rounded-2xl">
      {sessionExpired && (
        <div className="mb-6 p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs font-medium text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>Your session has expired. Please sign in again to access the portal.</span>
        </div>
      )}

      {errorMessage && (
        <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-medium text-red-800 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-semibold text-stone-800 mb-1.5">
            Admin Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@ramayanam.in"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-stone-50/80 border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-stone-800 mb-1.5">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full pl-10 pr-3.5 py-2.5 text-xs bg-stone-50/80 border border-stone-300 rounded-xl text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500 border-stone-300 accent-amber-600"
            />
            <span className="text-xs text-stone-600 font-medium">Remember this browser</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-linear-to-r from-amber-700 via-amber-800 to-stone-900 hover:from-amber-800 hover:to-black text-white text-xs font-semibold rounded-xl shadow-lg shadow-amber-900/15 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <KeyRound className="w-4 h-4 text-amber-400" />
              <span>Sign In to Admin Portal</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F3] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 selection:bg-amber-500/15">
      <div className="w-full max-w-md mx-auto text-center space-y-2">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-900 text-amber-400 shadow-lg shadow-amber-950/20 mb-2 border border-amber-800/40">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
          Ramanayam Executive Portal
        </h1>
        <p className="text-xs text-stone-600 font-medium">
          Sign in to access temple management, live catalogue, and orders.
        </p>
      </div>

      <div className="mt-8 w-full max-w-md mx-auto">
        <Suspense
          fallback={
            <div className="bg-white/90 py-8 px-6 shadow-xl border border-stone-200/80 rounded-2xl flex flex-col items-center justify-center text-center">
              <Loader2 className="w-6 h-6 text-amber-600 animate-spin mb-2" />
              <span className="text-xs text-stone-500 font-semibold">Loading portal...</span>
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
