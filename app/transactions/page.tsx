'use client'

import { useState, useMemo } from 'react'
import { DashboardLayout } from '@/components/dashboard-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
  getFilteredRowModel,
  ColumnFiltersState,
} from '@tanstack/react-table'
import { TriangleIcon as TriangleDownIcon, TriangleIcon as TriangleUpIcon } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { NumericFormat } from 'react-number-format'

type Transaction = {
  id: number
  date: string
  description: string
  amount: number
  category: string
}

const transactions: Transaction[] = [
  { id: 1, date: '2023-05-01', description: 'Grocery Store', amount: -75.50, category: 'Groceries' },
  { id: 2, date: '2023-05-02', description: 'Monthly Rent', amount: -1500.00, category: 'Housing' },
  { id: 3, date: '2023-05-03', description: 'Salary Deposit', amount: 3000.00, category: 'Income' },
  { id: 4, date: '2023-05-04', description: 'Online Shopping', amount: -120.75, category: 'Shopping' },
  { id: 5, date: '2023-05-05', description: 'Restaurant Dinner', amount: -85.00, category: 'Dining' },
]

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

export default function TransactionsPage() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: 'date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Date
            {column.getIsSorted() === 'asc' ? (
              <TriangleUpIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <TriangleDownIcon className="ml-2 h-4 w-4" />
            ) : (
              <TriangleDownIcon className="ml-2 h-4 w-4 opacity-50" />
            )}
          </Button>
        )
      },
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Amount
            {column.getIsSorted() === 'asc' ? (
              <TriangleUpIcon className="ml-2 h-4 w-4" />
            ) : column.getIsSorted() === 'desc' ? (
              <TriangleDownIcon className="ml-2 h-4 w-4" />
            ) : (
              <TriangleDownIcon className="ml-2 h-4 w-4 opacity-50" />
            )}
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue('amount'))
        return (
          <div className={amount < 0 ? 'text-red-500' : 'text-green-500'}>
            <FormattedNumber value={amount} prefix="$" />
          </div>
        )
      },
    },
    {
      accessorKey: 'category',
      header: 'Category',
    },
  ]

  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  })

  const categories = useMemo(() => {
    return Array.from(new Set(transactions.map(t => t.category)))
  }, [])

  return (
    <DashboardLayout>
      <div className="w-full space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Transactions</h1>
          <Button>Import CSV</Button>
        </div>
        <div className="flex items-center py-4 space-x-4">
          <Input
            placeholder="Filter descriptions..."
            value={(table.getColumn('description')?.getFilterValue() as string) ?? ''}
            onChange={(event) =>
              table.getColumn('description')?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
          <Select
            value={(table.getColumn('category')?.getFilterValue() as string) ?? 'all'}
            onValueChange={(value) =>
              table.getColumn('category')?.setFilterValue(value === 'all' ? '' : value)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="w-full overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  )
}

