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
import { formatNumber } from "@/lib/utils"

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
  const { labels, data, xAxisTitle, diffDays } = useMemo(() => {
    const { from, to } = dateRange
    const diffDays = Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))

    let labels: string[]
    let data: number[]
    let xAxisTitle: string

    if (diffDays <= 7) {
      // 1 week or less
      labels = eachDayOfInterval({ start: from, end: to }).map((date: Date) => format(date, 'EEE'))
      data = labels.map(() => Math.floor(Math.random() * 200) + 50) // Daily spend between $50 and $250
      xAxisTitle = 'Day of Week'
    } else if (diffDays <= 31) {
      // 1 month or less
      labels = eachDayOfInterval({ start: from, end: to }).map((date: Date) => 
        format(date, diffDays > 14 ? 'MMM d' : 'd')
      ).filter((_, i) => i % 2 === 0)  // Show every other date
      data = labels.map(() => Math.floor(Math.random() * 300) + 100)
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

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Spending',
        data,
        backgroundColor: '#A0AEC0',
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
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
      tooltip: {
        backgroundColor: 'rgb(255, 255, 255)',
        titleColor: 'rgb(0, 0, 0)',
        bodyColor: 'rgb(0, 0, 0)',
        bodyFont: {
          family: 'var(--font-instrument-sans)',
        },
        padding: 12,
        borderColor: 'rgb(229, 231, 235)',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `$${formatNumber(context.parsed.y)}`;
          }
        }
      }
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
          callback: function(this: any, tickValue: number | string) {
            return `$${formatNumber(Number(tickValue))}`;
          }
        },
        suggestedMax: diffDays <= 31 ? 500 : 7000,
        grid: {
          display: false,
        },
      },
      x: {
        ticks: {
          maxRotation: diffDays > 14 ? 45 : 0,  // Rotate labels for better fit
          autoSkip: true,
          maxTicksLimit: diffDays <= 31 ? 15 : 10,  // Show more labels for month view
        },
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <CardTitle>Your Spending</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <div className="relative w-full h-full">
          <Bar 
            options={{
              ...options,
              maintainAspectRatio: false,
              responsive: true,
            }} 
            data={chartData}
          />
        </div>
      </CardContent>
    </Card>
  )
}