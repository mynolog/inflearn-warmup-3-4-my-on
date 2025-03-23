'use client'

import Button from '../common/button/Button'

export default function SocialLoginButtons() {
  return (
    <div className="flex w-2/3 flex-col items-center justify-center gap-3 bg-white p-5 text-sm sm:w-1/3">
      <Button className="!bg-kakao-container flex !w-3/4 items-center justify-center gap-2">
        <i className="fa-solid fa-comment text-kakao-symbol"></i>
        <span className="text-kakao-label">Kakao로 시작하기</span>
      </Button>
      <Button className="!bg-google-container flex !w-3/4 items-center justify-center gap-2">
        <i className="fa-brands fa-google text-google-symbol"></i>
        <span className="text-google-label">Google로 시작하기</span>
      </Button>
    </div>
  )
}
