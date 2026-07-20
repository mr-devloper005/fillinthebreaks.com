'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X, Plus, LogOut, UserRound } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const links = [
  { label: 'Classified', href: '/classified' },
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Search', href: '/search' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const active = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(`${href}/`))

  return (
    <header className="sticky top-0 z-50 bg-[var(--editable-nav-bg)] text-white shadow-[0_8px_28px_rgba(5,24,68,.18)]">
      <nav className="mx-auto flex min-h-[86px] max-w-[var(--editable-container)] items-center gap-7 px-5 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${SITE_CONFIG.name} home`}>
          <img src="/favicon.png" alt="" className="h-12 w-12 shrink-0 rounded-full object-cover" />
          <span className="editable-display text-xl font-extrabold tracking-[-.03em] sm:text-2xl">fillinthebreaks</span>
        </Link>
        <div className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((item) => <Link key={item.href} href={item.href} className={`nav-link ${active(item.href) ? 'nav-link-active' : ''}`}>{item.label}</Link>)}
        </div>
        <div className="hidden items-center gap-3 sm:flex">
          {session ? <>
            <span className="hidden items-center gap-2 text-sm font-bold text-white/90 xl:flex"><UserRound className="h-4 w-4 text-[var(--slot4-accent)]" />{session.name}</span>
            <Link href="/create" className="nav-outline"><Plus className="h-4 w-4" /> Create</Link>
            <button type="button" onClick={logout} className="nav-gold"><LogOut className="h-4 w-4" /> Logout</button>
          </> : <>
            <Link href="/login" className="nav-outline">Login</Link>
            <Link href="/signup" className="nav-gold">Sign up</Link>
          </>}
        </div>
        <button type="button" onClick={() => setOpen(!open)} className="ml-auto rounded border border-white/30 p-2 lg:hidden" aria-label="Toggle navigation">{open ? <X /> : <Menu />}</button>
      </nav>
      {open ? <div className="border-t border-white/10 px-5 py-5 lg:hidden">
        <form action="/search" className="mb-4 flex items-center gap-2 rounded bg-white/10 px-4 py-3"><Search className="h-4 w-4"/><input name="q" placeholder="Search classified listings" className="w-full bg-transparent text-sm outline-none placeholder:text-white/60" /></form>
        <div className="grid gap-1">{links.map(item => <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded px-4 py-3 font-bold hover:bg-white/10">{item.label}</Link>)}</div>
        <div className="mt-4 grid grid-cols-2 gap-3">{session ? <><Link href="/create" className="nav-outline justify-center">Create</Link><button onClick={logout} className="nav-gold justify-center">Logout</button><p className="col-span-2 text-center text-sm text-white/75">Signed in as {session.name}</p></> : <><Link href="/login" className="nav-outline justify-center">Login</Link><Link href="/signup" className="nav-gold justify-center">Sign up</Link></>}</div>
      </div> : null}
    </header>
  )
}
