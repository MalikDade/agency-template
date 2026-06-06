const year = new Date().getFullYear()

const footerLinks = {
  Services: ['Website Design', 'E-Commerce', 'SEO', 'Performance', 'Support'],
  Company: ['About Us', 'Our Work', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

const socials = [
  {
    name: 'Facebook',
    href: '#',
    icon: (
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    ),
  },
  {
    name: 'Instagram',
    href: '#',
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    name: 'LinkedIn',
    href: '#',
    icon: (
      <>
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <a href="#" className="text-2xl font-bold text-white tracking-tight">
              YourBrand
            </a>
            <p className="mt-4 text-gray-400 leading-relaxed text-sm max-w-xs">
              Professional web design and development for small businesses that want to grow online.
            </p>

            {/* Socials */}
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-indigo-600 flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    {s.icon}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="text-white font-semibold text-sm mb-4">{heading}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-gray-400 hover:text-indigo-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
          <p className="text-gray-500">© {year} YourBrand. All rights reserved.</p>
          <p className="text-gray-600">
            Built with{' '}
            <span className="text-indigo-400">React + Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
