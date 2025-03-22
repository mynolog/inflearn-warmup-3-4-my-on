import AuthBackground from '@/components/common/background/AuthBackground'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full h-full">
      <AuthBackground />
      <div className="relative w-full h-full z-50">{children}</div>
    </div>
  )
}
