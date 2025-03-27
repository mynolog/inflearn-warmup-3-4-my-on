import Link from 'next/link'
import Button from '@/components/common/button/Button'
import Logo from '@/components/common/logo/Logo'
import { ROUTES } from '@/constants/routes'
import AuthPageWrapper from '@/components/transition/AuthTransitionWrapper'
import StartWithKakaoButton from '@/components/auth/KakaoLoginButton'

export default function AuthPage() {
  return (
    <AuthPageWrapper>
      <div className="flex h-screen w-full flex-col items-center justify-evenly gap-3">
        <div className="flex flex-col items-center gap-6">
          <Logo className="text-8xl text-white shadow-2xl" />
        </div>
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <Link href={ROUTES.LOGIN}>
            <Button className="relative flex w-48 items-center justify-center gap-2">
              <i className="fa-solid fa-arrow-right-to-bracket absolute left-7"></i>
              <span>로그인</span>
            </Button>
          </Link>
          <Link href={ROUTES.SIGNUP}>
            <Button className="relative flex w-48 items-center justify-center gap-2">
              <i className="fa-solid fa-user-plus absolute left-7"></i>
              <span>회원가입</span>
            </Button>
          </Link>
          <div className="font-bold text-white">또는</div>
          <div className="flex w-64 items-center justify-center">
            <StartWithKakaoButton />
          </div>
        </div>
      </div>
    </AuthPageWrapper>
  )
}
