"use client";

import Link from "next/link";
import AuthMascot from "./AuthMascot";
import type { ReactNode } from "react";

type Mood = "curious" | "shy" | "sad" | "happy";

export default function AuthCard({ title, subtitle, mood, error, children, footer }: { title: string; subtitle: string; mood: Mood; error: string; children: ReactNode; footer: { href: string; prompt: string; action: string } }) {
  return <main className="auth-page"><div className="auth-page__orb auth-page__orb--one" /><div className="auth-page__orb auth-page__orb--two" />
    <section className="auth-wrap"><AuthMascot mood={mood} /><div className="auth-card"><div className="auth-card__heading"><p className="auth-card__eyebrow">FOX &amp; FERN</p><h1>{title}</h1><p>{subtitle}</p></div>
      {error && <p className="auth-error" role="alert">{error}</p>}{children}<p className="auth-card__footer">{footer.prompt} <Link href={footer.href}>{footer.action}</Link></p>
    </div></section>
  </main>;
}
