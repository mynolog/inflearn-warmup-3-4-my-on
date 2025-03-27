import StartWithKakaoButton from './KakaoLoginButton'

export default function SocialLoginButtons() {
  return (
    <div className="flex w-full max-w-[530px] flex-col items-center justify-center gap-3 bg-white p-5 text-sm sm:w-2/3 xl:w-1/3">
      <StartWithKakaoButton />
    </div>
  )
}
