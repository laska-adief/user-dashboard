'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Button } from './button'

export default function BackButton({ backText }: { backText: string }) {
  const router = useRouter()

  return (
    <Button variant="outline" onClick={() => router.back()} className='flex items-center gap-2 w-fit'>
      <ArrowLeft /> {backText}
    </Button>
  )
}