import useAuth from "@/hook/use-auth";
import { RegisterUser, RegisterUserSchema } from "@/schema/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { z } from "zod";
import Button from "./ui/Button";
import Input from "./ui/Label";

export default function Register() {
  const { register } = useAuth();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const {
    mutate: registerMutation,
    isPending,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: async (credentials: RegisterUser) => {
      const { email, username, password } = credentials;
      await register(username, email, password);
    },
    onSuccess: () => {
      console.log("User registered successfully");
    },
    onError: (error) => {
      console.error("Error to register user : ", error);
    },
  });

  const onRegisterAction = async (data: FormData) => {
    const formData = {
      username: String(data.get("username")),
      email: String(data.get("email")),
      password: String(data.get("password")),
    };

    try {
      const validateData = RegisterUserSchema.parse(formData);

      setValidationErrors([]);

      registerMutation(validateData);
    } catch (errors) {
      if (errors instanceof z.ZodError) {
        setValidationErrors(errors.errors.map((error) => error.message));
      }

      console.error("Unexpected error : ", errors);
    }
  };

  return (
    <>
      <form
        action={onRegisterAction}
        className="flex flex-col items-center justify-center gap-3"
      >
        <Input
          labelName="user"
          inputName="Username"
          placeholder="Username..."
        />

        <Input
          labelName="email"
          inputName="Email"
          type="email"
          placeholder="Email..."
        />

        <Input
          labelName="pass"
          inputName="Password"
          type="password"
          placeholder="Password..."
        />

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
          {isPending ? "Enregistrement en cours..." : "Créer un compte"}
        </Button>

        {isError && (
          <p className="text-error font-semibold tracking-wide">
            Erreur de connexion. Veuillez réessayer.
          </p>
        )}
      </form>

      {isSuccess && (
        <div className="toast">
          <div className="alert alert-success card">
            <div className="card-body">
              <h2 className="card-title">New user created !</h2>
              <div className="justify-end card-actions">
                <Button>Undo</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
