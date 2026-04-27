export type ItemCategory = 'All' | 'Attack' | 'Magic' | 'Defense' | 'Movement' | 'Support'

export interface MLBBItem {
  id: string
  name: string
  category: Exclude<ItemCategory, 'All'>
  imageUrl: string
}

export const CATEGORY_META: Record<Exclude<ItemCategory, 'All'>, {
  gradient: string
  glow: string
  badge: string
}> = {
  Attack:   { gradient: 'from-orange-500 to-red-600',    glow: 'rgba(249,115,22,0.7)',  badge: 'bg-orange-900/40 text-orange-300 border-orange-700/40' },
  Magic:    { gradient: 'from-violet-500 to-indigo-600', glow: 'rgba(139,92,246,0.7)',  badge: 'bg-violet-900/40 text-violet-300 border-violet-700/40' },
  Defense:  { gradient: 'from-sky-500 to-blue-700',      glow: 'rgba(56,189,248,0.7)',  badge: 'bg-sky-900/40 text-sky-300 border-sky-700/40'           },
  Movement: { gradient: 'from-cyan-400 to-teal-600',     glow: 'rgba(6,182,212,0.7)',   badge: 'bg-cyan-900/40 text-cyan-300 border-cyan-700/40'         },
  Support:  { gradient: 'from-amber-400 to-yellow-600',  glow: 'rgba(245,158,11,0.7)',  badge: 'bg-amber-900/40 text-amber-300 border-amber-700/40'      },
}

const LP = 'https://liquipedia.net/commons/images'

