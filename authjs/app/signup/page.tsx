"use client";

import { SubmitEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

import Container from "@/components/Container";

export default function SignupPage() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirmation = formData.get("passwordConfirmation");

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          passwordConfirmation,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let message = data.message ?? "ユーザー登録に失敗しました。";

        if (Array.isArray(data.errors) && data.errors.length > 0) {
          message = data.errors
            .map((error: { message: string }) => error.message)
            .join("\n");
        }

        setErrorMessage(message);
        return;
      }

      const signInResult = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInResult?.error) {
        setErrorMessage(
          "ユーザー登録には成功しましたが、自動ログインに失敗しました。ログイン画面からログインしてください。",
        );

        router.push("/login");
        return;
      }

      router.push(`/users/${data.id}`);
      router.refresh();
    } catch {
      setErrorMessage(
        "通信エラーが発生しました。時間をおいて再度お試しください。",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleGoogleLogin() {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      await signIn("google", {
        redirectTo: "/",
      });
    } catch {
      setErrorMessage("Googleアカウントでの登録に失敗しました。");
      setIsSubmitting(false);
    }
  }

  return (
    <section className="px-7 py-12 md:px-11 xl:px-0">
      <Container>
        <div className="mx-auto max-w-md">
          <h1 className="font-en text-4xl font-bold">Sign up</h1>

          <p className="mt-3 text-gray-600">Create your account.</p>

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
              {isSubmitting ? "Redirecting..." : "Sign up with Google"}
            </button>

            <div className="my-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-gray-300" />

              <span className="text-sm text-gray-500">OR</span>

              <div className="h-px flex-1 bg-gray-300" />
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
              />
            </div>

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
                autoComplete="new-password"
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
              />
            </div>

            <div>
              <label
                htmlFor="passwordConfirmation"
                className="block text-sm font-medium"
              >
                Confirm password
              </label>

              <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                autoComplete="new-password"
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="font-en inline-flex min-h-12 w-full items-center justify-center rounded-full bg-fuchsia-500 px-6 text-lg font-semibold text-white transition hover:bg-fuchsia-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating..." : "Create account"}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
