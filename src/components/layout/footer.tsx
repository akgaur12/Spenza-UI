import { Link } from '@tanstack/react-router'
import { Logo } from '@/components/common/logo'
import { SITE_LINKS } from '@/config'

const LINK_CLASSES = 'text-sm text-muted-foreground hover:text-foreground'

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Logo />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Spenza. All rights reserved.</p>
        </div>

        <ul className="flex items-center gap-6">
          <li>
            <a href={SITE_LINKS.github} className={LINK_CLASSES}>
              GitHub
            </a>
          </li>
          <li>
            <a href={SITE_LINKS.medium} className={LINK_CLASSES}>
              Medium
            </a>
          </li>
          <li>
            <Link to="/about" className={LINK_CLASSES}>
              About
            </Link>
          </li>
          <li>
            <Link to="/privacy" className={LINK_CLASSES}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/terms" className={LINK_CLASSES}>
              Terms and Conditions
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