export const MLBB_ITEMS: MLBBItem[] = [
  // ── Attack ──────────────────────────────────────────────────────────────────
  { id: 'blade-of-despair',      name: 'Blade of Despair',       category: 'Attack',   imageUrl: `${LP}/8/81/Item_Blade_of_Despair_ML.png` },
  { id: 'malefic-roar',          name: 'Malefic Roar',           category: 'Attack',   imageUrl: `${LP}/1/14/Item_Malefic_Roar_ML.png` },
  { id: 'endless-battle',        name: 'Endless Battle',         category: 'Attack',   imageUrl: `${LP}/d/d1/Item_Endless_Battle_ML.png` },
  { id: 'berserkers-fury',       name: "Berserker's Fury",       category: 'Attack',   imageUrl: `${LP}/9/99/Item_Berserker%27s_Fury_ML.png` },
  { id: 'war-axe',               name: 'War Axe',                category: 'Attack',   imageUrl: `${LP}/e/ee/Item_War_Axe_2024_ML.png` },
  { id: 'hunter-strike',         name: 'Hunter Strike',          category: 'Attack',   imageUrl: `${LP}/2/22/Item_Hunter_Strike_ML.png` },
  { id: 'scarlet-phantom',       name: 'Scarlet Phantom',        category: 'Attack',   imageUrl: `${LP}/c/c2/Item_Scarlet_Phantom_ML.png` },
  { id: 'windtalker',            name: 'Windtalker',             category: 'Attack',   imageUrl: `${LP}/6/6d/Item_Windtalker_ML.png` },
  { id: 'corrosion-scythe',      name: 'Corrosion Scythe',       category: 'Attack',   imageUrl: `${LP}/6/68/Item_Corrosion_Scythe_ML.png` },
  { id: 'sea-halberd',           name: 'Sea Halberd',            category: 'Attack',   imageUrl: `${LP}/0/0f/Item_Sea_Halberd_ML.png` },
  { id: 'haas-claws',            name: "Haas's Claws",           category: 'Attack',   imageUrl: `${LP}/f/fa/Item_Haas%27s_Claws_ML.png` },
  { id: 'rose-gold-meteor',      name: 'Rose Gold Meteor',       category: 'Attack',   imageUrl: `${LP}/9/9d/Item_Rose_Gold_Meteor_ML.png` },
  { id: 'demon-hunter-sword',    name: 'Demon Hunter Sword',     category: 'Attack',   imageUrl: `${LP}/0/08/Item_Demon_Hunter_Sword_ML.png` },
  { id: 'golden-staff',          name: 'Golden Staff',           category: 'Attack',   imageUrl: `${LP}/d/db/Item_Golden_Staff_ML.png` },
  { id: 'bloodlust-axe',         name: 'Bloodlust Axe',          category: 'Attack',   imageUrl: `${LP}/b/b7/Item_Bloodlust_Axe_ML.png` },
  { id: 'blade-of-heptaseas',    name: 'Blade of the Heptaseas', category: 'Attack',   imageUrl: `${LP}/d/db/Item_Blade_of_the_Heptaseas_ML.png` },
  { id: 'great-dragon-spear',    name: 'Great Dragon Spear',     category: 'Attack',   imageUrl: `${LP}/d/d8/Item_Great_Dragon_Spear_ML.png` },
  { id: 'shadow-twinblades',     name: 'Shadow Twinblades',      category: 'Attack',   imageUrl: `${LP}/2/29/Item_Shadow_Twinblades_ML.png` },
  { id: 'sky-piercer',           name: 'Sky Piercer',            category: 'Attack',   imageUrl: `${LP}/b/bd/Item_Sky_Piercer_ML.png` },
  { id: 'brute-force',           name: 'Brute Force Breastplate',category: 'Attack',   imageUrl: `${LP}/7/70/Item_Brute_Force_Breastplate_ML.png` },

  // ── Magic ────────────────────────────────────────────────────────────────────
  { id: 'lightning-truncheon',   name: 'Lightning Truncheon',    category: 'Magic',    imageUrl: `${LP}/7/71/Item_Lightning_Truncheon_ML.png` },
  { id: 'holy-crystal',          name: 'Holy Crystal',           category: 'Magic',    imageUrl: `${LP}/2/28/Item_Holy_Crystal_ML.png` },
  { id: 'genius-wand',           name: 'Genius Wand',            category: 'Magic',    imageUrl: `${LP}/c/c1/Item_Genius_Wand_ML.png` },
  { id: 'necklace-of-durance',   name: 'Necklace of Durance',    category: 'Magic',    imageUrl: `${LP}/c/c9/Item_Necklace_of_Durance_ML.png` },
  { id: 'clock-of-destiny',      name: 'Clock of Destiny',       category: 'Magic',    imageUrl: `${LP}/6/66/Item_Clock_of_Destiny_ML.png` },
  { id: 'divine-glaive',         name: 'Divine Glaive',          category: 'Magic',    imageUrl: `${LP}/9/9c/Item_Divine_Glaive_ML.png` },
  { id: 'blood-wings',           name: 'Blood Wings',            category: 'Magic',    imageUrl: `${LP}/0/03/Item_Blood_Wings_ML.png` },
  { id: 'glowing-wand',          name: 'Glowing Wand',           category: 'Magic',    imageUrl: `${LP}/5/54/Item_Glowing_Wand_2024_ML.png` },
  { id: 'calamity-reaper',       name: 'Calamity Reaper',        category: 'Magic',    imageUrl: `${LP}/a/a4/Item_Calamity_Reaper_ML.png` },
  { id: 'enchanted-talisman',    name: 'Enchanted Talisman',     category: 'Magic',    imageUrl: `${LP}/2/2a/Item_Enchanted_Talisman_ML.png` },
  { id: 'ice-queen-wand',        name: 'Ice Queen Wand',         category: 'Magic',    imageUrl: `${LP}/d/de/Item_Ice_Queen_Wand_ML.png` },
  { id: 'concentrated-energy',   name: 'Concentrated Energy',    category: 'Magic',    imageUrl: `${LP}/8/85/Item_Concentrated_Energy_ML.png` },
  { id: 'winter-crown',          name: 'Winter Crown',           category: 'Magic',    imageUrl: `${LP}/c/c1/Item_Winter_Crown_ML.png` },
  { id: 'feather-of-heaven',     name: 'Feather of Heaven',      category: 'Magic',    imageUrl: `${LP}/6/60/Item_Feather_of_Heaven_ML.png` },
  { id: 'elegant-gem',           name: 'Elegant Gem',            category: 'Magic',    imageUrl: `${LP}/d/db/Item_Elegant_Gem_2024_ML.png` },
  { id: 'fleeting-time',         name: 'Fleeting Time',          category: 'Magic',    imageUrl: `${LP}/c/c7/Item_Fleeting_Time_2024_ML.png` },
  { id: 'starlium-scythe',       name: 'Starlium Scythe',        category: 'Magic',    imageUrl: `${LP}/3/3a/Item_Starlium_Scythe_ML.png` },

  // ── Defense ───────────────────────────────────────────────────────────────────
  { id: 'antique-cuirass',       name: 'Antique Cuirass',        category: 'Defense',  imageUrl: `${LP}/2/2b/Item_Antique_Cuirass_ML.png` },
  { id: 'immortality',           name: 'Immortality',            category: 'Defense',  imageUrl: `${LP}/c/c2/Item_Immortality_ML.png` },
  { id: 'wind-of-nature',        name: 'Wind of Nature',         category: 'Defense',  imageUrl: `${LP}/9/99/Item_Wind_of_Nature_ML.png` },
  { id: 'athenas-shield',        name: "Athena's Shield",        category: 'Defense',  imageUrl: `${LP}/9/93/Item_Athena%27s_Shield_ML.png` },
  { id: 'radiant-armor',         name: 'Radiant Armor',          category: 'Defense',  imageUrl: `${LP}/1/1b/Item_Radiant_Armor_ML.png` },
  { id: 'twilight-armor',        name: 'Twilight Armor',         category: 'Defense',  imageUrl: `${LP}/5/59/Item_Twilight_Armor_ML.png` },
  { id: 'cursed-helmet',         name: 'Cursed Helmet',          category: 'Defense',  imageUrl: `${LP}/5/5c/Item_Cursed_Helmet_ML.png` },
  { id: 'guardian-helmet',       name: 'Guardian Helmet',        category: 'Defense',  imageUrl: `${LP}/6/66/Item_Guardian_Helmet_ML.png` },
  { id: 'dominance-ice',         name: 'Dominance Ice',          category: 'Defense',  imageUrl: `${LP}/1/14/Item_Dominance_Ice_ML.png` },
  { id: 'blade-armor',           name: 'Blade Armor',            category: 'Defense',  imageUrl: `${LP}/8/86/Item_Blade_Armor_ML.png` },
  { id: 'oracle',                name: 'Oracle',                 category: 'Defense',  imageUrl: `${LP}/3/31/Item_Oracle_ML.png` },
  { id: 'queens-wings',          name: "Queen's Wings",          category: 'Defense',  imageUrl: `${LP}/3/33/Item_Queen%27s_Wings_ML.png` },
  { id: 'dreadnaught-armor',     name: 'Dreadnaught Armor',      category: 'Defense',  imageUrl: `${LP}/8/8c/Item_Dreadnaught_Armor_ML.png` },
  { id: 'molten-essence',        name: 'Molten Essence',         category: 'Defense',  imageUrl: `${LP}/1/19/Item_Molten_Essence_ML.png` },
  { id: 'thunder-belt',          name: 'Thunder Belt',           category: 'Defense',  imageUrl: `${LP}/0/08/Item_Thunder_Belt_ML.png` },

  // ── Movement ──────────────────────────────────────────────────────────────────
  { id: 'warrior-boots',         name: 'Warrior Boots',          category: 'Movement', imageUrl: `${LP}/f/fd/Item_Warrior_Boots_ML.png` },
  { id: 'tough-boots',           name: 'Tough Boots',            category: 'Movement', imageUrl: `${LP}/f/f3/Item_Tough_Boots_ML.png` },
  { id: 'magic-shoes',           name: 'Magic Shoes',            category: 'Movement', imageUrl: `${LP}/8/88/Item_Magic_Shoes_ML.png` },
  { id: 'swift-boots',           name: 'Swift Boots',            category: 'Movement', imageUrl: `${LP}/1/12/Item_Swift_Boots_ML.png` },
  { id: 'arcane-boots',          name: 'Arcane Boots',           category: 'Movement', imageUrl: `${LP}/9/93/Item_Arcane_Boots_ML.png` },

  // ── Support / Roam ─────────────────────────────────────────────────────────
  { id: 'encourage',             name: 'Encourage',              category: 'Support',  imageUrl: `${LP}/4/40/Item_Encourage_ML.png` },
  { id: 'conceal',               name: 'Conceal',                category: 'Support',  imageUrl: `${LP}/a/aa/Item_Conceal_ML.png` },
]

export function getItemMeta(name: string) {
  const item = MLBB_ITEMS.find(i => i.name === name)
  if (!item) return null
  return { ...CATEGORY_META[item.category], imageUrl: item.imageUrl, category: item.category }
}
