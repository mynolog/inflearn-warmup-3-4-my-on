'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SIDEBAR_LIST } from '@/constants/sidebarList'
import Button from '../common/button/Button'
import { createBrowserSupabaseClient } from '@/utils/supabase/client'

export default function SidebarNav() {
  const pathname = usePathname()
  const primaryList = SIDEBAR_LIST.filter((item) => item.group === 'primary')
  const secondaryList = SIDEBAR_LIST.filter((item) => item.group === 'secondary')

  const isActive = (href: string) => pathname === href

  //TODO: 로그아웃 버튼은 별도 컴포넌트로 분리하여 재사용
  const supabase = createBrowserSupabaseClient()

  const handleSignout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="relative flex min-h-screen w-full flex-col items-center justify-start gap-20 py-6">
      {/* 홈 */}
      <ul className="w-full p-2">
        {primaryList.map((item) => (
          <li
            key={item.id}
            className="flex h-10 w-full justify-center rounded-lg px-3 hover:bg-gray-200"
          >
            <Link href={item.href} className="flex h-full w-full items-center gap-2">
              <i
                className={`${isActive(item.href) ? `text-mint-600 ${item.iconClass.active}` : `font-bold text-gray-600 ${item.iconClass.default}`}`}
              ></i>
              <span
                className={`${isActive(item.href) ? 'font-bold' : 'font-semibold text-gray-600'} hidden text-sm md:inline`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {/* 그 외 */}
      <ul className="flex w-full flex-col gap-3 p-2">
        {secondaryList.map((item) => (
          <li
            key={item.id}
            className="flex h-10 w-full justify-center rounded-lg px-3 hover:bg-gray-200"
          >
            <Link href={item.href} className="flex h-full w-full items-center gap-2">
              <i
                className={`${isActive(item.href) ? `text-mint-600 ${item.iconClass.active}` : `font-bold text-gray-600 ${item.iconClass.default}`}`}
              ></i>
              <span
                className={`${isActive(item.href) ? 'font-bold' : 'font-semibold text-gray-600'} hidden text-sm md:inline`}
              >
                {item.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Button
        onClick={handleSignout}
        className="absolute bottom-6 flex !w-full items-center gap-2 px-3 text-gray-400 shadow-none hover:text-red-400"
      >
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <span className="hidden text-xs md:inline">로그아웃</span>
      </Button>
    </nav>
  )
}
