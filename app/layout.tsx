import type { Metadata } from 'next'
import { Instrument_Sans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/theme-provider'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'CashFlo',
  description: 'Manage your personal finances with ease',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={instrumentSans.variable}>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased"
      )}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

