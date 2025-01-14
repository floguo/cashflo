"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function DarkModeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-background p-2">
            <Moon className="h-4 w-4" />
          </div>
          <div className="text-sm font-medium">Dark Mode</div>
        </div>
        <input
          type="checkbox"
          name="theme-checkbox"
          id="theme-checkbox"
          className="peer sr-only"
          checked={theme === "dark"}
          onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <label
          className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 peer-checked:bg-blue-600"
          htmlFor="theme-checkbox"
        >
          <span className="inline-block h-5 w-5 transform rounded-full bg-white transition-transform peer-checked:translate-x-5" />
        </label>
      </div>
      <p className="text-sm text-muted-foreground">
        Enable or disable dark mode
      </p>
    </div>
  );
}

