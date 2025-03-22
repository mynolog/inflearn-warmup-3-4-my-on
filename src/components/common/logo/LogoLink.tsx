'use client'

import Link from 'next/link'
import Logo from './Logo'
import { ROUTES } from '@/constants/routes'

interface LogoLinkProps {
  className?: string
}

export default function LogoLink({ className }: LogoLinkProps) {
  return (
    <Link href={ROUTES.HOME}>
      <Logo className={`${className}`} />
    </Link>
  )
}
