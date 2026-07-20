import Link from 'next/link'
import { ArrowRight, BriefcaseBusiness, MapPin, Search, ShieldCheck, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type Props = { primaryTask: TaskKey; primaryRoute: string; posts: SitePost[]; timeSections: HomeTimeSection[] }
const wrap = 'mx-auto w-full max-w-[var(--editable-container)] px-5 lg:px-8'
const allPosts = (posts: SitePost[], sections: HomeTimeSection[]) => Array.from(new Map([...posts, ...sections.flatMap(s => s.posts)].map(p => [p.slug || p.id || p.title, p])).values())

function safeTitle(post?: SitePost) { return post?.title?.trim() || 'New community listing' }
function Card({ post, href, mode = 'tile' }: { post: SitePost; href: string; mode?: 'tile'|'wide'|'compact'|'image' }) {
  const image = getEditablePostImage(post)
  if (mode === 'compact') return <Link href={href} className="group flex items-center gap-4 border-b border-[#dfe3eb] py-5"><span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#eaf8fc] text-[#17356f]"><BriefcaseBusiness className="h-5 w-5"/></span><span className="min-w-0"><span className="text-[11px] font-extrabold uppercase tracking-[.16em] text-[#2688ae]">{getEditableCategory(post)}</span><strong className="mt-1 block line-clamp-2 text-base text-[#102d68] group-hover:text-[#2688ae]">{safeTitle(post)}</strong></span><ArrowRight className="ml-auto h-4 w-4 shrink-0 text-[#ffc928]"/></Link>
  if (mode === 'wide') return <Link href={href} className="group grid overflow-hidden rounded-xl border border-[#dfe3eb] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:grid-cols-[210px_1fr]"><div className="min-h-48 bg-[#edf0f5]"><img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/></div><div className="p-6"><span className="tag">{getEditableCategory(post)}</span><h3 className="mt-4 text-xl font-extrabold leading-tight text-[#102d68]">{safeTitle(post)}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-[#687189]">{getEditableExcerpt(post, 150) || 'Open this post to view the full details and connect with the person who shared it.'}</p></div></Link>
  return <Link href={href} className={`group overflow-hidden rounded-xl border border-[#dfe3eb] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${mode === 'image' ? 'card-float' : ''}`}><div className="relative aspect-[4/3] overflow-hidden bg-[#edf0f5]"><img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/><span className="tag absolute left-4 top-4">{getEditableCategory(post)}</span></div><div className="p-5"><h3 className="line-clamp-2 text-lg font-extrabold leading-snug text-[#102d68]">{safeTitle(post)}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-[#687189]">{getEditableExcerpt(post, 110) || 'View details, availability, and contact information.'}</p><span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#2688ae]">View details <ArrowRight className="h-4 w-4"/></span></div></Link>
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: Props) {
  const items = allPosts(posts, timeSections).slice(0, 7)
  return <section className="hero-network relative overflow-hidden bg-[#102d68] text-white">
    <div className={`${wrap} relative z-10 flex min-h-[680px] flex-col items-center justify-center py-20 text-center`}>
      <span className="hero-kicker"><Sparkles className="h-4 w-4"/> Useful local classifieds</span>
      <h1 className="mt-6 max-w-4xl text-balance text-4xl font-extrabold leading-[1.08] tracking-[-.04em] sm:text-6xl">Make the right local connection.<br/><span className="text-[#65c9e5]">Fill in what’s missing.</span></h1>
      <p className="mt-5 max-w-2xl text-base leading-7 text-white/75 sm:text-lg">Browse offers, services, jobs, rentals, and opportunities in one clear community marketplace.</p>
      <form action="/search" className="mt-8 flex w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white p-2 shadow-[0_20px_55px_rgba(0,0,0,.25)] sm:flex-row"><label className="flex flex-1 items-center gap-3 px-4"><Search className="h-5 w-5 text-[#2688ae]"/><input name="q" placeholder="What are you looking for?" className="h-12 w-full bg-transparent text-[#102d68] outline-none placeholder:text-[#8a94a8]"/></label><button className="rounded-md bg-[#ffc928] px-7 py-3 font-extrabold uppercase tracking-wide text-[#102d68]">Search</button></form>
      <div className="mt-7 flex flex-wrap justify-center gap-3"><Link href="/classified" className="nav-gold">Browse classified</Link><Link href="/create" className="nav-outline">Post an ad</Link></div>
      <div className="network-orbit hidden md:block">{items.map((p,i)=><Link key={p.id || p.slug || i} href={postHref(primaryTask,p,primaryRoute)} className={`orbit-person orbit-${i}`}><img src={getEditablePostImage(p)} alt=""/></Link>)}</div>
    </div>
  </section>
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts, timeSections }: Props) {
  const items=allPosts(posts,timeSections).slice(0,10); if(!items.length)return null
  return <section className="border-b border-[#e2e5eb] bg-white py-14"><div className={wrap}><div className="text-center"><p className="eyebrow">Fresh opportunities</p><h2 className="section-title">What the community is sharing</h2><p className="section-copy">A live stream of useful offers, requests, services, and introductions.</p></div><div className="marquee-shell mt-9"><div className="marquee-track">{[...items,...items].map((p,i)=><div key={`${p.id}-${i}`} className="w-[280px] shrink-0"><Card post={p} href={postHref(primaryTask,p,primaryRoute)} mode="image"/></div>)}</div></div></div></section>
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: Props) {
  const items=allPosts(posts,timeSections).slice(0,7); if(!items.length)return null
  return <section className="bg-[#f4f5f7] py-16 sm:py-20"><div className={wrap}><div className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr]"><div><p className="eyebrow">Built for useful discovery</p><h2 className="section-title text-left">Find it, offer it, or request it.</h2><p className="mt-5 max-w-xl leading-8 text-[#687189]">Move from search to a useful local connection with focused, easy-to-understand classifieds.</p><div className="mt-8 grid gap-5 sm:grid-cols-3 lg:grid-cols-1">{[[Search,'Discover quickly','Search clear, current opportunities.'],[BriefcaseBusiness,'Compare useful offers','Review jobs, services, rentals, and deals.'],[ShieldCheck,'Share with clarity','Useful details make decisions easier.']].map(([Icon,title,copy])=>{const I=Icon as typeof Search;return <div key={String(title)} className="flex gap-4"><span className="feature-icon"><I/></span><div><h3 className="font-extrabold text-[#102d68]">{String(title)}</h3><p className="mt-1 text-sm leading-6 text-[#687189]">{String(copy)}</p></div></div>})}</div></div><div className="grid gap-5 sm:grid-cols-2">{items.slice(0,4).map((p,i)=><Card key={p.id||p.slug} post={p} href={postHref(primaryTask,p,primaryRoute)} mode={i===0?'wide':'tile'}/>)}</div></div></div></section>
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: Props) {
  const items=allPosts(posts,timeSections).slice(0,12); if(!items.length)return null
  return <section className="bg-white py-16 sm:py-20"><div className={wrap}><div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="eyebrow">Explore more</p><h2 className="section-title text-left">Listings worth a closer look</h2></div><Link href={primaryRoute} className="text-sm font-extrabold text-[#2688ae]">View everything →</Link></div><div className="mt-10 grid gap-x-10 lg:grid-cols-2">{items.map((p)=><Card key={p.id||p.slug} post={p} href={postHref(primaryTask,p,primaryRoute)} mode="compact"/>)}</div></div></section>
}

export function EditableHomeCta() { return <section className="bg-[#65c9e5] px-5 py-16 text-center text-[#102d68]"><MapPin className="mx-auto h-9 w-9"/><h2 className="mt-4 text-3xl font-extrabold sm:text-4xl">Have something valuable to share?</h2><p className="mx-auto mt-4 max-w-xl leading-7">Publish a clear classified that helps the right people find your offer.</p><Link href="/create" className="nav-gold mt-7 inline-flex">Create a post <ArrowRight className="h-4 w-4"/></Link></section> }
