/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // kakao 프로필
      {
        protocol: 'http',
        hostname: 'k.kakaocdn.net',
        pathname: '/**',
      },
      // Supabase Storage
      {
        protocol: 'https',
        hostname: 'gxzwdcgjtorzehmxxqar.supabase.co',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
