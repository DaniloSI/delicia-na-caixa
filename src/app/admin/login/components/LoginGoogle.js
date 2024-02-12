"use client";

import Button from "@/components/Button";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

function LoginGoogle() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  return (
    <Button
      type="button"
      color="light"
      onClick={() => signIn("google", { callbackUrl })}
    >
      <FcGoogle className="mr-2 h-5 w-5" />
      Login com Google
    </Button>
  );
}

export default LoginGoogle;
