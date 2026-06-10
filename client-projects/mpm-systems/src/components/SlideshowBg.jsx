import { useState, useEffect } from 'react'

export default function SlideshowBg({ images, interval = 5000, overlay = 'rgba(8,15,23,0.88)' }) {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % images.length), interval)
    return () => clearInterval(t)
  }, [images.length, interval])

  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {images.map((src, i) => (
        <div
          key={src}
          style={{
            position: 'absolute', inset: 0,
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === idx ? 1 : 0,
            transform: i === idx ? 'scale(1.06)' : 'scale(1)',
            transition: 'opacity 2s ease-in-out, transform 8s linear',
          }}
        />
      ))}
      <div style={{ position: 'absolute', inset: 0, background: overlay }} />
    </div>
  )
}
