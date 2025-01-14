"use client"

import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { addDays, addWeeks, addMonths, format, eachDayOfInterval, eachWeekOfInterval, eachMonthOfInterval } from 'date-fns'
import { useTheme } from 'next-themes'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

type DateRange = {
  from: Date
  to: Date
}

type SpendingChartProps = {
  dateRange: DateRange
}

export function SpendingChart({ dateRange }: SpendingChartProps) {
  const { theme } = useTheme()
  const { labels, data, xAxisTitle, diffDays } = useMemo(() => {
    const { from, to } = dateRange
    const diffDays = Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))

    let labels: string[]
    let data: number[]
    let xAxisTitle: string

    if (diffDays <= 7) {
      // 1 week or less
      labels = eachDayOfInterval({ start: from, end: to }).map(date => format(date, 'EEE'))
      data = labels.map(() => Math.floor(Math.random() * 200) + 50) // Daily spend between $50 and $250
      xAxisTitle = 'Day of Week'
    } else if (diffDays <= 31) {
      // 1 month or less
      labels = eachDayOfInterval({ start: from, end: to }).map(date => format(date, 'd'))
      data = labels.map(() => Math.floor(Math.random() * 300) + 100) // Daily spend between $100 and $400
      xAxisTitle = 'Day of Month'
    } else if (diffDays <= 183) {
      // 6 months or less
      labels = eachMonthOfInterval({ start: from, end: to }).map(date => format(date, 'MMM'))
      data = labels.map(() => Math.floor(Math.random() * 2000) + 4000) // Monthly spend between $4000 and $6000
      xAxisTitle = 'Month'
    } else {
      // More than 6 months
      labels = eachMonthOfInterval({ start: from, end: to })
        .filter((_, index) => index % 2 === 0)
        .map(date => format(date, 'MMM yy'))
      data = labels.map(() => Math.floor(Math.random() * 3000) + 3500) // Bi-monthly spend between $3500 and $6500
      xAxisTitle = 'Bi-monthly'
    }

    return { labels, data, xAxisTitle, diffDays }
  }, [dateRange])

  const gradient = useMemo(() => {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return '#8B2F5E';
    
    const gradientFill = ctx.createLinearGradient(0, 0, 0, 400);
    gradientFill.addColorStop(0, '#8B2F5E'); // Deep magenta/plum
    gradientFill.addColorStop(1, '#F25757'); // Coral red
    return gradientFill;
  }, []);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Spending',
        data,
        backgroundColor: '#4A90E2',
        // Other harmonious options from the breakdown:
        // '#8B2F5E' - Deep magenta/plum
        // '#F25757' - Coral red
        // '#F2994A' - Orange/coral
        // '#F2D94A' - Bright yellow
        // Additional harmonious options:
        // '#4A90E2' - Sky blue
        // '#9B51E0' - Purple
        // '#219653' - Forest green
        // '#EB5757' - Red
      },
    ],
  }

  const formatChartNumber = (value: number) => {
    if (value >= 1000) {
      return (value / 1000).toFixed(1) + 'k';
    }
    return value.toString();
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 30,
        bottom: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return formatChartNumber(value);
          }
        },
        suggestedMax: diffDays <= 31 ? 500 : 7000,
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
        },
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <Card className="w-full max-h-[500px]">
      <CardHeader className="pb-4">
        <CardTitle>Your Spending</CardTitle>
      </CardHeader>
      <CardContent className="pt-4 h-[calc(100%-5rem)]">
        <div className="h-full">
          <Bar options={options} data={chartData} />
        </div>
      </CardContent>
    </Card>
  )
}

