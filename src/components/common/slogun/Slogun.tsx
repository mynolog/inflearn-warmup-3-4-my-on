import { Moirai_One } from 'next/font/google'

interface SlogunProps {
  className?: string
}

const moiraiOne = Moirai_One({
  weight: ['400'],
  subsets: ['latin'],
})

export default function Slogun({ className = '' }: SlogunProps) {
  return (
    <h2
      className={`${moiraiOne.className} font-moirai-one text-5xl text-yellow-200 shadow-2xl animate-fliker ${className}`}
    >
      나를 켜는 순간
    </h2>
  )
}
