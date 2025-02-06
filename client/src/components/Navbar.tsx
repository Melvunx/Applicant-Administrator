import { searchOffers } from "@/api/offer";
import useAuth from "@/hook/use-auth";
import ErrorPage from "@/pages/ErrorPage";
import userAuthStore from "@/stores/auth";
import { useMutation } from "@tanstack/react-query";
import { AlignJustifyIcon, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OfferForm from "./OfferForm";
import { ToggleMode } from "./toggle-mode";

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { user, accessToken, setAccessToken } = userAuthStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    mutate: searchMutation,
    isPending: isSearching,
    isError,
    error,
  } = useMutation({
    mutationKey: ["search"],
    mutationFn: async (query: string) =>
      await searchOffers({ query, navigate, accessToken, setAccessToken }),
    onSuccess: (data, variables) =>
      console.log("Data receive and send : ", { data, variables }),
    onError: (error) => console.error("Error: ", error),
  });

  const onSearchAction = (data: FormData) => {
    const query = String(data.get("search"));

    try {
      searchMutation(query);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!user || isError) {
    return <ErrorPage />;
  }

  if (error) {
    throw error;
  }
  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex w-full items-center gap-4">
        <Link
          onMouseEnter={() => setIsHoveringLogo(true)}
          onMouseLeave={() => setIsHoveringLogo(false)}
          to="/dashboard"
          className={`btn btn-ghost normal-case text-xl italic ${
            isHoveringLogo
              ? "dark:text-primary light:text-secondary-content"
              : ""
          }`}
        >
          Melvunx Offer' s
        </Link>
        <OfferForm />
      </div>
      <div className="flex items-center gap-3">
        <ToggleMode />
        <form action={onSearchAction}>
          <label className="input">
            {isSearching ? (
              <span className="loading loading-spinner light:text-primary dark:text-info"></span>
            ) : (
              <SearchIcon size={18} strokeWidth={0.9} />
            )}

            <input
              ref={inputRef}
              type="search"
              name="search"
              placeholder="Search..."
              className="grow py-2 w-36 md:w-auto"
            />
            <kbd className="kbd kbd-sm font-medium italic">ctrl + k</kbd>
          </label>
        </form>
        <details
          onClick={() => setIsOpen(!isOpen)}
          className="dropdown dropdown-end"
        >
          <summary className="btn m-1">
            <AlignJustifyIcon className={`${isOpen ? "text-primary" : ""}`} />
          </summary>
          <ul className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
            <li
              onMouseEnter={() => setIsHoveringProfile(true)}
              onMouseLeave={() => setIsHoveringProfile(false)}
            >
              <Link
                className={`tracking-wide font-semibold ${
                  isHoveringProfile ? "text-secondary " : ""
                }`}
                to="/profile"
              >
                {user.username} Profile
              </Link>
            </li>
            <li>
              <a
                onClick={async () => {
                  setIsLoading(true);
                  await logout();
                  setIsLoading(false);
                }}
              >
                <span
                  className={`flex gap-2 items-center text-error font-semibold ${
                    isLoading ? "loading loading-spinner" : ""
                  }`}
                >
                  Déconnexion
                </span>
              </a>
            </li>
          </ul>
        </details>
      </div>
    </div>
  );
}
