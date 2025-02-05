import { Moon, SunIcon } from "lucide-react";
import { useEffect, useState } from "react";

export function ToggleMode() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "silk");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "silk" ? "forest" : "silk");
  };

  return (
    <label className="flex items-center cursor-pointer gap-2">
      <Moon size={21} />
      <input
        type="checkbox"
        value="silk"
        checked={theme === "silk"}
        onChange={toggleTheme}
        className="toggle theme-controller"
      />
      <SunIcon size={21} />
    </label>
  );
}
