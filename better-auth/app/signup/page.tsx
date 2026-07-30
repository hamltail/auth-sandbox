"use client";

import { SubmitEvent, useState } from "react";
import { useRouter } from "next/navigation";

import Container from "@/components/Container";
import { authClient } from "@/app/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");
    const passwordConfirmation = String(
      formData.get("passwordConfirmation") ?? "",
    );

    if (password !== passwordConfirmation) {
      setErrorMessage("パスワードが一致しません。");
      setIsSubmitting(false);
      return;
    }

    const { data, error } = await authClient.signUp.email({
      name,
      email,
      password,
    });

    if (error) {
      setErrorMessage(error.message ?? "ユーザー登録に失敗しました。");
      setIsSubmitting(false);
      return;
    }

    router.push(`/users/${data.user.id}`);
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

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium">
                Name
              </label>

              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                // required
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
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
                // required
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
                autoComplete="new-password"
                // minLength={8}
                // required
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
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
                // minLength={8}
                // required
                className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="font-en inline-flex min-h-12 w-full items-center justify-center rounded-full bg-cyan-500 px-6 text-lg font-semibold text-white transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "Creating..." : "Create account"}
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}
