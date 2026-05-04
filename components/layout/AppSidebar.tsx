"use client"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { Home, User } from 'lucide-react'
import Link from 'next/link'

const AppSidebar = () => {
  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className='flex items-center gap-2 px-2 py-2'>
          <div className='bg-primary rounded-lg p-1 font-bold text-primary-foreground text-xs w-8 h-8 flex items-center justify-center shadow-lg shadow-primary/20'>UD</div>
          <div className='flex flex-col'>
            <span className='text-sm font-bold text-primary leading-tight'>User Dashboard</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Home">
                  <Link href="/"> <Home className="size-4" /> Home </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Users">
                  <Link href="/users"> <User className="size-4" /> Users </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar