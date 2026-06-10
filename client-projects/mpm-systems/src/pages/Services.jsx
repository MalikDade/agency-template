import { useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import WhatWeBuild from '../components/WhatWeBuild'

export default function Services() {
  useReveal()
  return <WhatWeBuild />
}
