'use client'

import { type FormEvent, useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, FileText, Menu, MessageCircle, Phone, X } from 'lucide-react'
import {
  AURUM_PHONE_DISPLAY,
  AURUM_PHONE_LINK,
  AURUM_SECONDARY_PHONE_DISPLAY,
  AURUM_SECONDARY_PHONE_LINK,
  AURUM_WHATSAPP_LINK,
} from '@/lib/aurum-contact'

const base = '/aurum-lp2/'
const scenes = [
  ['Sky Walker Steps', 'Steps-inside.jpg'], ['Sky Walker Entrance', 'Entrance-2.jpg'], ['Bottom View', 'Amenities.jpg'], ['Entrance', 'Entrance.jpg'], ['Temple', 'Temple.jpg'], ['Garden Area', 'Garden-View.jpg'], ['Clubhouse', 'Clubhouse.jpg'], ['Swimming Pool', 'Swimming-Pool.jpg'], ['Sky Walker', 'Sky-Walker.jpg'], ['Jogging Track', 'jogging-Track.jpg'], ['Top View', 'Top-View.jpg'],
]
const reasons = [
  ['ALL CORNER RESIDENCES', 'Every single apartment in Aurum is a corner unit — meaning maximum natural light, panoramic views, superior cross-ventilation, and total privacy from neighbours. This is an architectural rarity, not a privilege reserved for the few.'],
  ['12.5 FT GRAND CEILINGS', 'When you walk into your Aurum home, the volume stops you. At 12.5 feet, ceilings don’t just add height — they transform the entire emotional experience of a space, creating an atmosphere that feels palatial every single day.'],
  ['SMART HOME AUTOMATION', 'Central air-conditioning via VRV systems, advanced smart home automation, and intelligent climate control — your Aurum home anticipates your comfort. Technology woven seamlessly into the architecture of luxury.'],
  ['PRIME FINANCIAL DISTRICT ADDRESS', 'Minutes from WIPRO, Nvidia, Amazon, and Microsoft campuses. With ORR access via Gachibowli Exit 2 and Kokapet Exit 1, Aurum places you at the heart of Hyderabad’s economic powerhouse.'],
  ['DRIVE-FREE RESORT PODIUM', 'A vehicle-free elevated podium creates a resort-like sanctuary above the city. Children play freely. Families stroll without worry. Life unfolds at a pace that luxury demands — unhurried and undisturbed.'],
  ['HIGH VALUE APPRECIATION', 'Surrounded by Jayabheri Temple Tree Villas, Jayabheri Peak, and Lisa Grove Villas — Aurum is positioned in one of India’s fastest-appreciating micro-markets. Your investment grows as Hyderabad rises.'],
  ['SINGLE CONFIGURATION PER TOWER', 'Each tower houses only one unit type — an unprecedented design philosophy that ensures absolute exclusivity, community coherence, and a resident profile of true peers. This is Aurum’s social promise.'],
]
const heroStats: [number, string][] = [[54, 'Sky Floors'], [4, 'Towers'], [6, 'Acres']]
const stats: [number, string][] = [[54, 'SKY FLOORS'], [6, 'ACRES OF LAND AREA'], [4, 'ICONIC TOWERS'], [4, 'BHK ULTRA LUXURY FLATS'], [594, 'EXCLUSIVE UNITS'], [50000, 'SQFT CLUBHOUSE']]
const nearby = {
  'IT HUBS & OFFICES': 'Wipro Circle · Amazon · Microsoft · Infosys · Financial District · Gachibowli',
  'TOP SCHOOLS': 'Oakridge International School · The Gaudium School · Delhi Public School',
  HOSPITALS: 'Continental Hospitals · AIG Hospitals · Care Hospitals',
  'DINING & LEISURE': 'Sarath City Capital Mall · Inorbit Mall · Gandipet Lake',
}

function AnimatedNumber({ value, compact = false }: { value: number; compact?: boolean }) {
  const [count, setCount] = useState(0)
  const numberRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const element = numberRef.current
    if (!element) return

    let frame = 0
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (reduceMotion) {
        setCount(value)
        return
      }
      const started = performance.now()
      const duration = 1600
      const animate = (now: number) => {
        const progress = Math.min((now - started) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 4)
        setCount(Math.round(value * eased))
        if (progress < 1) frame = requestAnimationFrame(animate)
      }
      frame = requestAnimationFrame(animate)
    }, { threshold: 0.4 })

    observer.observe(element)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value])

  return <span ref={numberRef}>{compact && count >= 1000 ? `${Math.round(count / 1000)}K` : count.toLocaleString('en-IN')}</span>
}

export function AurumLanding({ variant = 'default' }: { variant?: 'default' | 'lp2' }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [slide, setSlide] = useState(0)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [openNearby, setOpenNearby] = useState<string | null>(null)

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.motion-reveal'))
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.14 })
    elements.forEach((element) => {
      element.classList.add('reveal-ready')
      observer.observe(element)
    })
    return () => observer.disconnect()
  }, [])

  const changeSlide = (n: number) => setSlide((current) => (current + n + scenes.length) % scenes.length)
  const submitEnquiry = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    setSubmissionStatus('sending')

    const formData = new FormData(form)
    const enquiry = Object.fromEntries(formData.entries())

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(enquiry),
      })
      if (!response.ok) throw new Error('Enquiry submission failed.')
      setSubmissionStatus('sent')
      form.reset()
    } catch {
      setSubmissionStatus('error')
    }
  }

  return <main className={variant === 'lp2' ? 'aurum-lp2' : undefined}>
    <header className="site-header">
      <a className="brand" href="#home" aria-label="Sree Varaaha Group home"><img src="/aurum-lp2/Sri-Varaha-Logo.svg" alt="Sree Varaaha Group" /></a>
      <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
        <a href="#home" onClick={() => setMenuOpen(false)}>Home</a><a href="#about" onClick={() => setMenuOpen(false)}>About Us</a><a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a><a href="#contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
        <a className="whatsapp" href={AURUM_WHATSAPP_LINK}>Whats App</a><a className="header-cta" href="#contact">Get In Touch</a>
      </nav>
      <button className="menu-toggle" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    <section className="hero" id="home">
      <img className="aurum-mark" src="/aurum-lp2/aurum_logo-2.png" alt="Aurum" />
      <p className="eyebrow">NANAKRAMGUDA, FINANCIAL DISTRICT, HYDERABAD</p>
      <h1>WHERE GOLD<br />MEETS THE SKY</h1>
      <a className="scroll-cue" href="#intro">SCROLL <ArrowDown size={16} /></a>
      <div className="hero-links"><a href={AURUM_WHATSAPP_LINK} aria-label="WhatsApp"><MessageCircle /></a><a href={AURUM_PHONE_LINK} aria-label="Call"><Phone /></a><a href="#contact"><FileText /> Brochure</a><a href="#contact"><FileText /> Enquiry Now</a></div>
    </section>
    <div className="hero-stats">{heroStats.map(([n,label])=><div key={label}><strong><AnimatedNumber value={n}/></strong><span>{label}</span></div>)}</div>
    <section className="intro section-pad" id="intro"><p className="section-kicker">A NEW HEIGHT OF LIVING</p><h2>54 floors. 4 towers. 6 acres of curated opulence. Aurum is not a home — it is a declaration. The most coveted address in Hyderabad&apos;s Financial District, rising above everything ordinary.</h2><div className="button-row"><a className="gold-button" href="#contact">EXPRESS INTEREST NOW <ArrowUpRight size={16}/></a><a className="line-button" href="#contact">BOOK YOUR SUITE <ArrowUpRight size={16}/></a></div></section>
    <section className="stats-band" aria-label="Project highlights">{stats.map(([n,label])=><div className="stat motion-reveal" key={label}><strong><AnimatedNumber value={n} compact={n === 50000}/></strong><span>{label}</span></div>)}</section>
    <section className="about section-pad" id="about"><div className="about-photo motion-reveal"><img src={base+'towers.jpg'} alt="Aurum towers rising above Hyderabad"/><span className="photo-caption">A LANDMARK ABOVE THE ORDINARY</span></div><div className="about-copy motion-reveal"><p className="section-kicker">ABOUT US</p><h2>AN ADDRESS THAT SPEAKS BEFORE YOU DO</h2><blockquote>“Not all views are equal. At Aurum, yours is the one everyone else looks up to.”</blockquote><p>Rising majestically at Nanakramguda — Hyderabad&apos;s most coveted Financial District, Aurum is Sree Varaaha Group&apos;s magnum opus. Four iconic towers, each ascending 54 floors, creating a skyline landmark visible from miles.</p><p>Every unit is a corner residence, offering uninterrupted panoramic views — the ORR on one side, ultra-luxury villa communities on the other. This isn&apos;t just a home; it is a statement of arrival.</p><a className="gold-button" href="#contact">EXPRESS INTEREST NOW <ArrowUpRight size={16}/></a></div></section>
    <section className="reasons section-pad" id="projects"><div className="section-heading"><div><p className="section-kicker">WHY AURUM</p><h2>SEVEN REASONS AURUM<br/>IS INCOMPARABLE</h2></div><a className="line-button" href="#contact">RESERVE YOUR FLOOR NOW <ArrowUpRight size={16}/></a></div><div className="reason-grid">{reasons.map(([title,desc],i)=><article className="reason motion-reveal" key={title}><span className="reason-number">0{i+1}</span><h3>{title}</h3><p>{desc}</p></article>)}</div></section>
    <section className="gallery section-pad" id="gallery"><div className="gallery-title"><p className="section-kicker">A GLIMPSE INTO YOUR WORLD</p><h2>VISUAL JOURNEY</h2><div className="gallery-controls"><button aria-label="Previous slide" onClick={()=>changeSlide(-1)}><ArrowLeft/></button><span>{String(slide+1).padStart(2,'0')} <i>/</i> {String(scenes.length).padStart(2,'0')}</span><button aria-label="Next slide" onClick={()=>changeSlide(1)}><ArrowRight/></button></div></div><div className="gallery-feature"><img key={scenes[slide][1]} src={base+scenes[slide][1]} alt={scenes[slide][0]}/><div className="gallery-caption"><span>0{slide+1}</span><h3>{scenes[slide][0].toUpperCase()}</h3></div></div><div className="gallery-thumbs">{scenes.map(([title,image],i)=><button className={slide===i?'active':''} key={title} onClick={()=>setSlide(i)} aria-label={`View ${title}`}><img src={base+image} alt=""/><span>{title}</span></button>)}</div></section>
    <section className="three-d-map section-pad" aria-labelledby="map-3d-title"><div className="three-d-heading"><p className="section-kicker">EXPLORE AURUM</p><h2 id="map-3d-title">3D MAP</h2><p>Explore the towers, residences, and amenities in the original interactive Aurum map.</p></div><div className="three-d-frame"><a className="three-d-gallery-bar" href="#gallery">GALLERY</a><iframe title="Aurum interactive 3D tower map" src="https://sreevaraaha-aurum.clove.build/" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen /></div></section>
    <section className="map-section section-pad"><div className={variant === 'lp2' ? 'map-copy' : 'motion-reveal'}><p className="section-kicker">YOUR WORLD, WITHIN REACH</p><h2>LOCATION &amp;<br/>CONNECTIVITY</h2><p className="map-intro">Nanakramguda isn&apos;t just a location. It&apos;s the epicentre of Hyderabad&apos;s future. Aurum places you exactly where ambition, opportunity, and leisure converge.</p><div className="nearby-list">{Object.entries(nearby).map(([title,desc])=><div className="nearby-item" key={title}><button aria-expanded={openNearby===title} onClick={()=>setOpenNearby(openNearby===title?null:title)}>{title}<span>{openNearby===title?'−':'+'}</span></button>{openNearby===title&&<p>{desc}</p>}</div>)}</div></div><div className="google-map motion-reveal"><iframe title="Aurum by Sree Varaaha on Google Maps" src="https://maps.google.com/maps?q=Aurum%20by%20sree%20varaha&amp;t=m&amp;z=13&amp;output=embed&amp;iwloc=near" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div></section>
    <section className="contact section-pad" id="contact"><div className="contact-copy"><p className="section-kicker">YOUR SKY MANSION AWAITS</p><h2>THE SKY IS NOT THE LIMIT — IT&apos;S YOUR ADDRESS.</h2><p>Submit your Expression of Interest today and secure your place among Hyderabad&apos;s most exclusive address. EOI limited — units are pre-registering fast.</p><div className="contact-details"><a href="https://maps.google.com/?q=Myscape+Weave+Financial+District+Hyderabad">5th Floor, Myscape Weave,<br/>Financial District, Gachibowli,<br/>Hyderabad, Telangana, India — 500032.</a><a href={AURUM_PHONE_LINK}>{AURUM_PHONE_DISPLAY}</a><a href={AURUM_SECONDARY_PHONE_LINK}>{AURUM_SECONDARY_PHONE_DISPLAY}</a><a href="mailto:sales@sreevaraahagroup.com">sales@sreevaraahagroup.com</a></div></div><form className="enquiry-form" onSubmit={submitEnquiry}><p className="section-kicker">BEGIN YOUR STORY</p><h3>RESERVE YOUR SKY MANSION</h3><label>Full Name<input required name="fullName" autoComplete="name" placeholder="Your full name"/></label><label>Phone<input required name="phone" type="tel" autoComplete="tel" placeholder="Your phone number"/></label><label>Email<input required name="email" type="email" autoComplete="email" placeholder="Your email address"/></label><label>Message<textarea name="message" rows={3} placeholder="Tell us what you’re looking for"/></label><button className="gold-button" type="submit" disabled={submissionStatus === 'sending'}>{submissionStatus === 'sending' ? 'SENDING…' : submissionStatus === 'sent' ? <><Check size={16}/> THANK YOU — WE’LL BE IN TOUCH</> : 'SEND ENQUIRY'}</button><p className={`form-status ${submissionStatus}`} role="status" aria-live="polite">{submissionStatus === 'error' ? 'We could not send your enquiry. Please try again or call us.' : submissionStatus === 'sent' ? 'Your enquiry was received.' : ''}</p><small>Your details will only be used to respond to your enquiry.</small></form></section>
    <footer className="footer"><div className="footer-top"><div><a href="#home"><img src="/aurum-lp2/Sri-Varaha-Logo.svg" alt="Sree Varaaha Group"/></a><p>Sree Varaaha Group is a beacon of quality and integrity in the realm of real estate construction.</p></div><div><h3>QUICK LINKS</h3><a href="#home">Home</a><a href="#about">About Us</a><a href="#projects">Projects</a><a href="#contact">Contact Us</a></div><div><h3>CONTACT US</h3><p>5th Floor, Myscape Weave, Financial District, Gachibowli, Hyderabad-500032.</p><a href="mailto:sales@sreevaraahagroup.com">sales@sreevaraahagroup.com</a><a href={AURUM_PHONE_LINK}>{AURUM_PHONE_DISPLAY}</a><a href={AURUM_SECONDARY_PHONE_LINK}>{AURUM_SECONDARY_PHONE_DISPLAY}</a></div></div><div className="footer-bottom"><span>Copyright © 2026 - Sree Varaaha Group</span><a href="#home">BACK TO TOP ↑</a></div></footer>
    <a className="chat-launch" href={AURUM_WHATSAPP_LINK} aria-label="Chat with Sree Varaaha Group"><img src="/aurum-lp2/chatbubble-icon.png" alt=""/></a>
  </main>
}
