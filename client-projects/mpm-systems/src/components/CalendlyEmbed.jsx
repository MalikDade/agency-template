import { useEffect, useRef } from 'react'

const CALENDLY_URL = 'https://calendly.com/malikdade20'

export default function CalendlyEmbed({ height = 700, minWidth = 320 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const parent = containerRef.current
    if (!parent) return

    const init = () => {
      if (!window.Calendly || !parent) return
      parent.innerHTML = ''
      window.Calendly.initInlineWidget({
        url: CALENDLY_URL,
        parentElement: parent,
      })
    }

    if (window.Calendly) {
      init()
      return undefined
    }

    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    script.onload = init
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      style={{
        minWidth,
        height,
        border: '1px solid rgba(212,136,42,0.16)',
        background: 'rgba(255,255,255,0.02)',
      }}
    />
  )
}
