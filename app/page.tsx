"use client"

import { Suspense, useState, useMemo } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SpendingChart } from '@/components/spending-chart'
import { SpendingBreakdown } from '@/components/spending-breakdown'
import { DateRangeSelector } from '@/components/date-range-selector'
import { Skeleton } from '@/components/ui/skeleton'
import { NumericFormat } from 'react-number-format'

interface Expense {
  category: string;
  amount: number;
  date: Date;
}

function ChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle><Skeleton className="h-4 w-[200px]" /></CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[350px] w-full" />
      </CardContent>
    </Card>
  )
}

function FormattedNumber({ value, prefix = '' }: { value: number, prefix?: string }) {
  return (
    <NumericFormat
      value={value}
      displayType="text"
      thousandSeparator=","
      decimalScale={2}
      fixedDecimalScale
      prefix={prefix}
      renderText={(formattedValue: string) => (
        <span className="tabular-nums tracking-tight">
          {formattedValue.split('').map((char, index) => (
            <span
              key={index}
              className={char === '$' ? 'opacity-50 mr-0.5' : ''}
            >
              {char}
            </span>
          ))}
        </span>
      )}
    />
  )
}

const generateMockExpenses = (from: Date, to: Date): Expense[] => {
  const categories = ['Housing', 'Food', 'Transportation', 'Utilities', 'Entertainment'];
  const expenses: Expense[] = [];
  const daysDiff = Math.round((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  
  // Determine the base multiplier based on the time scale
  let baseMultiplier;
  if (daysDiff <= 7) baseMultiplier = 1;
  else if (daysDiff <= 31) baseMultiplier = 4;
  else if (daysDiff <= 183) baseMultiplier = 24;
  else baseMultiplier = 48;

  let totalAmount = 0;
  categories.forEach(category => {
    let amount = 0;  // Initialize with default value
    switch (category) {
      case 'Housing':
        amount = (Math.random() * 500 + 1500) * baseMultiplier;
        break;
      case 'Food':
        amount = (Math.random() * 300 + 400) * baseMultiplier;
        break;
      case 'Transportation':
        amount = (Math.random() * 200 + 200) * baseMultiplier;
        break;
      case 'Utilities':
        amount = (Math.random() * 150 + 150) * baseMultiplier;
        break;
      case 'Entertainment':
        amount = (Math.random() * 200 + 100) * baseMultiplier;
        break;
    }
    totalAmount += amount;
    expenses.push({ category, amount, date: new Date(from) });
  });

  // Adjust Housing to be roughly 1/3 of the total
  const targetHousingAmount = totalAmount / 3;
  const housingExpense = expenses.find(e => e.category === 'Housing');
  if (housingExpense) {
    housingExpense.amount = targetHousingAmount;
  }

  return expenses;
};

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState({ from: new Date('2023-05-01'), to: new Date() })
  const mockExpenses = useMemo(() => generateMockExpenses(dateRange.from, dateRange.to), [dateRange]);

  return (
    <DashboardLayout>
      <div className="w-full space-y-6">
        <h1 className="text-3xl mb-6">Dashboard</h1>
        <div className="grid w-full gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm text-muted-foreground">Total Balance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                <FormattedNumber value={12345.67} prefix="$" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Spending Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                <FormattedNumber value={2345.67} prefix="$" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Net Worth</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl">
                <FormattedNumber value={98765.43} prefix="$" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Tax Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl">7</div>
            </CardContent>
          </Card>
        </div>
        <div className="mb-6">
          <DateRangeSelector onRangeChange={setDateRange} />
        </div>
        <div className="grid w-full gap-4 md:grid-cols-2">
          <Suspense fallback={<ChartSkeleton />}>
            <SpendingChart dateRange={dateRange} />
          </Suspense>
          <Suspense fallback={<ChartSkeleton />}>
            <SpendingBreakdown expenses={mockExpenses} dateRange={dateRange} />
          </Suspense>
        </div>
      </div>
    </DashboardLayout>
  )
}

