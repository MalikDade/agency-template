import { useReveal } from '../hooks/useReveal'
import PricingSection from '../components/Pricing'
import Maintenance from '../components/Maintenance'

export default function PricingPage() {
  useReveal()
  return (
    <>
      <PricingSection />
      <Maintenance />
    </>
  )
}
