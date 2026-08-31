"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setError("Verification token is missing.");
      setLoading(false);
      return;
    }

    const verifyUserEmail = async () => {
      try {
        setLoading(true);
        setError(null);

        await axios.post("/api/users/verifyemail", { token });

        setVerified(true);
      } catch (err: unknown) {
        console.error(
          err instanceof Error ? err.message : "Something went wrong",
        );

        setError(
          "Unable to verify your email. The link may be invalid or expired.",
        );
        setVerified(false);
      } finally {
        setLoading(false);
      }
    };

    verifyUserEmail();
  }, [token]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md text-center">
        <h1 className="mb-6 text-4xl font-bold">Verify Email</h1>

        {loading && (
          <div className="space-y-3">
            <p className="text-lg text-gray-600">
              Verifying your email address...
            </p>
          </div>
        )}

        {!loading && verified && (
          <div className="rounded-lg border border-green-200 bg-green-50 p-6">
            <h2 className="mb-2 text-2xl font-semibold text-green-700">
              Email Verified
            </h2>

            <p className="mb-4 text-gray-700">
              Your email address has been successfully verified.
            </p>

            <Link
              href="/login"
              className="inline-block rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white transition hover:bg-blue-700"
            >
              Continue to Login
            </Link>
          </div>
        )}

        {!loading && error && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-6">
            <h2 className="mb-2 text-2xl font-semibold text-red-700">
              Verification Failed
            </h2>

            <p className="text-gray-700">{error}</p>
          </div>
        )}
      </div>
    </main>
  );
}
