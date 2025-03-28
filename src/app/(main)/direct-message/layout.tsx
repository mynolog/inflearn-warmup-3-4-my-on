import DirectMessageSidebar from '@/components/layout/DirectMessageSidebar'

export default function DirectMessageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <div className="fixed left-16 top-0 md:left-32">
        <DirectMessageSidebar />
      </div>
      <div className="pl-32 md:pl-80">{children}</div>
    </div>
  )
}
