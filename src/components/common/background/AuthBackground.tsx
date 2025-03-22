import Image from 'next/image'
import authBackgroundImage from '@/assets/images/auth-background.jpg'

export default function AuthBackground() {
  return (
    <div className="absolute inset-0 -z-50">
      <Image
        src={authBackgroundImage}
        fill
        priority
        alt="Auth Background Image"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/20" />
    </div>
  )
}
