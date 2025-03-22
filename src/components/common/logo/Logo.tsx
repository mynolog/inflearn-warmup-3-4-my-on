'use client'

import { Righteous } from 'next/font/google'

interface LogoProps {
  className?: string
}

const righteous = Righteous({
  weight: ['400'],
  subsets: ['latin'],
})

export default function Logo({ className = '' }: LogoProps) {
  return <div className={`${righteous.className} font-righteous ${className}`}>myOn</div>
}
