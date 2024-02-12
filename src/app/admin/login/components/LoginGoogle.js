"use client";

import useCallbackUrl from "@/hooks/useCallbackUrl";
import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

function LoginGoogle() {
  const callbackUrl = useCallbackUrl();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      type="button"
      color="light"
      isProcessing={isLoading}
      disabled={isLoading}
      onClick={() => {
        setIsLoading(true);
        signIn("google", { callbackUrl })
      }}
    >
      <FcGoogle className="mr-2 h-5 w-5" />
      Login com Google
    </Button>
  );
}

export default LoginGoogle;
