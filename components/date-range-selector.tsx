"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

type DateRange = {
  from: Date
  to: Date
}

type DateRangeSelectorProps = {
  onRangeChange: (range: DateRange) => void
}

export function DateRangeSelector({ onRangeChange }: DateRangeSelectorProps) {
  const [selectedRange, setSelectedRange] = useState<'week' | 'month' | '6months' | 'year' | 'custom'>('month')
  const [customRange, setCustomRange] = useState<DateRange>({ from: new Date(), to: new Date() })

  const handleRangeSelect = (range: 'week' | 'month' | '6months' | 'year' | 'custom') => {
    setSelectedRange(range)
    if (range !== 'custom') {
      const now = new Date()
      let from = new Date()
      switch (range) {
        case 'week':
          from.setDate(now.getDate() - 7)
          break
        case 'month':
          from.setMonth(now.getMonth() - 1)
          break
        case '6months':
          from.setMonth(now.getMonth() - 6)
          break
        case 'year':
          from.setFullYear(now.getFullYear() - 1)
          break
      }
      onRangeChange({ from, to: now })
    } else {
      onRangeChange(customRange)
    }
  }

  return (
    <div className="flex items-center justify-between w-full">
      <h2 className="text-lg">Trends</h2>
      <div className="flex items-center space-x-2">
        {['week', 'month', '6months', 'year'].map((range) => (
          <Button
            key={range}
            variant="outline"
            size="sm"
            className={cn(
              "transition-all",
              selectedRange === range
                ? "bg-secondary text-secondary-foreground"
                : "text-muted-foreground hover:bg-secondary/50 hover:text-secondary-foreground"
            )}
            onClick={() => handleRangeSelect(range as 'week' | 'month' | '6months' | 'year')}
          >
            {range === 'week' && 'Week'}
            {range === 'month' && 'Month'}
            {range === '6months' && '6 mo'}
            {range === 'year' && 'Year'}
          </Button>
        ))}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className={cn(
                "transition-all",
                selectedRange === 'custom'
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-secondary-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedRange === 'custom'
                ? `${format(customRange.from, 'LLL dd')} - ${format(customRange.to, 'LLL dd')}`
                : 'Custom'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="range"
              selected={customRange}
              onSelect={(range) => {
                if (range?.from && range?.to) {
                  setCustomRange(range as DateRange)
                  setSelectedRange('custom')
                  onRangeChange(range as DateRange)
                }
              }}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

