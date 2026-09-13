"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AuthCard from "../components/AuthCard";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({ email: "", password: "" });
  const [loading, setLoading] = React.useState(false);
  const [activeField, setActiveField] = React.useState<"email" | "password" | null>(null);
  const [error, setError] = React.useState("");
  const isFormValid = user.email.length > 0 && user.password.length > 0;
  const mood = error ? "sad" : activeField === "password" ? "shy" : "curious";

  const onLogin = async () => {
    if (!isFormValid) return;
    setError("");
    try {
      setLoading(true);
      await axios.post("/api/users/login", user);
      router.push("/profile");
    } catch {
      setError("Oh no — that email and password don’t seem to match.");
    } finally { setLoading(false); }
  };

  return <AuthCard title="Welcome back" subtitle="Your little den has missed you." mood={mood} error={error} footer={{ href: "/signup", prompt: "New around the forest?", action: "Make an account" }}>
    <form className="auth-form" onSubmit={(event) => { event.preventDefault(); onLogin(); }}>
      <label htmlFor="email">Email address</label>
      <input id="email" type="email" autoComplete="email" placeholder="you@forest.com" value={user.email} onFocus={() => setActiveField("email")} onBlur={() => setActiveField(null)} onChange={(e) => { setUser({ ...user, email: e.target.value }); setError(""); }} />
      <label htmlFor="password">Password</label>
      <input id="password" type="password" autoComplete="current-password" placeholder="••••••••" value={user.password} onFocus={() => setActiveField("password")} onBlur={() => setActiveField(null)} onChange={(e) => { setUser({ ...user, password: e.target.value }); setError(""); }} />
      <button className="auth-submit" type="submit" disabled={!isFormValid || loading}>{loading ? "Finding your den…" : "Come on in"}<span>→</span></button>
    </form>
  </AuthCard>;
}
