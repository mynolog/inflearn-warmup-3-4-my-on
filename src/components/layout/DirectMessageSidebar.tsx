import DirectMessageList from '../direct-message/DirectMessageList'
import MyProfilePreview from '../direct-message/MyProfilePreview'

export default function DirectMessageSidebar() {
  return (
    <aside className="flex h-screen w-28 flex-col gap-10 overflow-y-auto border-r border-gray-200 px-3 pt-10 shadow-lg md:w-80 md:px-6">
      <MyProfilePreview />
      <h3 className="flex justify-center text-sm font-bold md:justify-start">메시지</h3>
      <DirectMessageList />
    </aside>
  )
}
