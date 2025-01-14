'use client'
import React from 'react'
import { AppSidebar } from './sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { usePathname } from 'next/navigation'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <div className="w-64 flex-shrink-0">
          <AppSidebar currentPath={pathname} />
        </div>
        <main className="w-[calc(100%-256px)] overflow-y-auto">
          <div className="mx-auto p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}

