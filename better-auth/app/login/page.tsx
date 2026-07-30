"use client";

import { SubmitEvent, useState } from "react";
import Link from "next/link";

import { authClient } from "@/app/lib/auth-client";
import Container from "@/components/Container";

export default function LoginPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const { error } = await authClient.signIn.email({
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message ?? "ログインに失敗しました。");
      setIsSubmitting(false);
      return;
    }

    window.location.assign("/");
  }

  async function handleGoogleLogin() {
    setErrorMessage("");
    setIsSubmitting(true);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });

    if (error) {
      setErrorMessage(error.message ?? "Googleログインに失敗しました。");
      setIsSubmitting(false);
    }
  }

  return (
    <section className="px-7 py-12 md:px-11 xl:px-0">
      <Container>
        <div className="mx-auto max-w-md">
          <h1 className="font-en text-4xl font-bold">Log in</h1>

          <p className="mt-3 text-gray-600">Log in to your account.</p>

          {errorMessage && (
            <div
              role="alert"
              className="mt-6 whitespace-pre-line rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errorMessage}
            </div>
          )}

          <div className="mt-8">
            <button
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting}
              className="font-en inline-flex min-h-12 w-full items-center justify-center rounded-full border border-gray-300 bg-white px-6 text-lg font-semibold transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Redirecting..." : "Continue with Google"}
            </button>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-300" />
              <span className="text-sm text-gray-500">OR</span>
              <div className="h-px flex-1 bg-gray-300" />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
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
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="font-en inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cyan-500 px-6 text-lg font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Logging in..." : "Log in"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            New user?{" "}
            <Link
              href="/signup"
              className="font-medium text-cyan-600 transition hover:text-cyan-700"
            >
              Sign up now!
            </Link>
          </p>
        </div>
      </Container>
    </section>
  );
}
