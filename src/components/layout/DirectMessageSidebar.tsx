import DirectMessageList from '../direct-message/DirectMessageList'
import MyProfilePreview from '../direct-message/MyProfilePreview'

export default function DirectMessageSidebar() {
  return (
    <aside className="flex min-h-screen w-28 flex-col gap-10 border-r border-gray-200 px-3 pt-10 shadow-lg md:w-80 md:px-6">
      <MyProfilePreview />
      <h3 className="text-sm font-bold">메시지</h3>
      <DirectMessageList />
    </aside>
  )
}
