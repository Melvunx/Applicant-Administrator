import useAuth from "@/hook/use-auth";
import { LoginUser, LoginUserSchema } from "@/schema/auth.schema";
import userAuthStore from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import Button from "./ui/Button";
import Input from "./ui/Label";

export default function Login() {
  const { login } = useAuth();
  const { authError } = userAuthStore();
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const {
    mutate: loginMutation,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async (credentials: LoginUser) => {
      const { email, password } = credentials;
      await login(email, password);
    },
    onSuccess: () => {
      console.log("Data send");
      navigate("/dashboard");
    },
    onError: (error) => console.error(error),
  });

  const onLoginAction = async (data: FormData) => {
    const formData = {
      email: String(data.get("email")),
      password: String(data.get("password")),
    };

    try {
      const validateData = LoginUserSchema.parse(formData);

      setValidationErrors([]);

      loginMutation(validateData);
    } catch (errors) {
      if (errors instanceof z.ZodError) {
        setValidationErrors(errors.errors.map((error) => error.message));
      }

      console.error("Unexpected error : ", errors);
    }
  };

  return (
    <form
      action={onLoginAction}
      className="flex flex-col items-center justify-center gap-5"
    >
      <Input
        labelName="email"
        type="email"
        inputName="Email"
        placeholder="Email..."
      />
      {authError ? (
        authError.includes("email") ? (
          <p className="text-error italic">{authError}</p>
        ) : null
      ) : null}

      <Input
        labelName="pass"
        type="password"
        inputName="Password"
        placeholder="Password..."
      />
      {authError ? (
        authError.includes("password") ? (
          <p className="text-error italic">{authError}</p>
        ) : null
      ) : null}

      {validationErrors.length > 0 && (
        <div className="flex flex-col items-center justify-center w-1/2 mx-auto">
          {validationErrors.map((error, index) => (
            <p key={index} className="text-error italic">
              {error}
            </p>
          ))}
        </div>
      )}

      <Button type="submit" loading={isPending}>
        {isPending ? "Connexion en cours..." : "Connexion"}
      </Button>

      {isError && (
        <p className="text-error font-semibold tracking-wide">
          Erreur de connexion. Veuillez réessayer.
        </p>
      )}
    </form>
  );
}
