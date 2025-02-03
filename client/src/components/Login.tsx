import { useAuth } from "@/hook/use-auth";
import Button from "./ui/Button";
import Input from "./ui/Label";

export default function Login() {
  const { login } = useAuth();

  const onLoginAction = async (data: FormData) => {
    const email = String(data.get("email"));
    const password = String(data.get("password"));

    await login(email, password);
  };

  return (
    <form action={onLoginAction}>
      <Input
        labelName="email"
        type="email"
        inputName="Email"
        placeholder="Email..."
      />

      <Input
        labelName="pass"
        type="password"
        inputName="Password"
        placeholder="Password..."
      />

      <Button type="submit">Connexion</Button>
    </form>
  );
}
