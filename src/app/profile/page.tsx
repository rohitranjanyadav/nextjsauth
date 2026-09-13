"use client";

import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type UserDetails = {
  username: string;
  email: string;
};

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = React.useState<UserDetails | null>(null);
  const [showEmail, setShowEmail] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const getUserDetails = async () => {
      try {
        const response = await axios.get("/api/users/me");
        setUser(response.data.data);
      } catch {
        setError("We could not find your woodland profile.");
      } finally {
        setLoading(false);
      }
    };

    getUserDetails();
  }, []);

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch {
      setError("We could not log you out right now.");
    }
  };

  return (
    <main className="profile-page">
      <div className="profile-page__leaf profile-page__leaf--one" />
      <div className="profile-page__leaf profile-page__leaf--two" />
      <section className="profile-card" aria-labelledby="profile-title">
        <p className="profile-card__eyebrow">FOX &amp; FERN</p>
        <div className="profile-card__avatar" aria-hidden="true">
          {user?.username?.charAt(0).toUpperCase() ?? "?"}
        </div>
        <p className="profile-card__kicker">Your woodland profile</p>
        <h1 id="profile-title">
          {loading ? "Gathering your den..." : user?.username ?? "Welcome back"}
        </h1>

        {error && <p className="profile-card__error">{error}</p>}

        {!loading && user && (
          <div className={`profile-detail ${showEmail ? "profile-detail--open" : ""}`}>
            <button
              className="profile-detail__toggle"
              type="button"
              aria-expanded={showEmail}
              onClick={() => setShowEmail((visible) => !visible)}
            >
              <span>{showEmail ? "Hide email" : "Show email"}</span>
              <span aria-hidden="true">{showEmail ? "↑" : "↓"}</span>
            </button>
            {showEmail && <p className="profile-detail__email">{user.email}</p>}
          </div>
        )}

        <button className="profile-card__logout" type="button" onClick={logout}>
          <span>Log out</span>
          <span aria-hidden="true">↗</span>
        </button>
      </section>
    </main>
  );
}
