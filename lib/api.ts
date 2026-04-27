export interface HeroBasic {
  hero_id: number
  name: string
  alias: string
  head: string
  relation: {
    strong: number[]
    weak: number[]
    assist: number[]
  }
}

export interface Skill {
  name: string
  skillType: string
  cdAndCost?: string
  description: string
  icon?: string
}

export interface HeroDetail {
  role?: string
  lane?: string
  specialties?: string[]
  skills?: Skill[]
  story?: string
}

export interface CounterEntry {
  heroId: number
  winRate: number
  deltaWinRate: number
  head?: string
}

export interface HeroStats {
  tier: number
  winRate: number
  pickRate: number
  banRate: number
  synergies: CounterEntry[]
  counters: CounterEntry[]
}

export function heroSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[''`]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const FALLBACK_HEROES: HeroBasic[] = [
  { hero_id: 1,  name: 'Moskov',    alias: 'Moskov',    head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 2,  name: 'Fanny',     alias: 'Fanny',     head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 3,  name: 'Ling',      alias: 'Ling',      head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 4,  name: 'Gusion',    alias: 'Gusion',    head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 5,  name: 'Lancelot',  alias: 'Lancelot',  head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 6,  name: 'Chou',      alias: 'Chou',      head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 7,  name: 'Kagura',    alias: 'Kagura',    head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 8,  name: 'Beatrix',   alias: 'Beatrix',   head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 9,  name: 'Wanwan',    alias: 'Wanwan',    head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 10, name: 'Aldous',    alias: 'Aldous',    head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 11, name: 'Hayabusa',  alias: 'Hayabusa',  head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 12, name: 'Lesley',    alias: 'Lesley',    head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 13, name: 'Claude',    alias: 'Claude',    head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 14, name: 'Granger',   alias: 'Granger',   head: '', relation: { strong: [], weak: [], assist: [] } },
  { hero_id: 15, name: 'Benedetta', alias: 'Benedetta', head: '', relation: { strong: [], weak: [], assist: [] } },
]

function parseHeroes(json: any): HeroBasic[] {
  // Shape A: { data: { records: [ { data: { hero_id, hero: { data: { name, ... } } } } ] } }
  const records: any[] = json?.data?.records ?? []
  if (records.length > 0) {
    return records.flatMap((r: any) => {
      const d = r.data
      if (!d?.hero?.data?.name) return []
      return [{
        hero_id: d.hero_id,
        name: d.hero.data.name,
        alias: d.hero.data.ename ?? d.hero.data.alias ?? '',
        head: d.hero.data.head ?? '',
        relation: {
          strong: d.relation?.strong?.target_hero_id ?? [],
          weak:   d.relation?.weak?.target_hero_id ?? [],
          assist: d.relation?.assist?.target_hero_id ?? [],
        },
      }]
    })
  }

  // Shape C: { data: [...heroes] } — flat array under the data key
  if (Array.isArray(json?.data) && json.data.length > 0) {
    return json.data.flatMap((h: any) => {
      const name = h.name ?? h.hero_name ?? h.hero?.name
      if (!name) return []
      return [{
        hero_id: h.hero_id ?? h.id ?? 0,
        name,
        alias: h.alias ?? h.ename ?? '',
        head: h.head ?? h.icon ?? '',
        relation: {
          strong: h.relation?.strong?.target_hero_id ?? [],
          weak:   h.relation?.weak?.target_hero_id ?? [],
          assist: h.relation?.assist?.target_hero_id ?? [],
        },
      }]
    })
  }

  // Shape B: top-level array of hero objects
  if (Array.isArray(json)) {
    return json.flatMap((h: any) => {
      const name = h.name ?? h.hero_name ?? h.hero?.name
      if (!name) return []
      return [{
        hero_id: h.hero_id ?? h.id ?? 0,
        name,
        alias: h.alias ?? h.ename ?? '',
        head: h.head ?? h.icon ?? '',
        relation: { strong: [], weak: [], assist: [] },
      }]
    })
  }

  return []
}

export async function fetchHeroes(): Promise<HeroBasic[]> {
  const proxyUrl = '/api/heroes'
  console.log(`[MLBB] fetchHeroes → ${proxyUrl}`)

  const res = await fetch(proxyUrl)
  console.log(`[MLBB] fetchHeroes ← ${res.status} ${res.statusText}`)

  if (!res.ok) {
    throw new Error(`Proxy returned HTTP ${res.status}`)
  }

  const json = await res.json()
  console.log('[MLBB] fetchHeroes raw response:', JSON.stringify(json).slice(0, 300))

  const heroes = parseHeroes(json)
  console.log(`[MLBB] fetchHeroes parsed ${heroes.length} heroes`)

  if (heroes.length === 0) {
    throw new Error('API returned 0 heroes (unrecognised response shape)')
  }

  console.log('Real heroes loaded:', heroes.length)
  return heroes
}

function stripHtml(html: string): string {
  return (html ?? '').replace(/<[^>]*>/g, '').trim()
}

export async function fetchHeroDetail(slug: string): Promise<HeroDetail | null> {
  try {
    const res = await fetch(`/api/heroes/${slug}`)
    if (!res.ok) return null
    const json = await res.json()
    const d = json.data?.records?.[0]?.data
    if (!d) return null

    // Actual API field names (verified from response)
    const skillList: any[] = d.hero?.data?.heroskillist?.[0]?.skilllist ?? []
    const skillTypes = ['Passive', 'Skill 1', 'Skill 2', 'Ultimate']

    const skills: Skill[] = skillList.map((s: any, i: number) => ({
      name: s.skillname ?? '',
      skillType: skillTypes[i] ?? 'Active',
      cdAndCost: s['skillcd&cost'] ?? '',
      description: stripHtml(s.skilldesc ?? ''),
      icon: s.skillicon ?? '',
    }))

    return {
      role: d.sortlabel?.[0] ?? '',
      lane: d.roadsortlabel?.[0] ?? '',
      specialties: Array.isArray(d.speciality) ? d.speciality : [],
      skills,
      story: d.story ?? d.hero?.data?.story ?? '',
    }
  } catch {
    return null
  }
}

export async function fetchHeroStats(slug: string): Promise<HeroStats | null> {
  try {
    const res = await fetch(`/api/heroes/${slug}/compatibility`)
    if (!res.ok) return null
    const json = await res.json()
    const d = json.data?.records?.[0]?.data
    if (!d) return null

    return {
      tier: parseInt(d.bigrank ?? '0') || 0,
      winRate: d.main_hero_win_rate ?? 0,
      pickRate: d.main_hero_appearance_rate ?? 0,
      banRate: d.main_hero_ban_rate ?? 0,
      synergies: (d.sub_hero ?? []).map((h: any) => ({
        heroId: h.heroid,
        winRate: h.hero_win_rate ?? 0,
        deltaWinRate: h.increase_win_rate ?? 0,
        head: h.hero?.data?.head ?? '',
      })),
      counters: (d.sub_hero_last ?? []).map((h: any) => ({
        heroId: h.heroid,
        winRate: h.hero_win_rate ?? 0,
        deltaWinRate: h.increase_win_rate ?? 0,
        head: h.hero?.data?.head ?? '',
      })),
    }
  } catch {
    return null
  }
}
