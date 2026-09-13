"use client";

import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import AuthCard from "../components/AuthCard";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = React.useState(false);
  const [activeField, setActiveField] = React.useState<"password" | null>(null);
  const [error, setError] = React.useState("");
  const isFormValid = Boolean(user.username && user.email && user.password);
  const mood = error ? "sad" : activeField === "password" ? "shy" : user.username ? "happy" : "curious";

  const onSignup = async () => {
    if (!isFormValid) return;
    setError("");
    try {
      setLoading(true);
      await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch {
      setError("That trail is already taken. Try a different email or name.");
    } finally { setLoading(false); }
  };

  return <AuthCard title="Join the woodland" subtitle="A cozy corner is waiting for you." mood={mood} error={error} footer={{ href: "/login", prompt: "Already have a den?", action: "Log in" }}>
    <form className="auth-form" onSubmit={(event) => { event.preventDefault(); onSignup(); }}>
      <label htmlFor="username">Your name</label>
      <input id="username" type="text" autoComplete="username" placeholder="Clover" value={user.username} onChange={(e) => { setUser({ ...user, username: e.target.value }); setError(""); }} />
      <label htmlFor="email">Email address</label>
      <input id="email" type="email" autoComplete="email" placeholder="you@forest.com" value={user.email} onChange={(e) => { setUser({ ...user, email: e.target.value }); setError(""); }} />
      <label htmlFor="password">Choose a password</label>
      <input id="password" type="password" autoComplete="new-password" placeholder="••••••••" value={user.password} onFocus={() => setActiveField("password")} onBlur={() => setActiveField(null)} onChange={(e) => { setUser({ ...user, password: e.target.value }); setError(""); }} />
      <button className="auth-submit" type="submit" disabled={!isFormValid || loading}>{loading ? "Planting your seed…" : "Create my den"}<span>→</span></button>
    </form>
  </AuthCard>;
}
