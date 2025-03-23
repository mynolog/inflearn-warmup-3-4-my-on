import AuthBackground from '@/components/common/background/AuthBackground'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-full w-full">
      <AuthBackground />
      <div className="relative z-50 h-full w-full">{children}</div>
    </div>
  )
}
