'use client'

import Button from '../common/button/Button'

export default function SocialLoginButtons() {
  return (
    <div className="flex w-2/3 max-w-[530px] flex-col items-center justify-center gap-3 bg-white p-5 text-sm lg:w-1/3">
      <Button className="flex !w-3/4 items-center justify-center gap-2 !bg-kakao-container">
        <i className="fa-solid fa-comment text-kakao-symbol"></i>
        <span className="text-kakao-label">Kakao로 시작하기</span>
      </Button>
      <Button className="flex !w-3/4 items-center justify-center gap-2 !bg-google-container">
        <i className="fa-brands fa-google text-google-symbol"></i>
        <span className="text-google-label">Google로 시작하기</span>
      </Button>
    </div>
  )
}
