"use client";

import useCallbackUrl from "@/hooks/useCallbackUrl";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

function LoginGoogle() {
  const callbackUrl = useCallbackUrl();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <button
      type="button"
      color="light"
      className="btn"
      disabled={isLoading}
      onClick={() => {
        setIsLoading(true);
        signIn("google", { callbackUrl })
      }}
    >
      {isLoading && <span className="loading loading-spinner" />}
      <FcGoogle className="mr-2 h-5 w-5" />
      Login com Google
    </button>
  );
}

export default LoginGoogle;
