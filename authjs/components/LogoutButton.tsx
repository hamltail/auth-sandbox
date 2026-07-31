"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogout() {
    setIsSubmitting(true);

    await signOut({
      redirectTo: "/",
    });
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className="font-en transition-opacity hover:opacity-60 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isSubmitting ? "Logging out..." : "Log out"}
    </button>
  );
}
