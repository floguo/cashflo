"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        name="theme-checkbox"
        id="theme-checkbox"
        className="peer sr-only"
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <label
        className="group relative inline-flex size-9 cursor-pointer items-center justify-center rounded-lg border border-input bg-background text-foreground shadow-sm shadow-black/5 transition-colors hover:bg-accent hover:text-accent-foreground peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-ring/70"
        htmlFor="theme-checkbox"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      >
        <Moon
          size={16}
          strokeWidth={2}
          className="shrink-0 scale-0 opacity-0 transition-all peer-checked:group-[]:scale-100 peer-checked:group-[]:opacity-100"
          aria-hidden="true"
        />
        <Sun
          size={16}
          strokeWidth={2}
          className="absolute shrink-0 scale-100 opacity-100 transition-all peer-checked:group-[]:scale-0 peer-checked:group-[]:opacity-0"
          aria-hidden="true"
        />
      </label>
    </div>
  )
} 