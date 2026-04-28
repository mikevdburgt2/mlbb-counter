'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import HeartButton from '@/components/HeartButton'
import ItemSelectorModal from '@/components/ItemSelectorModal'
import { getItemMeta } from '@/lib/mlbb-items'

interface Favorite {
  id: string
  heroId: number
  heroName: string
  heroHead: string
}

interface Build {
  id: string
  heroId: number
  heroName: string
  heroHead: string
  item1: string
  item2: string
  item3: string
  item4: string
  item5: string
  item6: string
}

type DashboardTab = 'builds' | 'favourites'

const EMPTY_ITEMS = ['', '', '', '', '', ''] as const
const FAVORITES_KEY = 'mlbb_favorites'
const BUILDS_KEY = 'mlbb_builds'

type StoredFav = { heroId: number; heroName: string; heroHead: string }

export default function DashboardContent() {
  const [activeTab, setActiveTab] = useState<DashboardTab>('builds')
  const [favorites, setFavorites] = useState<Favorite[]>([])
  const [builds, setBuilds] = useState<Build[]>([])
  const [mounted, setMounted] = useState(false)

  const [selectedHeroId, setSelectedHeroId] = useState<string>('')
  const [items, setItems] = useState<string[]>([...EMPTY_ITEMS])
  const [openSlot, setOpenSlot] = useState<number | null>(null)

  useEffect(() => {
    try {
      const favs: StoredFav[] = JSON.parse(localStorage.getItem(FAVORITES_KEY) ?? '[]')
      setFavorites(
        favs.map((f) => ({
          id: String(f.heroId),
          heroId: f.heroId,
          heroName: f.heroName,
          heroHead: f.heroHead,
        })),
      )
    } catch {}
    try {
      setBuilds(JSON.parse(localStorage.getItem(BUILDS_KEY) ?? '[]'))
    } catch {}
    setMounted(true)
  }, [])

  const selectedHero = favorites.find((f) => String(f.heroId) === selectedHeroId)

  const handleSave = () => {
    if (!selectedHero) return
    const build: Build = {
      id: Date.now().toString(),
      heroId: selectedHero.heroId,
      heroName: selectedHero.heroName,
      heroHead: selectedHero.heroHead,
      item1: items[0],
      item2: items[1],
      item3: items[2],
      item4: items[3],
      item5: items[4],
      item6: items[5],
    }
    const updated = [build, ...builds]
    localStorage.setItem(BUILDS_KEY, JSON.stringify(updated))
    setBuilds(updated)
    setSelectedHeroId('')
    setItems([...EMPTY_ITEMS])
  }

  const handleDelete = (id: string) => {
    const updated = builds.filter((b) => b.id !== id)
    localStorage.setItem(BUILDS_KEY, JSON.stringify(updated))
    setBuilds(updated)
  }

  const handleHeartToggle = (heroId: number, favorited: boolean) => {
    if (!favorited) {
      setFavorites((prev) => prev.filter((f) => f.heroId !== heroId))
    }
  }

  if (!mounted) return null

  return (
    <div>
      {/* Tabs */}
      <div
        className="flex gap-2 mb-4 bg-[#080e1e]/80 p-1.5 rounded-2xl border border-purple-900/40"
        style={{ boxShadow: '0 0 20px rgba(139,92,246,0.06)' }}
      >
        <button
          onClick={() => setActiveTab('builds')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
            activeTab === 'builds'
              ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
              : 'text-purple-300/50 hover:text-purple-200 hover:bg-purple-950/30'
          }`}
        >
          ⚔ My Builds{' '}
          {builds.length > 0 && (
            <span
              className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === 'builds' ? 'bg-white/20' : 'bg-purple-900/50 text-purple-300'}`}
            >
              {builds.length}
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab('favourites')}
          className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all ${
            activeTab === 'favourites'
              ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg'
              : 'text-purple-300/50 hover:text-purple-200 hover:bg-purple-950/30'
          }`}
        >
          ♥ Favourites{' '}
          {favorites.length > 0 && (
            <span
              className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${activeTab === 'favourites' ? 'bg-white/20' : 'bg-purple-900/50 text-purple-300'}`}
            >
              {favorites.length}
            </span>
          )}
        </button>
      </div>

      {/* Builds tab */}
      {activeTab === 'builds' && (
        <div className="space-y-4">
          <div
            className="bg-[#0d1624] rounded-2xl border border-purple-900/40 p-4"
            style={{ boxShadow: '0 0 40px rgba(139,92,246,0.08)' }}
          >
            <div className="text-sm font-semibold text-gray-100 mb-3">New Build</div>

            {favorites.length === 0 ? (
              <p className="text-xs text-gray-500 mb-3">
                Favourite a hero first to create a build.{' '}
                <Link href="/" className="text-purple-400 hover:text-purple-300">
                  Browse →
                </Link>
              </p>
            ) : (
              <select
                value={selectedHeroId}
                onChange={(e) => setSelectedHeroId(e.target.value)}
                className="w-full bg-[#080e1e] border border-purple-900/40 rounded-xl px-3 py-2 text-sm text-gray-100 mb-3 focus:outline-none focus:border-purple-500"
              >
                <option value="">Select hero from favourites…</option>
                {favorites.map((f) => (
                  <option key={f.heroId} value={String(f.heroId)}>
                    {f.heroName}
                  </option>
                ))}
              </select>
            )}

            {/* 6 item slots */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {items.map((item, i) => {
                const meta = item ? getItemMeta(item) : null
                return (
                  <div key={i} className="relative group">
                    <button
                      onClick={() => setOpenSlot(i)}
                      className="w-full flex flex-col items-center gap-1 p-2 rounded-xl transition-all text-center"
                      style={{
                        background: item ? 'rgba(139,92,246,0.1)' : 'rgba(6,10,24,0.7)',
                        border: item
                          ? '1px solid rgba(139,92,246,0.4)'
                          : '1.5px dashed rgba(139,92,246,0.2)',
                        minHeight: '72px',
                        boxShadow: item ? '0 0 10px rgba(139,92,246,0.12)' : undefined,
                      }}
                    >
                      {item ? (
                        <>
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center text-base shadow-sm bg-gradient-to-br ${meta?.gradient ?? 'from-gray-600 to-gray-700'}`}
                            style={{ boxShadow: meta ? `0 2px 8px ${meta.glow}50` : undefined }}
                          >
                            {meta?.badge ?? '⚔️'}
                          </div>
                          <span className="text-[9px] leading-tight text-gray-300 line-clamp-2 w-full">
                            {item}
                          </span>
                        </>
                      ) : (
                        <>
                          <div
                            className="w-9 h-9 rounded-xl flex items-center justify-center text-purple-700/60"
                            style={{ border: '1.5px dashed rgba(139,92,246,0.25)' }}
                          >
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                              <path
                                d="M7 2v10M2 7h10"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                              />
                            </svg>
                          </div>
                          <span className="text-[9px] text-gray-600">Item {i + 1}</span>
                        </>
                      )}
                    </button>

                    {item && (
                      <button
                        onClick={() => {
                          const next = [...items]
                          next[i] = ''
                          setItems(next)
                        }}
                        className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        style={{ background: '#1e1030', border: '1px solid rgba(139,92,246,0.4)' }}
                        title="Clear item"
                      >
                        <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                          <path
                            d="M1 1l5 5M6 1L1 6"
                            stroke="#a78bfa"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>

            {openSlot !== null && (
              <ItemSelectorModal
                currentItem={items[openSlot]}
                onSelect={(name) => {
                  const next = [...items]
                  next[openSlot] = name
                  setItems(next)
                }}
                onClose={() => setOpenSlot(null)}
              />
            )}

            <button
              onClick={handleSave}
              disabled={!selectedHero}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                boxShadow: '0 0 20px rgba(124,58,237,0.3)',
              }}
            >
              Save Build
            </button>
          </div>

          {builds.length === 0 ? (
            <div
              className="bg-[#0d1624] rounded-2xl border border-purple-900/40 p-8 text-center"
              style={{ boxShadow: '0 0 40px rgba(139,92,246,0.08)' }}
            >
              <div className="text-3xl mb-2 opacity-30">⚔</div>
              <p className="text-gray-500 text-sm">No builds saved yet.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {builds.map((build) => {
                const itemList = [
                  build.item1,
                  build.item2,
                  build.item3,
                  build.item4,
                  build.item5,
                  build.item6,
                ].filter(Boolean)
                return (
                  <div
                    key={build.id}
                    className="bg-[#0d1624] rounded-2xl border border-purple-900/40 px-4 py-3 flex items-start gap-3"
                    style={{ boxShadow: '0 0 20px rgba(139,92,246,0.05)' }}
                  >
                    {build.heroHead ? (
                      <img
                        src={build.heroHead}
                        alt={build.heroName}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-[#1e2d55] bg-[#0f1a30]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#0f1a30] flex-shrink-0 border border-[#1e2d55]" />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-100 mb-1">
                        {build.heroName}
                      </div>
                      {itemList.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {itemList.map((item, i) => {
                            const meta = getItemMeta(item)
                            return (
                              <span
                                key={i}
                                className="flex items-center gap-1 text-[10px] rounded-lg px-2 py-0.5 font-medium"
                                style={{
                                  background: meta ? `${meta.glow}18` : 'rgba(139,92,246,0.12)',
                                  border: `1px solid ${meta ? `${meta.glow}40` : 'rgba(139,92,246,0.2)'}`,
                                  color: meta ? undefined : '#c4b5fd',
                                }}
                              >
                                {meta && <span className="text-[11px]">{meta.badge || '⚔️'}</span>}
                                <span className={meta ? '' : 'text-purple-300'}>{item}</span>
                              </span>
                            )
                          })}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-600">No items added</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(build.id)}
                      className="text-gray-600 hover:text-red-400 transition-colors text-lg leading-none flex-shrink-0 mt-0.5"
                      title="Delete build"
                    >
                      ×
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Favourites tab */}
      {activeTab === 'favourites' && (
        <div
          className="bg-[#0d1624] rounded-2xl border border-purple-900/40 overflow-hidden"
          style={{ boxShadow: '0 0 40px rgba(139,92,246,0.08)' }}
        >
          <div className="flex items-center gap-2 px-4 py-3 border-b border-purple-900/25">
            <span className="text-base">♥</span>
            <span className="font-semibold text-sm text-gray-100">Favourites</span>
            <span className="ml-auto text-xs text-gray-500">
              {favorites.length} hero{favorites.length !== 1 ? 's' : ''}
            </span>
          </div>

          {favorites.length === 0 ? (
            <div className="text-center py-12 px-6">
              <div className="text-4xl mb-3 opacity-30">♡</div>
              <p className="text-gray-500 text-sm mb-4">No favourites yet.</p>
              <Link
                href="/"
                className="inline-block text-center py-2 px-5 rounded-xl text-sm font-bold text-white transition-all"
                style={{
                  background: 'linear-gradient(135deg, #7c3aed, #06b6d4)',
                  boxShadow: '0 0 20px rgba(124,58,237,0.3)',
                }}
              >
                Browse Heroes →
              </Link>
            </div>
          ) : (
            <div className="p-3 space-y-1.5">
              {favorites.map((fav) => (
                <div
                  key={fav.heroId}
                  className="flex items-center gap-3 bg-[#080e1e]/60 rounded-xl px-3 py-2.5 border border-transparent hover:border-purple-900/30 transition-colors"
                >
                  <Link
                    href={`/?hero=${fav.heroId}`}
                    className="flex items-center gap-3 flex-1 min-w-0"
                  >
                    {fav.heroHead ? (
                      <img
                        src={fav.heroHead}
                        alt={fav.heroName}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0 border border-[#1e2d55] bg-[#0f1a30]"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#0f1a30] flex-shrink-0 border border-[#1e2d55]" />
                    )}
                    <span className="text-sm font-semibold text-gray-100 truncate">
                      {fav.heroName}
                    </span>
                  </Link>
                  <HeartButton
                    heroId={fav.heroId}
                    heroName={fav.heroName}
                    heroHead={fav.heroHead}
                    initialFavorited
                    onToggle={handleHeartToggle}
                    size="sm"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
