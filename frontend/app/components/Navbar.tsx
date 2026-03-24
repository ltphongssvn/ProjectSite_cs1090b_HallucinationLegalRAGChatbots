/**
 * Navbar — site-wide navigation
 */
import Link from 'next/link'

const navLinks = [
  { href: '/research-question', label: 'Research Question' },
  { href: '/methodology', label: 'Methodology' },
  { href: '/architectures', label: 'Architectures' },
  { href: '/datasets', label: 'Datasets' },
  { href: '/environment', label: 'Environment' },
  { href: '/reproducibility', label: 'Reproducibility' },
  { href: '/results', label: 'Results' },
  { href: '/demo', label: 'Demo' },
  { href: '/ethics', label: 'Ethics' },
]

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="w-full px-6 flex items-center justify-between h-14">
        <Link href="/" className="font-bold text-gray-900 text-sm whitespace-nowrap">
          Legal RAG — CS1090B
        </Link>
        <ul className="flex items-center gap-1 overflow-x-auto">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
