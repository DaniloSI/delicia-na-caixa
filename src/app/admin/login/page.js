"use client";

import TextInput from "@/components/TextInput";
import { Button, Label } from "flowbite-react";
import LoginGoogle from "./components/LoginGoogle";
import { signInCredentials } from "./lib/actions";
import useCallbackUrl from "@/hooks/useCallbackUrl";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const callbackUrl = useCallbackUrl();
  const searchParams = useSearchParams();
  const isLoginGoogleError =
    searchParams.get("error") === "AuthorizedCallbackError";

  useEffect(() => {
    if (isLoginGoogleError) {
      toast.error(
        "A conta que você utilizou para fazer login via Google não é uma conta autorizada."
      );
    }
  }, [isLoginGoogleError]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const credentials = {
      username: formData.get("email"),
      password: formData.get("password"),
    };

    setIsLoading(true);
    const isSuccess = await signInCredentials({
      ...credentials,
      redirect: false,
    });

    if (isSuccess) {
      router.push(callbackUrl);
    } else {
      setIsLoading(false);
      toast.error("E-mail ou senha inválidos");
    }
  };

  return (
    <div className="flex flex-col gap-6 px-6 mt-6">
      <h1 className="text-center font-medium text-2xl">Login</h1>

      <form onSubmit={handleLogin} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">E-mail</Label>
          <TextInput
            id="email"
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            autoComplete="username"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <div className="flex gap-2">
            <TextInput
              className="grow"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Digite sua senha"
              autoComplete="current-password"
            />
            <Button color="light" onClick={() => setShowPassword(s => !s)}>
              {showPassword ? (
                <HiOutlineEyeOff className="h-5 w-5" />
              ) : (
                <HiOutlineEye className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        <Button
          type="submit"
          color="primary"
          disabled={isLoading}
          isProcessing={isLoading}
        >
          Entrar
        </Button>

        <LoginGoogle />
      </form>
    </div>
  );
}

export default Login;
