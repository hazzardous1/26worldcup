import { useState, useMemo } from "react";

const NETWORK_COLORS = {
  FOX: { bg: "#003087", text: "#fff", label: "FOX" },
  FS1: { bg: "#FF5C1A", text: "#fff", label: "FS1" },
  Telemundo: { bg: "#6A0DAD", text: "#fff", label: "TMDO" },
  Universo: { bg: "#008C45", text: "#fff", label: "UNIV" },
};

const STAGE_ORDER = ["Group Stage", "Round of 32", "Round of 16", "Quarterfinals", "Semifinals", "Final"];

const games = [
  { id: 1, date: "2026-06-11", time: "3:00 PM", home: "Mexico", away: "South Africa", group: "A", stage: "Group Stage", network: "FOX", venue: "Estadio Azteca, Mexico City" },
  { id: 2, date: "2026-06-11", time: "10:00 PM", home: "South Korea", away: "Czechia", group: "B", stage: "Group Stage", network: "Telemundo", venue: "Estadio Akron, Guadalajara" },
  { id: 3, date: "2026-06-12", time: "3:00 PM", home: "Canada", away: "Bosnia & Herzegovina", group: "C", stage: "Group Stage", network: "FOX", venue: "BMO Field, Toronto" },
  { id: 4, date: "2026-06-12", time: "9:00 PM", home: "USA", away: "Paraguay", group: "D", stage: "Group Stage", network: "FOX", venue: "SoFi Stadium, Los Angeles", usmnt: true },
  { id: 5, date: "2026-06-13", time: "3:00 PM", home: "Qatar", away: "Switzerland", group: "E", stage: "Group Stage", network: "FS1", venue: "Levi's Stadium, San Francisco" },
  { id: 6, date: "2026-06-13", time: "6:00 PM", home: "Brazil", away: "Morocco", group: "F", stage: "Group Stage", network: "FOX", venue: "MetLife Stadium, New York/NJ" },
  { id: 7, date: "2026-06-13", time: "9:00 PM", home: "Haiti", away: "Scotland", group: "G", stage: "Group Stage", network: "FS1", venue: "Gillette Stadium, Boston" },
  { id: 8, date: "2026-06-14", time: "12:00 AM", home: "Australia", away: "Türkiye", group: "H", stage: "Group Stage", network: "FS1", venue: "BC Place, Vancouver" },
  { id: 9, date: "2026-06-14", time: "1:00 PM", home: "Germany", away: "Curaçao", group: "I", stage: "Group Stage", network: "FOX", venue: "SoFi Stadium, Los Angeles" },
  { id: 10, date: "2026-06-14", time: "4:00 PM", home: "Netherlands", away: "Japan", group: "J", stage: "Group Stage", network: "FS1", venue: "AT&T Stadium, Dallas" },
  { id: 11, date: "2026-06-14", time: "7:00 PM", home: "Ivory Coast", away: "Ecuador", group: "K", stage: "Group Stage", network: "FOX", venue: "Hard Rock Stadium, Miami" },
  { id: 12, date: "2026-06-14", time: "10:00 PM", home: "Sweden", away: "Tunisia", group: "L", stage: "Group Stage", network: "FS1", venue: "Arrowhead Stadium, Kansas City" },
  { id: 29, date: "2026-06-19", time: "3:00 PM", home: "USA", away: "Australia", group: "D", stage: "Group Stage", network: "FOX", venue: "Lumen Field, Seattle", usmnt: true },
  { id: 56, date: "2026-06-25", time: "10:00 PM", home: "Türkiye", away: "USA", group: "D", stage: "Group Stage", network: "FOX", venue: "SoFi Stadium, Los Angeles", usmnt: true },
  { id: 101, date: "2026-07-19", time: "3:00 PM", home: "SF W1", away: "SF W2", group: "", stage: "Final", network: "FOX", venue: "MetLife Stadium, New York/NJ" },
];

