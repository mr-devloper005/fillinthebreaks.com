'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Lock, MapPin, Send, Sparkles, UserRound } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const fieldClass = 'rounded-lg border border-[#dfe3eb] bg-white px-4 py-3.5 text-sm font-bold text-[#102d68] outline-none transition placeholder:text-[#8a94a8] focus:border-[#2688ae] focus:shadow-[0_0_0_3px_rgba(101,201,229,.18)]'

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'article') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[#f4f5f7] px-4 py-16 text-[#102d68] sm:px-6 lg:px-8">
          <section className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-[#dfe3eb] bg-white shadow-[0_30px_90px_rgba(16,45,104,.1)] md:grid-cols-[0.85fr_1.15fr]">
            <div className="flex min-h-72 items-center justify-center bg-[#102d68] text-[#ffc928]">
              <Lock className="h-20 w-20 opacity-80" />
            </div>
            <div className="self-center p-8 sm:p-12">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-[#2688ae]">{pagesContent.create.locked.badge}</p>
              <h1 className="mt-5 text-4xl font-black leading-[1.05] tracking-[-0.05em] sm:text-5xl">{pagesContent.create.locked.title}</h1>
              <p className="mt-6 max-w-xl text-base font-semibold leading-8 opacity-70">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="nav-gold">Login <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/signup" className="inline-flex items-center rounded-md border-2 border-[#102d68] px-6 py-3 text-xs font-black uppercase tracking-wider">Sign up</Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[#f4f5f7] text-[#102d68]">
        <section className="relative overflow-hidden bg-[#102d68] px-5 py-14 text-center text-white sm:py-16">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#65c9e5]/30" />
          <div className="relative mx-auto max-w-3xl"><p className="hero-kicker"><Sparkles className="h-4 w-4" />{pagesContent.create.hero.badge}</p><h1 className="mt-5 text-4xl font-black tracking-[-.04em] sm:text-5xl">Share what you offer.</h1><p className="mx-auto mt-4 max-w-2xl leading-7 text-white/70">Create a clear, useful post that helps the right people find and understand your offer.</p></div>
        </section>
        <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="overflow-hidden rounded-2xl border border-[#dfe3eb] bg-white shadow-[0_24px_70px_rgba(16,45,104,.09)]">
            <div className="flex flex-col gap-4 border-b border-[#dfe3eb] bg-[#eaf8fc] px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3"><span className="feature-icon"><MapPin /></span><div><p className="text-[10px] font-black uppercase tracking-[.2em] text-[#2688ae]">Community submission</p><p className="mt-1 text-sm font-bold text-[#102d68]">Add accurate details so people can respond confidently.</p></div></div>
              <span className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-[.12em]"><UserRound className="h-4 w-4 text-[#2688ae]" />{session.name}</span>
            </div>
            <form onSubmit={submit} className="p-6 sm:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2688ae]">Create a post</p>
                  <h2 className="mt-1 text-3xl font-black tracking-[-0.04em] text-[#102d68]">{pagesContent.create.formTitle}</h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                {enabledTasks.length > 1 ? <label className="grid gap-2 text-xs font-black uppercase tracking-[.14em] text-[#687189]">Post type<select className={fieldClass} value={task} onChange={(event) => setTask(event.target.value as TaskKey)}>{enabledTasks.map(item => <option key={item.key} value={item.key}>{item.label}</option>)}</select></label> : null}
                <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Post title" required />
                <div className="grid gap-4 sm:grid-cols-2">
                  <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Category" />
                  <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Website or source URL" />
                </div>
                <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Featured image URL" />
                <textarea className={`${fieldClass} min-h-24`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short summary" required />
                <textarea className={`${fieldClass} min-h-48`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Main content, details, notes, or description" required />
              </div>

              {created ? (
                <div className="mt-5 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                  <p className="flex items-center gap-2 text-sm font-black"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                  <p className="mt-1 text-sm font-semibold opacity-80">{created.title}</p>
                </div>
              ) : null}

              <button type="submit" className="mt-5 inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-lg bg-[#ffc928] px-6 text-sm font-black uppercase tracking-[0.18em] text-[#102d68] shadow-[0_10px_24px_rgba(255,193,34,.2)] transition hover:-translate-y-0.5 hover:brightness-105">
                <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
              </button>
            </form>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
