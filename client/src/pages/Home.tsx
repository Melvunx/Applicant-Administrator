import Button from "@/components/ui/Button";
import useAuth from "@/hook/use-auth";
import { useState } from "react";

export default function Home() {
  const { logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div>
      <Button
        variant="btn-primary"
        loading={isLoading}
        onClick={async () => {
          setIsLoading(true);
          await logout();
          setIsLoading(false);
        }}
      >
        Logout
      </Button>
    </div>
  );
}
