import TextInput from "@/components/TextInput";
import { Label } from "flowbite-react";
import Button from "@/components/Button";

async function Login({ provider }) {
  const handleLogin = async (formData) => {
    "use server";
    const credentials = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    console.log(credentials);
  };

  return (
    <div className="flex flex-col gap-6 px-6">
      <h1>Login</h1>

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
      </form>
    </div>
  );
}

export default Login;
