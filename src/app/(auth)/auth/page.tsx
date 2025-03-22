import Link from 'next/link'
import Button from '@/components/common/button/Button'
import Logo from '@/components/common/logo/Logo'
import Slogun from '@/components/common/slogun/Slogun'
import { ROUTES } from '@/constants/routes'

export default function AuthPage() {
  return (
    <div className="w-full h-full flex flex-col gap-4 justify-evenly items-center">
      <div className="flex flex-col items-center gap-6">
        <Logo className="text-8xl text-white shadow-2xl" />
        <Slogun />
      </div>
      <div className="flex flex-col gap-3">
        <Link href={ROUTES.LOGIN}>
          <Button className="w-48">로그인</Button>
        </Link>
        <Link href={ROUTES.SIGNUP}>
          <Button className="w-48">회원가입</Button>
        </Link>
      </div>
    </div>
  )
}
