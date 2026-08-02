import { Logo } from '@/components/common/logo'

const LINKS = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms and Conditions', href: '#' },
]

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <Logo />
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Spenza. All rights reserved.</p>
        </div>

        <ul className="flex items-center gap-6">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
