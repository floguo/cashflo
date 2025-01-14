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
    animation: {
      duration: 800,
      easing: 'easeOutQuart',
    },
    cutout: '65%',
    radius: '90%',
    plugins: {
      legend: {
        position: 'right' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          color: 'rgb(0, 0, 0)',
          borderRadius: 4,
        },
      },
      tooltip: {
        animation: {
          duration: 150,
          easing: 'easeOutQuart',
        },
        backgroundColor: 'rgb(255, 255, 255)',
        titleColor: 'rgb(0, 0, 0)',
        bodyColor: 'rgb(0, 0, 0)',
        bodyFont: {
          family: 'var(--font-instrument-sans)',
        },
        padding: 12,
        borderColor: 'rgb(229, 231, 235)',
        borderWidth: 1,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `$${Math.round(context.raw).toLocaleString()}`;
          }
        },
        transitions: [
          {
            show: {
              animations: {
                properties: ['opacity', 'transform'],
                from: { opacity: 0, transform: 'scale(0.95)' },
                to: { opacity: 1, transform: 'scale(1)' }
              }
            },
            hide: {
              animations: {
                properties: ['opacity', 'transform'],
                from: { opacity: 1, transform: 'scale(1)' },
                to: { opacity: 0, transform: 'scale(0.95)' }
              }
            }
          }
        ]
      }
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="h-[400px]">
        <div className="relative w-full h-full">
          <Pie 
            options={{
              ...options,
              maintainAspectRatio: false,
              responsive: true,
            }} 
            data={data}
          />
        </div>
      </CardContent>
    </Card>
  )
}

