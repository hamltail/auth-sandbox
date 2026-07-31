"use client";

import { SubmitEvent, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

import Container from "@/components/Container";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) {
      setErrorMessage(
        "メールアドレスまたはパスワードが正しくありません。",
      );
      setIsSubmitting(false);
      return;
    }

    window.location.assign("/");
  }

  return (
    <section className="px-7 py-12 md:px-11 xl:px-0">
      <Container>
        <div className="mx-auto max-w-md">
          <h1 className="font-en text-4xl font-bold">Log in</h1>

          <p className="mt-3 text-gray-600">
            Log in to your account.
          </p>

          {errorMessage && (
            <div
              role="alert"
              className="mt-6 whitespace-pre-line rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="font-en inline-flex min-h-12 w-full items-center justify-center rounded-full bg-fuchsia-500 px-6 text-lg font-semibold text-white transition hover:bg-fuchsia-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            New user?{" "}
            <Link
              href="/signup"
              className="font-medium text-fuchsia-600 transition hover:text-fuchsia-700"
            >
              Sign up now!
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
