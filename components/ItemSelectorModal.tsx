'use client'

import { useState, useEffect, useRef } from 'react'
import { MLBB_ITEMS, CATEGORY_META, type ItemCategory } from '@/lib/mlbb-items'

interface Props {
  currentItem: string
  onSelect: (name: string) => void
  onClose: () => void
}

const CATEGORIES: ItemCategory[] = ['All', 'Attack', 'Magic', 'Defense', 'Movement', 'Support']

export default function ItemSelectorModal({ currentItem, onSelect, onClose }: Props) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<ItemCategory>('All')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const filtered = MLBB_ITEMS.filter(item => {
    const matchCat = activeCategory === 'All' || item.category === activeCategory
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase().trim())
    return matchCat && matchSearch
  })

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4"
      style={{ background: 'rgba(4,8,20,0.88)', backdropFilter: 'blur(10px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border border-purple-900/50 flex flex-col overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #0e1628 0%, #080d1c 100%)',
          boxShadow: '0 0 80px rgba(139,92,246,0.22), 0 0 160px rgba(6,182,212,0.06)',
          maxHeight: '88vh',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4">
          <div>
            <div className="text-sm font-bold text-white tracking-wide">Select Item</div>
            <div className="text-[11px] text-gray-500 mt-0.5">Tap an item to add it to the slot</div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-white transition-colors"
            style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.2)' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              width="14" height="14" viewBox="0 0 24 24" fill="none"
            >
              <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search items…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-10 py-2.5 text-sm text-gray-100 placeholder-gray-600 rounded-xl transition-all focus:outline-none"
              style={{
                background: 'rgba(6,10,24,0.8)',
                border: '1px solid rgba(139,92,246,0.25)',
                boxShadow: search ? '0 0 0 1.5px rgba(139,92,246,0.4)' : undefined,
              }}
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <div className="px-4 pb-3 flex gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat
            const meta = cat !== 'All' ? CATEGORY_META[cat] : null
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
                style={isActive ? {
                  background: cat === 'All'
                    ? 'linear-gradient(135deg, #7c3aed, #06b6d4)'
                    : `linear-gradient(135deg, ${meta?.gradient.replace('from-', '').replace(' to-', ', ')})`,
                  boxShadow: cat === 'All' ? '0 0 12px rgba(124,58,237,0.4)' : `0 0 12px ${meta?.glow}40`,
                } : { background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)' }}
              >
                {cat !== 'All' && <span className="text-[11px]">{meta?.emoji}</span>}
                {cat}
              </button>
            )
          })}
        </div>

        {/* Divider */}
        <div className="mx-4 mb-3 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(139,92,246,0.2), transparent)' }} />

        {/* Grid */}
        <div className="flex-1 overflow-y-auto px-4 pb-5" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4c1d95 #060c18' }}>
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="text-4xl opacity-20">⚔</div>
              <p className="text-gray-600 text-sm">No items match &quot;{search}&quot;</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {filtered.map(item => {
                const meta = CATEGORY_META[item.category]
                const isSelected = item.name === currentItem
                return (
                  <button
                    key={item.id}
                    onClick={() => { onSelect(item.name); onClose() }}
                    className="group flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all relative"
                    style={{
                      background: isSelected ? 'rgba(139,92,246,0.18)' : 'rgba(6,10,24,0.6)',
                      border: isSelected
                        ? '1px solid rgba(139,92,246,0.6)'
                        : '1px solid rgba(139,92,246,0.08)',
                      boxShadow: isSelected ? '0 0 16px rgba(139,92,246,0.3)' : undefined,
                    }}
                    onMouseEnter={e => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.3)'
                        ;(e.currentTarget as HTMLElement).style.background = 'rgba(139,92,246,0.1)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSelected) {
                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(139,92,246,0.08)'
                        ;(e.currentTarget as HTMLElement).style.background = 'rgba(6,10,24,0.6)'
                      }
                    }}
                  >
                    {/* Category icon tile */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md bg-gradient-to-br ${meta.gradient} flex-shrink-0`}
                      style={{ boxShadow: isSelected ? `0 0 14px ${meta.glow}` : `0 2px 8px ${meta.glow}40` }}
                    >
                      <span className="text-lg">{meta.emoji}</span>
                    </div>

                    {/* Name */}
                    <span className="text-[10px] leading-tight text-gray-300 text-center line-clamp-2 w-full">
                      {item.name}
                    </span>

                    {/* Selected tick */}
                    {isSelected && (
                      <div
                        className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                        style={{ background: 'rgba(139,92,246,0.8)' }}
                      >
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
