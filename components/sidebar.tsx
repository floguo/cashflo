"use client"

import React from 'react'
import { ChevronDown, CreditCard, FileText, LayoutDashboard, Settings, FileUp, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

interface AppSidebarProps {
  currentPath: string
}

export function AppSidebar({ currentPath }: AppSidebarProps) {
  return (
    <Sidebar className="border-r">
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-primary p-2">
              <FileText className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Finance Manager</h3>
              <p className="text-xs font-normal text-muted-foreground">Personal</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </SidebarHeader>
      
      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground">
            Platform
          </SidebarGroupLabel>
          <SidebarGroupContent className="space-y-1">
            <SidebarMenu>
              <SidebarMenuItem>
                <Link href="/" passHref legacyBehavior>
                  <SidebarMenuButton className={cn(
                    "flex items-center space-x-1 w-full text-sm font-normal hover:bg-gray-100 hover:text-gray-900",
                    currentPath === '/' ? "bg-gray-100 text-gray-900" : "text-gray-500"
                  )}>
                    <LayoutDashboard className="h-4 w-4 opacity-70" />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/transactions" passHref legacyBehavior>
                  <SidebarMenuButton className={cn(
                    "flex items-center space-x-1 w-full text-sm font-normal hover:bg-gray-100 hover:text-gray-900",
                    currentPath === '/transactions' ? "bg-gray-100 text-gray-900" : "text-gray-500"
                  )}>
                    <CreditCard className="h-4 w-4 opacity-70" />
                    <span>Transactions</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/tax-documents" passHref legacyBehavior>
                  <SidebarMenuButton className={cn(
                    "flex items-center space-x-1 w-full text-sm font-normal hover:bg-gray-100 hover:text-gray-900",
                    currentPath === '/tax-documents' ? "bg-gray-100 text-gray-900" : "text-gray-500"
                  )}>
                    <FileText className="h-4 w-4 opacity-70" />
                    <span>Tax Documents</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <Link href="/csv-upload" passHref legacyBehavior>
                  <SidebarMenuButton className={cn(
                    "flex items-center space-x-1 w-full text-sm font-normal hover:bg-gray-100 hover:text-gray-900",
                    currentPath === '/csv-upload' ? "bg-gray-100 text-gray-900" : "text-gray-500"
                  )}>
                    <FileUp className="h-4 w-4 opacity-70" />
                    <span>CSV Upload</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="py-1">
        <SidebarMenu>
          <SidebarMenuItem className="px-2">
            <Link href="/settings" passHref legacyBehavior>
              <SidebarMenuButton className={cn(
                "flex items-center space-x-2 w-full px-2 py-1.5 text-sm font-normal hover:bg-gray-100 hover:text-gray-900",
                currentPath === '/settings' ? "bg-gray-100 text-gray-900" : "text-gray-500"
              )}>
                <Settings className="h-4 w-4 opacity-70" />
                <span>Settings</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <Separator className="my-1" />
        <div className="p-2">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <div className="h-full w-full bg-blue-800" />
            </Avatar>
            <div>
              <p className="text-sm font-medium">Flo Guo</p>
              <p className="text-xs font-normal text-muted-foreground">flo@acme.inc</p>
            </div>
            <Button variant="ghost" size="icon" className="ml-auto h-8 w-8">
              <ChevronsUpDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

