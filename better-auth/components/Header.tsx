import { headers } from "next/headers";
import Link from "next/link";

import { auth } from "@/app/lib/auth";

import Container from "./Container";
import LogoutButton from "./LogoutButton";

const navigationItems = [
  { label: "Home", href: "/" },
  { label: "Help", href: "/help" },
];

export default async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="border-b border-gray-200 px-7 md:px-11 xl:px-0">
      <Container>
        <div className="flex min-h-16 items-center justify-between gap-6">
          <Link
            href="/"
            className="font-en text-2xl font-semibold tracking-wide"
          >
            Better Auth Sandbox
          </Link>

          <nav aria-label="メインナビゲーション">
            <ul className="font-en flex items-center gap-4 text-lg md:gap-8">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="transition-opacity hover:opacity-60"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}

              {session ? (
                <>
                  <li>
                    <Link
                      href={`/users/${session.user.id}`}
                      className="transition-opacity hover:opacity-60"
                    >
                      {session.user.name}
                    </Link>
                  </li>

                  <li>
                    <LogoutButton />
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      href="/login"
                      className="transition-opacity hover:opacity-60"
                    >
                      Log in
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="/signup"
                      className="inline-flex min-h-10 items-center justify-center rounded-full bg-cyan-500 px-5 text-base font-semibold text-white transition hover:bg-cyan-600"
                    >
                      Sign up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
