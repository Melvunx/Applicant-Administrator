import { Moon, SunIcon } from "lucide-react";

export function ToggleMode() {
  return (
    <label className="flex items-center cursor-pointer gap-2">
      <Moon size={21} />
      <input type="checkbox" value="silk" className="toggle theme-controller" />
      <SunIcon size={21} />
    </label>
  );
}
