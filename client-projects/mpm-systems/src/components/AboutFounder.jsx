import { Link } from 'react-router-dom'
import SlideshowBg from './SlideshowBg'

const IMAGES = [
  '/malik-speaking-1.jpg',
  '/malik-speaking-2.jpg',
]

export default function AboutFounder() {
  return (
    <section style={{ padding: '140px 40px 120px', position: 'relative', overflow: 'hidden' }}>
      <SlideshowBg images={IMAGES} interval={7000} overlay="linear-gradient(180deg, rgba(8,15,23,0.94) 0%, rgba(8,15,23,0.91) 40%, rgba(8,15,23,0.96) 100%)" />
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,136,42,0.06) 0%, transparent 65%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 780, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 56 }}>
          <p className="label" style={{ marginBottom: 20 }}>About Making Power Moves</p>

          {/* Malik's photo */}
          <div
            style={{
              width: 128, height: 128, margin: '0 auto 28px',
              borderRadius: '50%',
              border: '1px solid rgba(212,136,42,0.5)',
              background: 'rgba(212,136,42,0.08)',
              overflow: 'hidden',
            }}
          >
            <img src="/malik-office.jpg" alt="Malik Dade" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top center' }} />
          </div>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(30px, 4.5vw, 46px)', fontWeight: 900, color: 'var(--white)', lineHeight: 1.1, marginBottom: 10 }}>
            Malik Dade
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', color: 'rgba(232,168,85,0.95)', textTransform: 'uppercase' }}>
            Owner, Making Power Moves LLC
          </p>
        </div>

        <div className="gold-rule reveal" style={{ marginBottom: 56 }} />

        {/* Body copy */}
        <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <p style={{ fontSize: 17, color: 'var(--platinum)', lineHeight: 1.85 }}>
            Well, I see you've already met my assistant, Dan Carter. I built him myself — voice, face, and all — as the first real proof of what MPM Systems can build for you. I'm Malik Dade, owner of Making Power Moves.
          </p>

          <p style={{ fontSize: 17, color: 'var(--platinum)', lineHeight: 1.85 }}>
            Making Power Moves is the headquarters. It's where you come to make powerful moves toward your dreams, your goals, and your financial freedom. MPM Systems is the first creation to come out of it, built around one goal: giving people their time back. Not just a website — an automated system that handles the missed calls, the booking, the back-and-forth, so you're not stuck doing everything yourself. Every hour that used to go to busywork is an hour back in your life.
          </p>

          <p style={{ fontSize: 17, color: 'var(--platinum)', lineHeight: 1.85 }}>
            I didn't start here. I built this company nights and weekends while working as a nurse — showing up for other people's shifts, running other people's systems. MPM Systems is what happens when you decide to stop running someone else's operation and start building your own.
          </p>

          <p style={{ fontSize: 17, color: 'var(--platinum)', lineHeight: 1.85 }}>
            This is one piece of something bigger. As we expand and grow, Making Power Moves will have a hand across industries — real estate, music, healthcare information, and, of course, building systems like this one that give people their freedom back. It's all one thing growing in the same direction, as God guides it.
          </p>

          <p style={{ fontSize: 17, color: 'var(--white)', lineHeight: 1.85, fontWeight: 600 }}>
            If Dan already showed you what an AI system can do for a business, that wasn't a demo. That's the actual product. Let's build yours.
          </p>
        </div>

        {/* CTA */}
        <div className="reveal" style={{ marginTop: 56, textAlign: 'center' }}>
          <Link to="/book" className="btn-gold" style={{ fontSize: 11, textDecoration: 'none' }}>
            Book a Discovery Call →
          </Link>
        </div>

      </div>
    </section>
  )
}
