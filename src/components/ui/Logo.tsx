import { cn } from '@/utils/cn'

/**
 * Brand lockup. Uses the uploaded logo at /public/asset/logo/logo.png when
 * present; if it's missing, falls back to the SARGA chevron mark + wordmark so
 * the header is never broken.
 */
export function Logo({ className }: { className?: string; compact?: boolean }) {


  return (
    <a href="#home" className={cn('group flex items-center', className)} aria-label="SARGA Rally home">
       <img
          src="/assets/logo/logo.png"
          alt="SARGA Rally"
          className="h-36 w-auto"
        />
    </a>
  )
}
