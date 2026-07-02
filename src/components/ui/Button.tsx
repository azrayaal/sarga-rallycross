import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/cn'

type Variant = 'primary' | 'ghost' | 'outline' | 'light'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  icon?: ReactNode
  as?: 'button' | 'a'
  href?: string
}

const base =
  'group relative inline-flex items-center justify-center gap-2.5 font-sans font-semibold uppercase tracking-[0.14em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:opacity-40 disabled:pointer-events-none overflow-hidden'

const sizes: Record<Size, string> = {
  sm: 'text-[0.62rem] px-4 py-2.5',
  md: 'text-[0.68rem] px-6 py-3.5',
  lg: 'text-[0.74rem] px-8 py-4.5',
}

const variants: Record<Variant, string> = {
  primary:
    'bg-molten text-white hover:bg-molten-hot shadow-[0_10px_40px_-12px_rgba(218,41,28,0.6)] clip-angle',
  light:
    'bg-bone text-ink hover:bg-white clip-angle',
  outline:
    'border border-bone/25 text-bone hover:border-molten hover:text-molten clip-angle',
  ghost: 'text-ash hover:text-bone',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'primary', size = 'md', icon, className, children, as = 'button', href, ...props },
  ref,
) {
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      {icon && <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>}
    </>
  )

  if (as === 'a') {
    return (
      <a href={href} className={cn(base, sizes[size], variants[variant], className)}>
        {content}
      </a>
    )
  }

  return (
    <button ref={ref} className={cn(base, sizes[size], variants[variant], className)} {...props}>
      {content}
    </button>
  )
})
