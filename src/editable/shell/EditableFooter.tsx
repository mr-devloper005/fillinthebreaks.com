'use client'
import Link from 'next/link'
import { MapPin, Search, ShieldCheck } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const { session, logout } = useEditableLocalAuthSession()
  return <footer className="bg-[var(--editable-footer-bg)] text-white">
    <div className="bg-[#65c9e5] px-5 py-10 text-center text-[#102d68]"><p className="text-xs font-extrabold uppercase tracking-[.22em]">Ready to make a connection?</p><h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">Find what you need. Share what you offer.</h2><Link href="/search" className="nav-gold mt-5 inline-flex"><Search className="h-4 w-4"/>Search now</Link></div>
    <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-5 py-12 md:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
      <div><Link href="/" className="flex items-center gap-3"><img src="/favicon.png" alt="" className="h-12 w-12 shrink-0 rounded-full object-cover" /><span className="text-2xl font-extrabold">fillinthebreaks</span></Link><p className="mt-5 max-w-md text-sm leading-7 text-white/65">A practical place to discover local offers, trusted services, jobs, rentals, and useful opportunities.</p><div className="mt-5 flex gap-4 text-xs font-bold uppercase tracking-wider text-white/55"><span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-[#65c9e5]"/>Local discovery</span><span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-[#65c9e5]"/>Clear listings</span></div></div>
      <div><h3 className="footer-title">Explore</h3><div className="footer-links"><Link href="/classified">Classified</Link><Link href="/">Home</Link><Link href="/about">About</Link><Link href="/search">Search</Link></div></div>
      <div><h3 className="footer-title">Account</h3><div className="footer-links">{session ? <><Link href="/create">Create</Link><button onClick={logout}>Logout</button></> : <><Link href="/login">Login</Link><Link href="/signup">Sign up</Link></>}<Link href="/contact">Contact</Link></div></div>
    </div>
    <div className="border-t border-white/10 px-5 py-5 text-center text-xs tracking-wider text-white/45">© {new Date().getFullYear()} {SITE_CONFIG.name}. Built for useful local connections.</div>
  </footer>
}
