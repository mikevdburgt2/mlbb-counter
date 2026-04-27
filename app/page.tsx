'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import {
  fetchHeroes, fetchHeroDetail, fetchHeroStats, heroSlug,
  HeroBasic, HeroDetail, HeroStats, CounterEntry, Skill,
} from '@/lib/api'
import HeartButton from '@/components/HeartButton'

type Tab = 'overview' | 'counters'


const FALLBACK_HEROES: HeroBasic[] = [
  { hero_id: 1,  name: 'Moskov',   alias: 'Moskov',   head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 2,  name: 'Fanny',    alias: 'Fanny',    head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 3,  name: 'Ling',     alias: 'Ling',     head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 4,  name: 'Gusion',   alias: 'Gusion',   head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 5,  name: 'Lancelot', alias: 'Lancelot', head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 6,  name: 'Chou',     alias: 'Chou',     head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 7,  name: 'Kagura',   alias: 'Kagura',   head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 8,  name: 'Beatrix',  alias: 'Beatrix',  head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 9,  name: 'Wanwan',   alias: 'Wanwan',   head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 10, name: 'Aldous',   alias: 'Aldous',   head: '', relation: { strong: [], weak: [], assist: [] } },
]

function tierInfo(winRate: number, pickRate: number) {
  if (winRate > 0.54 && pickRate > 0.08) return { label: 'S+', color: '#ff4e50', bg: 'rgba(255,78,80,.15)' }
  if (winRate > 0.52) return { label: 'S',  color: '#ff8c42', bg: 'rgba(255,140,66,.15)' }
  if (winRate > 0.50) return { label: 'A',  color: '#ffd460', bg: 'rgba(255,212,96,.15)' }
  if (winRate > 0.48) return { label: 'B',  color: '#9a9eb5', bg: 'rgba(154,158,181,.15)' }
  return { label: 'C', color: '#6b7280', bg: 'rgba(107,114,128,.15)' }
}

function pct(n: number, decimals = 2) {
  return `${(n * 100).toFixed(decimals)}%`
}

