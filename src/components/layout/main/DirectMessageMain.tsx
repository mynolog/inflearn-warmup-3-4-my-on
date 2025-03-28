export default function DirectMessageMain() {
  return (
    <main>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-5">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-mint-600">
          <i className="fa-regular fa-comments text-5xl text-mint-600"></i>
        </div>
        <span className="text-lg">내 메시지</span>
      </div>
    </main>
  )
}
