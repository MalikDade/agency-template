export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-950 via-indigo-800 to-purple-700"
    >
      {/* Decorative blobs */}
      <div className="absolute top-1/4 -left-24 w-96 h-96 bg-indigo-500 opacity-20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-24 w-96 h-96 bg-purple-500 opacity-20 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 text-indigo-200 text-sm font-medium tracking-wide border border-white/20">
          Professional Web Solutions for Small Businesses
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
          We Build
          <br />
          <span className="text-indigo-300">AI-Powered Business Systems</span>
        </h1>

        <p className="text-lg md:text-xl text-indigo-200 max-w-2xl mx-auto mb-10 leading-relaxed">
          From websites to full automation — we build the complete digital system your business needs to grow.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="bg-white text-indigo-700 hover:bg-indigo-50 px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all hover:scale-105"
          >
            Start Your Project
          </a>
          <a
            href="#services"
            className="border-2 border-white/40 text-white hover:bg-white/10 px-8 py-4 rounded-full font-semibold text-lg transition-all"
          >
            See Our Services
          </a>
        </div>

        {/* Social proof strip */}
        <div className="mt-16 flex flex-wrap justify-center gap-8 text-indigo-200 text-sm">
          {['50+ Projects Delivered', '5-Star Rated', 'Fast Turnaround', 'Ongoing Support'].map((item) => (
            <div key={item} className="flex items-center gap-2">
              <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15l-4.121-4.121a1 1 0 011.414-1.414L8.414 12.172l6.879-6.879a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  )
}