export default function Home() {
  const { data: session } = useSession()
  const [heroes, setHeroes]           = useState<HeroBasic[]>([])
  const [heroMap, setHeroMap]         = useState<Map<number, HeroBasic>>(new Map())
  const [query, setQuery]             = useState('')
  const [suggestions, setSuggestions] = useState<HeroBasic[]>([])
  const [showSug, setShowSug]         = useState(false)
  const [selected, setSelected]       = useState<HeroBasic | null>(null)
  const [detail, setDetail]           = useState<HeroDetail | null>(null)
  const [stats, setStats]             = useState<HeroStats | null>(null)
  const [activeTab, setActiveTab]     = useState<Tab>('counters')
  const [loading, setLoading]         = useState(false)
  const [heroesReady, setHeroesReady] = useState(false)

  const [popularHeroes, setPopularHeroes] = useState<HeroBasic[]>([])
  const [fetchError, setFetchError]       = useState<string | null>(null)
  const [favoritedIds, setFavoritedIds]   = useState<Set<number>>(new Set())

  const cache  = useRef<Map<number, { detail: HeroDetail | null; stats: HeroStats | null }>>(new Map())
  const searchRef = useRef<HTMLDivElement>(null)

  const loadHero = useCallback(async (hero: HeroBasic) => {
    setSelected(hero)
    setQuery(hero.name)
    setShowSug(false)
    setLoading(true)
    setDetail(null)
    setStats(null)

    if (cache.current.has(hero.hero_id)) {
      const cached = cache.current.get(hero.hero_id)!
      setDetail(cached.detail)
      setStats(cached.stats)
      setLoading(false)
      return
    }

    const slug = heroSlug(hero.name)
    const [d, s] = await Promise.all([fetchHeroDetail(slug), fetchHeroStats(slug)])
    cache.current.set(hero.hero_id, { detail: d, stats: s })
    setDetail(d)
    setStats(s)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (!session) return
    fetch('/api/favorites')
      .then(r => r.ok ? r.json() : [])
      .then((list: { heroId: number }[]) => setFavoritedIds(new Set(list.map(f => f.heroId))))
      .catch(() => {})
  }, [session])

  useEffect(() => {
    fetchHeroes()
      .then(list => {
        console.log(`[MLBB] Loaded ${list.length} heroes from API`)
        const sorted = [...list].sort((a, b) => a.name.localeCompare(b.name))
        setHeroes(sorted)
        setPopularHeroes(list.slice(0, 10))
        setHeroMap(new Map(list.map(h => [h.hero_id, h])))
        setHeroesReady(true)
      })
      .catch(err => {
        const msg = err instanceof Error ? err.message : String(err)
        console.error('[MLBB] fetchHeroes failed — using fallback:', msg)
        setFetchError(msg)
        const sorted = [...FALLBACK_HEROES].sort((a, b) => a.name.localeCompare(b.name))
        setHeroes(sorted)
        setPopularHeroes(FALLBACK_HEROES.slice(0, 10))
        setHeroMap(new Map(FALLBACK_HEROES.map(h => [h.hero_id, h])))
        setHeroesReady(true)
      })
  }, [loadHero])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSug(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const handleQuery = useCallback((val: string) => {
    setQuery(val)
    const trimmed = val.trim()
    if (trimmed.length === 0) {
      setSuggestions(popularHeroes)
    } else {
      const q = trimmed.toLowerCase()
      const filtered = heroes.filter(h =>
        h.name.toLowerCase().includes(q) ||
        (h.alias && h.alias.toLowerCase().includes(q))
      ).slice(0, 8)
      setSuggestions(filtered)
    }
    setShowSug(true)
  }, [heroes, popularHeroes])

  const tier = stats ? tierInfo(stats.winRate, stats.pickRate) : null

  return (
    <div className="min-h-screen text-gray-100" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>

      {/* ── Sticky header ── */}
      <header className="sticky top-0 z-50 bg-[#080e1e]/90 backdrop-blur-md border-b border-purple-900/30" style={{ boxShadow: '0 1px 0 rgba(139,92,246,0.15)' }}>
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center gap-2.5 mb-2.5">
            <svg
              viewBox="0 0 20 20"
              className="w-6 h-6 fill-current flex-shrink-0"
              style={{ color: '#f5a623', filter: 'drop-shadow(0 0 6px rgba(245,166,35,0.7))' }}
            >
              <path d="M10 2L12.4 7.5H18L13.3 11l1.9 5.8L10 13.5l-5.2 3.3L6.7 11 2 7.5h5.6z"/>
            </svg>
            <span className="neon-logo font-black text-xl tracking-wide">MLBB Counter</span>
            <div className="ml-auto flex items-center gap-2">
              {session ? (
                <>
                  <Link href="/dashboard" className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium px-3 py-1.5 rounded-lg border border-purple-900/40 hover:border-purple-500/40">
                    {session.user?.name ?? 'Dashboard'}
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-xs font-medium text-white px-3 py-1.5 rounded-lg transition-all" style={{ background: 'linear-gradient(135deg, #7c3aed, #06b6d4)' }}>
                  Sign in
                </Link>
              )}
            </div>
          </div>

          {/* Search */}
          <div ref={searchRef} className="relative">
            <div className="relative">
              <svg viewBox="0 0 20 20" className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 fill-current pointer-events-none">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"/>
              </svg>
              <input
                type="text"
                value={query}
                onChange={e => handleQuery(e.target.value)}
                onFocus={() => handleQuery(query)}
                placeholder="Search hero name (e.g. Fanny, Ling, Moskov)"
                className="w-full bg-[#0d1624] border border-[#1e2d55] rounded-xl pl-10 pr-4 py-2.5 text-sm placeholder-gray-600 neon-focus transition-colors"
              />
              {!heroesReady && (
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {showSug && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-[#0a1222] border border-purple-900/40 rounded-xl overflow-hidden z-50 shadow-2xl card-glow">
                {query.trim() === '' && (
                  <div className="px-4 py-2 text-[11px] text-purple-400/50 border-b border-purple-900/25 uppercase tracking-wider">Popular heroes</div>
                )}
                {suggestions.map(h => (
                  <button
                    key={h.hero_id}
                    onMouseDown={() => loadHero(h)}
                    className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-purple-950/30 transition-colors text-left"
                  >
                    <img src={h.head} alt={h.name} className="w-8 h-8 rounded-full object-cover bg-[#0f1a30]" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-medium leading-tight">{h.name}</span>
                      {h.alias && h.alias !== h.name && (
                        <span className="text-[11px] text-gray-500 leading-tight">{h.alias}</span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Fetch error banner ── */}
      {fetchError && (
        <div className="bg-red-900/60 border border-red-500/60 text-red-200 text-sm px-4 py-3 flex items-start gap-3">
          <span className="text-red-400 text-base mt-0.5 shrink-0">⚠</span>
          <div>
            <strong className="text-red-300">Hero data unavailable:</strong>{' '}
            {fetchError}
            <span className="ml-2 text-red-400/70">(showing fallback heroes)</span>
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <main className="max-w-2xl mx-auto px-4 pb-16 pt-4">

        {/* Empty state */}
        {!selected && !loading && heroesReady && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4 opacity-40">⚔</div>
            <p className="text-gray-500">Search for a hero to see counters &amp; stats</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="text-center py-20">
            <div className="w-9 h-9 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Loading hero data…</p>
          </div>
        )}

        {selected && !loading && (
          <>
            {/* ── Hero card ── */}
            <div className="bg-[#0d1624] rounded-2xl border border-purple-900/40 p-4 mb-4 card-glow">
              <div className="flex items-start gap-4">
                <img
                  src={selected.head}
                  alt={selected.name}
                  className="w-20 h-20 rounded-2xl object-cover flex-shrink-0 border border-[#1e2d55]"
                />
                <div className="flex-1 min-w-0">
                  <h1 className="text-lg font-bold leading-tight">{selected.name}</h1>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {detail?.role && (
                      <Tag color="orange">{detail.role}</Tag>
                    )}
                    {detail?.lane && (
                      <Tag color="blue">{detail.lane}</Tag>
                    )}
                    {detail?.specialties?.map(s => (
                      <Tag key={s} color="purple">{s}</Tag>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  {tier && (
                    <div
                      className="rounded-xl px-3 py-2 text-center"
                      style={{ background: tier.bg }}
                    >
                      <div className="text-2xl font-black leading-none" style={{ color: tier.color }}>
                        {tier.label}
                      </div>
                      <div className="text-[10px] text-gray-500 mt-0.5">Tier</div>
                    </div>
                  )}
                  <HeartButton
                    key={selected.hero_id}
                    heroId={selected.hero_id}
                    heroName={selected.name}
                    heroHead={selected.head}
                    initialFavorited={favoritedIds.has(selected.hero_id)}
                    onToggle={(id, fav) =>
                      setFavoritedIds(prev => {
                        const next = new Set(prev)
                        fav ? next.add(id) : next.delete(id)
                        return next
                      })
                    }
                  />
                </div>
              </div>

              {/* Stats row */}
              {stats && (
                <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-purple-900/30">
                  <StatCell label="Win Rate"  value={pct(stats.winRate)}  color="text-emerald-400" />
                  <StatCell label="Pick Rate" value={pct(stats.pickRate)} color="text-sky-400" />
                  <StatCell label="Ban Rate"  value={pct(stats.banRate)}  color="text-rose-400" />
                </div>
              )}
            </div>

            {/* ── Tabs ── */}
            <div className="flex gap-2 mb-5 bg-[#080e1e]/80 p-1.5 rounded-2xl border border-purple-900/40 card-glow">
              {(['overview', 'counters'] as Tab[]).map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all capitalize tracking-wide ${
                    activeTab === t
                      ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white tab-glow shadow-lg'
                      : 'text-purple-300/50 hover:text-purple-200 hover:bg-purple-950/30'
                  }`}
                >
                  {t === 'counters' ? '⚔ Counters' : '📋 Overview'}
                </button>
              ))}
            </div>

            {/* ── COUNTERS TAB ── */}
            {activeTab === 'counters' && (
              <div className="space-y-3">

                {/* Best counters section */}
                <div className="bg-[#0d1624] rounded-2xl border border-purple-900/40 overflow-hidden card-glow">
                  <div className="px-4 py-4 border-b border-purple-900/30">
                    <div className="text-[11px] text-purple-400/60 uppercase tracking-widest mb-1">Best Counters</div>
                    <div className="text-base font-bold leading-snug">
                      vs <span className="text-cyan-400">{selected.name}</span>
                    </div>
                    <div className="text-[11px] text-gray-500 mt-0.5">Pick these heroes to win the matchup</div>
                  </div>

                  <div className="p-3 space-y-2">
                    {stats?.counters.length ? (
                      [...stats.counters]
                        .sort((a, b) => Math.abs(b.deltaWinRate) - Math.abs(a.deltaWinRate))
                        .slice(0, 6)
                        .map((c, idx) => {
                          const h = heroMap.get(c.heroId)
                          const advantage = Math.abs(c.deltaWinRate)
                          const isHard = advantage >= 0.05
                          const head = c.head || h?.head || ''
                          return (
                            <button
                              key={c.heroId}
                              onClick={() => h && loadHero(h)}
                              disabled={!h}
                              className="flex items-center gap-3 w-full bg-[#080e1e]/60 hover:bg-purple-950/40 rounded-xl px-3 py-3 transition-colors text-left disabled:opacity-40 border border-transparent hover:border-purple-900/30"
                            >
                              <span className="text-gray-600 text-xs font-mono w-4 flex-shrink-0 text-center">{idx + 1}</span>
                              {head ? (
                                <img src={head} alt={h?.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-[#1e2d55]" />
                              ) : (
                                <div className="w-12 h-12 rounded-xl bg-[#1e2d55] flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-gray-100 truncate leading-tight">
                                  {h?.name ?? `Hero #${c.heroId}`}
                                </div>
                                <div className="mt-1.5">
                                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                    isHard
                                      ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                                      : 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                                  }`}>
                                    {isHard ? 'Hard Counter' : 'Good Counter'}
                                  </span>
                                </div>
                              </div>
                              {advantage > 0 && (
                                <div className="flex-shrink-0 text-right">
                                  <div className="text-xl font-black text-emerald-400 leading-none">
                                    +{pct(advantage, 1)}
                                  </div>
                                  <div className="text-[10px] text-gray-500 mt-0.5">win adv.</div>
                                </div>
                              )}
                            </button>
                          )
                        })
                    ) : (
                      <Empty />
                    )}
                  </div>
                </div>

                {/* Synergies */}
                <Section
                  icon="🤝"
                  title="Best Synergies"
                  subtitle="Teammates that boost your win rate"
                >
                  {stats?.synergies.length ? (
                    stats.synergies.slice(0, 5).map(c => (
                      <HeroRow
                        key={c.heroId}
                        entry={c}
                        hero={heroMap.get(c.heroId)}
                        positive
                        onSelect={h => loadHero(h)}
                      />
                    ))
                  ) : (
                    <Empty />
                  )}
                </Section>
              </div>
            )}

            {/* ── OVERVIEW TAB ── */}
            {activeTab === 'overview' && (
              <div className="space-y-4">

                {/* Lore */}
                {detail?.story ? (
                  <Section icon="📖" title="Lore">
                    <p className="text-gray-400 text-sm leading-relaxed">{detail.story}</p>
                  </Section>
                ) : null}

                {/* Hero Info */}
                {(detail?.role || detail?.lane || detail?.specialties?.length) ? (
                  <Section icon="ℹ" title="Hero Info">
                    <div className="grid grid-cols-2 gap-2">
                      {detail?.role && <InfoBlock label="Role" value={detail.role} />}
                      {detail?.lane && <InfoBlock label="Lane" value={detail.lane} />}
                      {detail?.specialties?.length ? (
                        <InfoBlock
                          label="Specialties"
                          value={detail.specialties.join(' · ')}
                          wide={detail.specialties.length > 1}
                        />
                      ) : null}
                    </div>
                  </Section>
                ) : null}

                {/* Abilities */}
                {detail?.skills?.length ? (
                  <Section icon="⚡" title="Abilities" subtitle={`${detail.skills.length} skills`}>
                    <div className="space-y-2">
                      {detail.skills.map((skill, i) => (
                        <SkillCard key={i} skill={skill} />
                      ))}
                    </div>
                  </Section>
                ) : null}

                {/* Performance */}
                {stats ? (
                  <Section icon="📊" title="Performance">
                    <div className="space-y-3">
                      <RateBar label="Win Rate"  value={stats.winRate}  color="#34d399" base={0.5} />
                      <RateBar label="Pick Rate" value={stats.pickRate} color="#38bdf8" base={0} />
                      <RateBar label="Ban Rate"  value={stats.banRate}  color="#fb7185" base={0} />
                    </div>
                  </Section>
                ) : null}

                {/* Matchup Summary */}
                <Section icon="⚔" title="Matchup Summary">
                  <div className="space-y-2.5">
                    <MatchLine label="Strong Against" value={`${selected.relation.strong.length} heroes`} color="text-emerald-400" />
                    <MatchLine label="Weak Against"   value={`${selected.relation.weak.length} heroes`}   color="text-rose-400" />
                    <MatchLine label="Best Synergies" value={`${stats?.synergies.length ?? 0} heroes`}    color="text-sky-400" />
                    <MatchLine label="Known Counters" value={`${stats?.counters.length ?? 0} heroes`}     color="text-amber-400" />
                  </div>
                </Section>

                {/* Top Counters preview */}
                {stats?.counters.length ? (
                  <Section icon="🚨" title="Top Counters" subtitle="Heroes that beat this hero hardest">
                    {[...stats.counters]
                      .sort((a, b) => Math.abs(b.deltaWinRate) - Math.abs(a.deltaWinRate))
                      .slice(0, 3)
                      .map(c => (
                        <HeroRow
                          key={c.heroId}
                          entry={c}
                          hero={heroMap.get(c.heroId)}
                          negative
                          onSelect={h => { loadHero(h); setActiveTab('counters') }}
                        />
                      ))}
                    <button
                      onClick={() => setActiveTab('counters')}
                      className="w-full mt-2 text-xs text-cyan-400 hover:text-cyan-300 transition-colors py-1"
                    >
                      View all counters →
                    </button>
                  </Section>
                ) : null}

                {/* No data fallback */}
                {!detail && !stats && (
                  <div className="bg-[#0d1624] rounded-2xl border border-purple-900/40 p-8 text-center card-glow">
                    <div className="text-3xl mb-3 opacity-30">📋</div>
                    <p className="text-gray-500 text-sm">No overview data available for this hero</p>
                  </div>
                )}
              </div>
            )}

          </>
        )}
      </main>
    </div>
  )
}

/* ── Sub-components ── */

function Tag({ color, children }: { color: 'orange' | 'blue' | 'purple'; children: React.ReactNode }) {
  const styles = {
    orange: 'bg-[#f5a623]/15 text-[#f5a623]',
    blue:   'bg-sky-500/15 text-sky-400',
    purple: 'bg-violet-500/15 text-violet-400',
  }
  return (
    <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${styles[color]}`}>
      {children}
    </span>
  )
}

function StatCell({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center">
      <div className={`text-base font-bold ${color}`}>{value}</div>
      <div className="text-[11px] text-gray-500 mt-0.5">{label}</div>
    </div>
  )
}

function Section({
  icon, title, subtitle, children,
}: {
  icon: string
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#0d1624] rounded-2xl border border-purple-900/40 overflow-hidden card-glow">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-purple-900/25">
        <span className="text-base leading-none">{icon}</span>
        <div>
          <div className="font-semibold text-sm text-gray-100">{title}</div>
          {subtitle && <div className="text-[11px] text-gray-500 mt-0.5">{subtitle}</div>}
        </div>
      </div>
      <div className="p-3">{children}</div>
    </div>
  )
}

function HeroRow({
  entry, hero, negative, positive, onSelect,
}: {
  entry: CounterEntry
  hero?: HeroBasic
  negative?: boolean
  positive?: boolean
  onSelect: (h: HeroBasic) => void
}) {
  const head = entry.head || hero?.head || ''
  const name = hero?.name ?? `Hero #${entry.heroId}`
  const hasWr = entry.winRate > 0
  const hasDelta = entry.deltaWinRate !== 0

  return (
    <button
      onClick={() => hero && onSelect(hero)}
      disabled={!hero}
      className="flex items-center gap-3 w-full hover:bg-purple-950/30 rounded-xl px-2 py-2 transition-colors text-left disabled:opacity-40 disabled:cursor-default"
    >
      {head ? (
        <img src={head} alt={name} className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-[#1e2d55] bg-[#0f1a30]" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-[#0f1a30] flex-shrink-0 border border-[#1e2d55]" />
      )}
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold truncate">{name}</div>
        {hasWr && (
          <div className="text-[11px] text-gray-500">Win: {pct(entry.winRate, 1)}</div>
        )}
      </div>
      {hasDelta && (
        <div className={`text-sm font-bold flex-shrink-0 ${negative ? 'text-rose-400' : positive ? 'text-emerald-400' : 'text-gray-400'}`}>
          {entry.deltaWinRate > 0 ? '+' : ''}{pct(entry.deltaWinRate, 1)}
        </div>
      )}
    </button>
  )
}

function InfoBlock({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`bg-purple-950/25 rounded-xl p-3 border border-purple-900/20 ${wide ? 'col-span-2' : ''}`}>
      <div className="text-[11px] text-gray-500 mb-0.5">{label}</div>
      <div className="text-sm font-medium text-gray-100">{value}</div>
    </div>
  )
}

const SKILL_TYPE_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  'Passive':  { bg: 'rgba(139,92,246,0.15)', color: '#a78bfa', border: 'rgba(139,92,246,0.35)' },
  'Skill 1':  { bg: 'rgba(56,189,248,0.15)',  color: '#38bdf8', border: 'rgba(56,189,248,0.35)' },
  'Skill 2':  { bg: 'rgba(52,211,153,0.15)',  color: '#34d399', border: 'rgba(52,211,153,0.35)' },
  'Ultimate': { bg: 'rgba(251,113,133,0.15)', color: '#fb7185', border: 'rgba(251,113,133,0.35)' },
}

function SkillCard({ skill }: { skill: Skill }) {
  const style = SKILL_TYPE_STYLES[skill.skillType] ?? SKILL_TYPE_STYLES['Skill 1']
  return (
    <div className="bg-[#080e1e]/70 rounded-xl p-3 border border-purple-900/20">
      <div className="flex items-start gap-3">
        {skill.icon ? (
          <img
            src={skill.icon}
            alt={skill.name}
            className="w-11 h-11 rounded-lg flex-shrink-0 border border-[#1e2d55] bg-[#0f1a30] object-cover"
          />
        ) : (
          <div
            className="w-11 h-11 rounded-lg flex-shrink-0 flex items-center justify-center text-lg font-black"
            style={{ background: style.bg, color: style.color, border: `1px solid ${style.border}` }}
          >
            {skill.skillType === 'Passive' ? 'P' : skill.skillType.replace('Skill ', '')}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-bold text-gray-100 leading-tight">{skill.name || skill.skillType}</span>
            <span
              className="text-[10px] font-bold px-2 py-0.5 rounded-full border leading-none"
              style={{ background: style.bg, color: style.color, borderColor: style.border }}
            >
              {skill.skillType}
            </span>
          </div>
          {skill.cdAndCost && (
            <div className="text-[11px] text-gray-500 mb-1.5 font-mono">{skill.cdAndCost}</div>
          )}
          {skill.description && (
            <p className="text-xs text-gray-400 leading-relaxed">{skill.description}</p>
          )}
        </div>
      </div>
    </div>
  )
}

function RateBar({ label, value, color, base }: { label: string; value: number; color: string; base: number }) {
  const MAX_PCT = base === 0.5 ? 0.65 : 0.20
  const fill = Math.min(Math.max((value - base) / (MAX_PCT - base), 0), 1) * 100
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-gray-400">{label}</span>
        <span className="font-bold tabular-nums" style={{ color }}>{pct(value)}</span>
      </div>
      <div className="h-1.5 bg-[#080e1e] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${fill}%`, background: color, boxShadow: `0 0 6px ${color}66` }}
        />
      </div>
    </div>
  )
}

function MatchLine({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-gray-400">{label}</span>
      <span className={`font-semibold ${color}`}>{value}</span>
    </div>
  )
}

function Empty() {
  return <p className="text-gray-600 text-sm py-2 text-center">No data available</p>
}
