import AuthBackground from '@/components/common/background/AuthBackground'
import Slogun from '@/components/common/slogun/Slogun'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full">
      <AuthBackground />
      <div className="relative flex flex-col items-center gap-6">
        <Slogun className="absolute top-28" />
      </div>
      <div className="relative z-50 h-full w-full">{children}</div>
    </div>
  )
}
