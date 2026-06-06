const stats = [
  { value: '50+', label: 'Clients Served' },
  { value: '5★', label: 'Average Rating' },
  { value: '7 Days', label: 'Avg. Launch Time' },
  { value: '98%', label: 'Retention Rate' },
]

const values = [
  { title: 'Transparent Pricing', desc: 'No surprises. You get a clear quote upfront — always.' },
  { title: 'You Own Everything', desc: 'Your domain, your code, your content. No lock-in, ever.' },
  { title: 'Real Communication', desc: 'Direct access to the person building your site, not a support bot.' },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — visual */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 aspect-square flex items-center justify-center">
              {/* Placeholder image — replace with real photo */}
              <div className="text-center text-indigo-300 p-12">
                <svg className="w-32 h-32 mx-auto mb-4 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <p className="text-indigo-400 font-medium">Team Photo Here</p>
              </div>
            </div>

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
              <p className="text-3xl font-extrabold text-indigo-600">5+</p>
              <p className="text-gray-500 text-sm font-medium">Years in Business</p>
            </div>
          </div>

          {/* Right — content */}
          <div>
            <span className="text-indigo-600 font-semibold text-sm uppercase tracking-widest">About Us</span>
            <h2 className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
              We Build Websites That <span className="text-indigo-600">Work Hard</span> for You
            </h2>
            <p className="mt-5 text-gray-500 text-lg leading-relaxed">
              We're a small, focused web agency dedicated to helping local and small businesses compete online.
              We combine clean design, technical excellence, and honest business practices to deliver sites
              that actually grow your business.
            </p>

            {/* Values */}
            <ul className="mt-8 space-y-4">
              {values.map((v) => (
                <li key={v.title} className="flex gap-4 items-start">
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{v.title}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{v.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-block mt-10 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-full font-semibold transition-colors"
            >
              Work With Us
            </a>
          </div>
        </div>

        {/* Stats row */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="bg-gray-50 rounded-2xl py-8 px-4">
              <p className="text-4xl font-extrabold text-indigo-600">{s.value}</p>
              <p className="text-gray-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
