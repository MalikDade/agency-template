import { useReveal } from '../hooks/useReveal'
import Hero from '../components/Hero'
import FounderTeaser from '../components/FounderTeaser'

export default function Home({ onStartTour }) {
  useReveal()
  return (
    <>
      <Hero onStartTour={onStartTour} />
      <FounderTeaser />
    </>
  )
}
