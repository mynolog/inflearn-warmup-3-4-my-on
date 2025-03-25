import Link from 'next/link'
import { ROUTES } from '@/constants/routes'

interface AuthSwitcherProps {
  to: 'login' | 'signup'
}

export default function AuthSwitcher({ to }: AuthSwitcherProps) {
  const isLogin = to === 'login'
  return (
    <div className="rounded-l2 flex h-12 w-full max-w-[530px] items-center justify-center gap-2 rounded-sm bg-white text-sm font-semibold sm:w-2/3 xl:w-1/3">
      <span>{isLogin ? '이미 계정이 있으신가요?' : '계정이 없으신가요?'}</span>
      {isLogin ? (
        <Link href={ROUTES.LOGIN} className="font-extrabold text-soft-blue-800">
          로그인
        </Link>
      ) : (
        <Link href={ROUTES.SIGNUP} className="font-extrabold text-soft-blue-800">
          가입하기
        </Link>
      )}
    </div>
  )
}
