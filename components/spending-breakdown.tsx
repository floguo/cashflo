"use client"

import React, { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useTheme } from 'next-themes'

ChartJS.register(ArcElement, Tooltip, Legend)

type Expense = {
  category: string
  amount: number
  date: Date
}

type DateRange = {
  from: Date
  to: Date
}

type SpendingBreakdownProps = {
  expenses: Expense[]
  dateRange: DateRange
}

export function SpendingBreakdown({ expenses, dateRange }: SpendingBreakdownProps) {
  const { theme } = useTheme()

  const data = useMemo(() => {
    const colors = [
      '#8B2F5E', // Deep magenta/plum
      '#F25757', // Coral red
      '#F2994A', // Orange/coral
      '#F2D94A', // Bright yellow
      '#3B8C88', // Teal
    ];
    
    return {
      labels: expenses.map(expense => expense.category),
      datasets: [
        {
          data: expenses.map(expense => expense.amount),
          backgroundColor: colors,
          borderColor: theme === 'dark' ? 'rgb(0, 0, 0)' : 'rgb(255, 255, 255)',
          borderWidth: 2,
        },
      ],
    }
  }, [expenses, theme])

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          color: theme === 'dark' ? 'rgb(255, 255, 255)' : 'rgb(0, 0, 0)',
        },
      },
      title: {
        display: false,
      },
    },
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        <Pie data={data} options={options} />
      </CardContent>
    </Card>
  )
}