function NetworkBadge({ network }) {
  const cfg = NETWORK_COLORS[network] || { bg: "#555", text: "#fff", label: network };
  return <span style={{ background: cfg.bg, color: cfg.text, fontSize: "10px", fontWeight: 700, letterSpacing: "0.05em", padding: "2px 6px", borderRadius: "4px", whiteSpace: "nowrap", fontFamily: "monospace" }}>{cfg.label}</span>;
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

const stageBg = { "Group Stage": "#1a1a2e", "Round of 32": "#16213e", "Round of 16": "#0f3460", "Quarterfinals": "#533483", "Semifinals": "#e94560", "Final": "#f5a623" };

function GameCard({ game, starred, onStar }) {
  return (
    <div style={{ background: starred ? "linear-gradient(135deg,#1a2744,#0d1b35)" : "#111827", border: starred ? "1px solid #f59e0b" : "1px solid #1f2937", borderRadius: "12px", padding: "12px 14px", marginBottom: "8px", position: "relative" }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "3px", background: stageBg[game.stage] || "#333", borderRadius: "3px 0 0 3px" }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1, paddingLeft: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
            {game.usmnt && <span style={{ background: "#1d4ed8", color: "#fff", fontSize: "9px", fontWeight: 700, padding: "1px 5px", borderRadius: "3px" }}>🇺🇸 USA</span>}
            {game.group && <span style={{ color: "#6b7280", fontSize: "10px", fontWeight: 600 }}>Grp {game.group}</span>}
          </div>
          <div style={{ color: "#f3f4f6", fontWeight: 700, fontSize: game.stage === "Final" ? "16px" : "14px", lineHeight: 1.2, marginBottom: "4px" }}>
            {game.home} <span style={{ color: "#6b7280", fontWeight: 400, fontSize: "12px" }}>vs</span> {game.away}
          </div>
          <div style={{ color: "#9ca3af", fontSize: "11px", marginBottom: "4px" }}>📍 {game.venue}</div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ color: "#e5e7eb", fontSize: "12px", fontWeight: 600 }}>{game.time} ET</span>
            <NetworkBadge network={game.network} />
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px", paddingLeft: "8px" }}>
          <button onClick={() => onStar(game.id)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", opacity: starred ? 1 : 0.25, transform: starred ? "scale(1.2)" : "scale(1)", transition: "all 0.15s", padding: "2px" }}>⭐</button>
          <div style={{ color: "#f59e0b", fontSize: "11px", fontWeight: 600, textAlign: "right" }}>{formatDate(game.date)}</div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [starred, setStarred] = useState(new Set());
  const [filter, setFilter] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const toggleStar = (id) => setStarred(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const filtered = useMemo(() => games.filter(g => {
    if (filter === "priority" && !starred.has(g.id)) return false;
    if (filter === "usmnt" && !g.usmnt) return false;
    if (stageFilter !== "all" && g.stage !== stageFilter) return false;
    return true;
  }), [filter, stageFilter, starred]);
  const grouped = useMemo(() => {
    const out = {};
    filtered.forEach(g => { if (!out[g.stage]) out[g.stage] = {}; if (!out[g.stage][g.date]) out[g.stage][g.date] = []; out[g.stage][g.date].push(g); });
    return out;
  }, [filtered]);
  const btn = (active) => ({ background: active ? "#f59e0b" : "#1f2937", color: active ? "#000" : "#9ca3af", border: "none", borderRadius: "20px", padding: "6px 12px", fontSize: "12px", fontWeight: active ? 700 : 400, cursor: "pointer", whiteSpace: "nowrap" });
  const toMin = t => { const [time, ap] = t.split(" "); let [h, m] = time.split(":").map(Number); if (ap === "PM" && h !== 12) h += 12; if (ap === "AM" && h === 12) h = 0; return h * 60 + m; };
  return (
    <div style={{ background: "#0a0f1e", minHeight: "100vh", fontFamily: "'Inter',-apple-system,sans-serif", color: "#f3f4f6", maxWidth: "480px", margin: "0 auto" }}>
      <div style={{ background: "linear-gradient(135deg,#0a0f1e,#1a1040)", padding: "20px 16px 0", position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid #1f2937" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
          <span style={{ fontSize: "28px" }}>⚽</span>
          <div>
            <div style={{ fontSize: "18px", fontWeight: 800, color: "#fff" }}>FIFA World Cup 2026</div>
            <div style={{ fontSize: "11px", color: "#6b7280" }}>Jun 11 – Jul 19 · All times ET</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "10px", scrollbarWidth: "none" }}>
          {[{k:"all",l:"All Games"},{k:"priority",l:"⭐ Priority"},{k:"usmnt",l:"🇺🇸 USA"}].map(b => <button key={b.k} style={btn(filter===b.k)} onClick={()=>setFilter(b.k)}>{b.l}</button>)}
        </div>
        <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "12px", scrollbarWidth: "none" }}>
          {[{k:"all",l:"All Rounds"},...STAGE_ORDER.map(s=>({k:s,l:s==="Group Stage"?"Groups":s}))].map(b => <button key={b.k} style={btn(stageFilter===b.k)} onClick={()=>setStageFilter(b.k)}>{b.l}</button>)}
        </div>
      </div>
      <div style={{ display: "flex", gap: "8px", padding: "10px 16px", borderBottom: "1px solid #111827", flexWrap: "wrap" }}>
        <span style={{ color: "#6b7280", fontSize: "11px", alignSelf: "center" }}>Watch on:</span>
        {Object.entries(NETWORK_COLORS).map(([n, c]) => <span key={n} style={{ background: c.bg, color: c.text, fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", fontFamily: "monospace" }}>{n}</span>)}
      </div>
      <div style={{ padding: "12px 16px" }}>
        {filtered.length === 0 && <div style={{ textAlign: "center", color: "#6b7280", padding: "48px 0" }}>No games match this filter.</div>}
        {STAGE_ORDER.filter(s => grouped[s]).map(stage => (
          <div key={stage}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "16px 0 10px" }}>
              <div style={{ background: stageBg[stage], color: "#fff", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>{stage}</div>
              <div style={{ flex: 1, height: "1px", background: "#1f2937" }} />
              <span style={{ color: "#6b7280", fontSize: "11px" }}>{Object.values(grouped[stage]).flat().length} matches</span>
            </div>
            {Object.entries(grouped[stage]).sort(([a],[b])=>a.localeCompare(b)).map(([date, dayGames]) => (
              <div key={date}>
                <div style={{ color: "#4b5563", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", margin: "10px 0 6px 2px" }}>{formatDate(date)}</div>
                {[...dayGames].sort((a,b)=>toMin(a.time)-toMin(b.time)).map(g => <GameCard key={g.id} game={g} starred={starred.has(g.id)} onStar={toggleStar} />)}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ padding: "20px 16px", borderTop: "1px solid #111827", textAlign: "center", color: "#374151", fontSize: "11px" }}>
        English: FOX / FS1 · Spanish: Telemundo / Universo / Peacock
      </div>
    </div>
  );
}