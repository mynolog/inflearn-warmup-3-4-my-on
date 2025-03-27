'use client'

interface SkeletonProps {
  width?: string
  height?: string
  aspectRatio?: string
  borderRadius?: string
  className?: string
}

export default function Skeleton({
  width,
  height,
  aspectRatio,
  className = '',
  borderRadius = 'rounded-md',
}: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-100 ${borderRadius} ${aspectRatio ? `aspect-[${aspectRatio}]` : ''} ${className}`}
      style={{
        width: aspectRatio ? (width ?? '100%') : width,
        height: aspectRatio ? undefined : height,
      }}
    />
  )
}
