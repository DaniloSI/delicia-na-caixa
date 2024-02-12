import TextInput from "@/components/TextInput";
import { Label } from "flowbite-react";
import Button from "@/components/Button";
import { signIn } from "@/../auth";
import LoginGoogle from "./components/LoginGoogle";

async function Login({ searchParams }) {
  const callbackUrl = searchParams.callbackUrl || '/admin'
  
  const handleLogin = async (formData) => {
    "use server";
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    await signIn('credentials', {
      ...credentials,
      redirectTo: callbackUrl,
    });
  };

  return (
    <div className="flex flex-col gap-6 px-6 mt-6">
      <h1 className="text-center font-medium text-2xl">Login</h1>

      <form action={handleLogin} className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">E-mail</Label>
          <TextInput
            id="email"
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <TextInput
            id="password"
            type="password"
            name="password"
            placeholder="Digite sua senha"
          />
        </div>

        <Button type="submit" color="primary">
          Entrar
        </Button>

        <LoginGoogle />
      </form>
    </div>
  );
}

export default Login;
