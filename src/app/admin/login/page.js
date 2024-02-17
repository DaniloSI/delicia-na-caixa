"use client";

import LoginGoogle from "./components/LoginGoogle";
import { signInCredentials } from "./lib/actions";
import useCallbackUrl from "@/hooks/useCallbackUrl";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { HiKey, HiMail, HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import FormControl from "@/components/FormControl";
import TextInputCustom from "@/components/TextInputCustom";

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
      username: formData.get("username"),
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
    <div className="flex flex-col gap-6 px-6 mt-4">
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <h1 className="text-center font-medium text-2xl">Login</h1>
        <FormControl labelTop="E-mail">
          <TextInputCustom
            id="email"
            type="email"
            inputMode="email"
            name="username"
            placeholder="Digite seu e-mail"
            autoComplete="username"
            leftIcon={HiMail}
          />
        </FormControl>

        <div className="flex gap-2 items-end">
          <FormControl labelTop="Senha">
            <TextInputCustom
              className="px-0"
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Digite sua senha"
              autoComplete="current-password"
              leftIcon={HiKey}
            />
          </FormControl>

          <button
            type="button"
            class="btn btn-outline"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? (
              <HiOutlineEyeOff className="h-5 w-5" />
            ) : (
              <HiOutlineEye className="h-5 w-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-full mt-4"
          disabled={isLoading}
        >
          {isLoading && <span className="loading loading-spinner" />}
          Entrar
        </button>
      </form>

      <div className="divider">Ou use sua rede social</div>

      <LoginGoogle />
    </div>
  );
}

export default Login;
