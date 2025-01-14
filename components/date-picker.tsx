"use client"

import { DayPicker } from "react-day-picker"
import { useTheme } from "next-themes"
import "react-day-picker/dist/style.css"

type DatePickerProps = {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}

export function DatePicker({ selected, onSelect }: DatePickerProps) {
  const { theme } = useTheme()

  return (
    <DayPicker
      mode="single"
      selected={selected}
      onSelect={onSelect}
      className={theme === "dark" ? "dark" : ""}
    />
  )
} 