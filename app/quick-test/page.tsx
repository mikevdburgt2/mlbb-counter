"use client";

import { useState, useRef, useEffect } from "react";

// ─── API endpoint ────────────────────────────────────────────────────────────
const API_BASE = "https://openmlbb.fastapicloud.dev";

const EXAMPLE_ROLE_ID = "2116440980";
const EXAMPLE_ZONE_ID = "19916";

async function fetchProfile(roleId: string, zoneId: string): Promise<unknown> {
  const url = `${API_BASE}/web/user/info?role_id=${roleId}&zone_id=${zoneId}`;
  console.log(`[MLBB] Fetching: ${url}`);

  let res: Response;
  try {
    res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    const msg = err.name === "AbortError"
      ? "Request timed out after 10s"
      : err.message;
    throw new Error(msg);
  }

  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new Error(`Could not parse response (HTTP ${res.status})`);
  }

  if (!res.ok) {
    const msg = (data as { message?: string })?.message ?? `HTTP ${res.status}`;
    throw new Error(msg);
  }

  console.log(`[MLBB] Success:`, data);
  return data;
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface PlayerProfile {
  name?:               string;
  avatar?:             string;
  level?:              number;
  rank_level?:         number;
  history_rank_level?: number;
  reg_country?:        string;
  role_id?:            number;
  zone_id?:            number;
  [key: string]:       unknown;
}

const RANK_NAMES: Record<number, string> = {
  0: "Warrior", 1: "Elite", 2: "Master", 3: "Grandmaster",
  4: "Epic",    5: "Legend", 6: "Mythic", 7: "Mythic Honor",
  8: "Mythic Glory", 9: "Mythical Immortal",
};

function rankName(n?: number) {
  return n != null ? (RANK_NAMES[n] ?? `Rank ${n}`) : "—";
}

