import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { Separator } from '../ui/separator'

const Navbar = () => {
  return (
    <header className='flex h-16 shrink-0 items-center gap-2 sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-10 px-4'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-2' />
        <h2 className='text-sm font-semibold text-muted-foreground uppercase tracking-wider'>Dashboard</h2>
      </div>
    </header>
  )
}

export default Navbar