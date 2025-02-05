import useAuth from "@/hook/use-auth";
import { AlignJustifyIcon, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ToggleMode } from "./toggle-mode";

export default function Navbar() {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isHoveringLogo, setIsHoveringLogo] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className="navbar bg-base-100 shadow-md">
      <div className="flex-1">
        <Link
          onMouseEnter={() => setIsHoveringLogo(true)}
          onMouseLeave={() => setIsHoveringLogo(false)}
          to="/dashboard"
          className={`btn btn-ghost normal-case text-xl italic ${
            isHoveringLogo ? "text-primary" : ""
          }`}
        >
          Melvunx Offer' s
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <ToggleMode />
        <form>
          <label className="input">
            <SearchIcon size={18} strokeWidth={0.9} />
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
                className={`tracking-wide ${
                  isHoveringProfile ? "text-secondary" : ""
                }`}
                to="/profile"
              >
                Profile
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
                  className={`flex gap-2 items-center text-error ${
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