// ─── Small components ─────────────────────────────────────────────────────────
function ErrorBox({ msg }: { msg: string }) {
  return (
    <div className="rounded-xl bg-red-950/40 border border-red-900/40 px-4 py-3 text-sm text-red-300 leading-snug">
      {msg}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function QuickTestPage() {
  const [roleId,   setRoleId]   = useState(EXAMPLE_ROLE_ID);
  const [zoneId,   setZoneId]   = useState(EXAMPLE_ZONE_ID);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState<string | null>(null);
  const [profile,  setProfile]  = useState<PlayerProfile | null>(null);
  const roleRef = useRef<HTMLInputElement>(null);

  useEffect(() => { roleRef.current?.focus(); }, []);

  function fillExample() {
    setRoleId(EXAMPLE_ROLE_ID);
    setZoneId(EXAMPLE_ZONE_ID);
    setError(null);
    setProfile(null);
  }

  async function handleSearch(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!roleId || !zoneId) return setError("Both Game ID and Server ID are required.");
    setLoading(true);
    setError(null);
    setProfile(null);
    try {
      const raw = await fetchProfile(roleId, zoneId) as { data?: PlayerProfile } | PlayerProfile;
      // Some APIs wrap the payload in a `data` key
      const p: PlayerProfile =
        (raw as { data?: PlayerProfile }).data ?? (raw as PlayerProfile);
      setProfile(p);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Request failed.";
      console.error("[MLBB] Final error:", msg);
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setRoleId("");
    setZoneId("");
    setError(null);
    setProfile(null);
    setTimeout(() => roleRef.current?.focus(), 60);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 antialiased flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-[520px] space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold tracking-tight">MLBB Profile Lookup</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            Mobile Legends · Player profile by Game ID &amp; Server ID
          </p>
        </div>

        {/* Search form */}
        {!profile && (
          <form onSubmit={handleSearch} className="space-y-4">

            {/* Example hint */}
            <div className="rounded-xl bg-zinc-900 border border-zinc-800 px-4 py-3 text-xs text-zinc-400 leading-relaxed flex items-center justify-between gap-4">
              <div>
                <span className="text-zinc-500">Example — </span>
                Role ID: <span className="text-zinc-200 font-mono">{EXAMPLE_ROLE_ID}</span>
                &nbsp;/&nbsp;
                Zone ID: <span className="text-zinc-200 font-mono">{EXAMPLE_ZONE_ID}</span>
              </div>
              <button
                type="button"
                onClick={fillExample}
                className="shrink-0 text-sky-400 hover:text-sky-300 transition-colors font-medium"
              >
                Use example
              </button>
            </div>

            {/* ID fields */}
            <div className="grid grid-cols-2 gap-3">
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                  Game ID <span className="text-zinc-700">(role_id)</span>
                </span>
                <input
                  ref={roleRef}
                  type="text"
                  inputMode="numeric"
                  value={roleId}
                  onChange={e => setRoleId(e.target.value.replace(/\D/g, ""))}
                  placeholder={EXAMPLE_ROLE_ID}
                  required
                  className="
                    rounded-xl bg-zinc-900 border border-zinc-800
                    px-4 py-3 text-sm font-mono
                    placeholder:text-zinc-700
                    focus:outline-none focus:border-zinc-600
                    transition-colors
                  "
                />
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest">
                  Server ID <span className="text-zinc-700">(zone_id)</span>
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={zoneId}
                  onChange={e => setZoneId(e.target.value.replace(/\D/g, ""))}
                  placeholder={EXAMPLE_ZONE_ID}
                  required
                  className="
                    rounded-xl bg-zinc-900 border border-zinc-800
                    px-4 py-3 text-sm font-mono
                    placeholder:text-zinc-700
                    focus:outline-none focus:border-zinc-600
                    transition-colors
                  "
                />
              </label>
            </div>

            {error && <ErrorBox msg={error} />}

            <button
              type="submit"
              disabled={loading || !roleId || !zoneId}
              className="
                w-full rounded-2xl
                bg-white text-zinc-950
                py-4 text-base font-semibold
                disabled:opacity-25 disabled:cursor-not-allowed
                hover:bg-zinc-100 active:bg-zinc-200
                transition-all
              "
            >
              {loading ? "Searching…" : "Search →"}
            </button>
          </form>
        )}

        {/* Results */}
        {profile && (
          <div className="space-y-4">

            {/* Player card */}
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-5 flex items-center gap-4">
              {profile.avatar
                ? <img
                    src={profile.avatar}
                    alt=""
                    className="w-14 h-14 rounded-full bg-zinc-800 object-cover shrink-0"
                  />
                : <div className="w-14 h-14 rounded-full bg-zinc-800 shrink-0" />
              }
              <div className="flex-1 min-w-0">
                <p className="font-bold text-xl leading-tight truncate">
                  {profile.name ?? "Unknown Player"}
                </p>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-sm">
                  {profile.level != null && (
                    <span className="text-zinc-400">Lv.{profile.level}</span>
                  )}
                  <span className="text-sky-400 font-medium">
                    {rankName(profile.rank_level)}
                  </span>
                  {profile.reg_country && (
                    <span className="text-zinc-500 uppercase text-xs">
                      {profile.reg_country}
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-700 mt-0.5 font-mono">
                  {roleId} / {zoneId}
                </p>
              </div>
            </div>

            {/* Extra fields from API */}
            {Object.keys(profile).filter(k =>
              !["name","avatar","level","rank_level","history_rank_level","reg_country","role_id","zone_id"].includes(k)
            ).length > 0 && (
              <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 space-y-2">
                <p className="text-[10px] text-zinc-600 uppercase tracking-widest">Other Info</p>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(profile)
                    .filter(([k]) =>
                      !["name","avatar","level","rank_level","history_rank_level","reg_country","role_id","zone_id"].includes(k)
                    )
                    .map(([k, v]) => (
                      <div key={k} className="flex flex-col">
                        <span className="text-[10px] text-zinc-600 capitalize">{k.replace(/_/g, " ")}</span>
                        <span className="text-sm text-zinc-300 truncate">{String(v)}</span>
                      </div>
                    ))
                  }
                </div>
              </div>
            )}

            <button
              onClick={reset}
              className="w-full py-3 text-xs text-zinc-600 hover:text-zinc-400 transition-colors"
            >
              ← Search another player
            </button>
          </div>
        )}

      </div>
    </main>
  );
}
