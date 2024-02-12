"use client";

import { Button } from "flowbite-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from 'next/navigation'

function LoginGoogle() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/admin'

  return (
    <Button type="button" onClick={() => signIn("google", { callbackUrl })}>
      Login com Google
    </Button>
  );
}

export default LoginGoogle;
