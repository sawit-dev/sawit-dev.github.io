type BrandIconProps = {
  path: string
  title: string
  size?: number
}

export function BrandIcon({ path, title, size = 16 }: BrandIconProps) {
  return (
    <svg
      aria-label={title}
      role="img"
      viewBox="0 0 24 24"
      fill="currentColor"
      height={size}
      width={size}
    >
      <path d={path} />
    </svg>
  )
}
