import type { Metadata } from 'next'
import { AurumLanding } from '@/components/aurum-landing'
import './aurum-lp2.css'

export const metadata: Metadata = {
  title: 'Aurum - Sree Varaaha Group',
  description: 'Discover Aurum, the ultra-luxury residences in Hyderabad’s Financial District.',
  robots: {
    index: false,
    follow: true,
  },
}

export default function AurumLp2Page() {
  return <AurumLanding variant="lp2" />
}
