"use client";

import { signOut } from "next-auth/react";
import { useState } from "react";

export default function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);
    signOut({ callbackUrl: "/admin/login" });
  };

  return (
    <button
      type="button"
      className="btn mb-4"
      disabled={isLoggingOut}
      onClick={handleLogout}
    >
      {isLoggingOut && <span className="loading loading-spinner" />}
      Sair
    </button>
  );
}
