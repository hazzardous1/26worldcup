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
  { id: 13, date: "2026-06-15", time: "12:00 PM", home: "Spain", away: "Cabo Verde", group: "A", stage: "Group Stage", network: "FS1", venue: "Estadio BBVA, Monterrey" },
  { id: 14, date: "2026-06-15", time: "3:00 PM", home: "Belgium", away: "Egypt", group: "B", stage: "Group Stage", network: "FOX", venue: "Lincoln Financial Field, Philadelphia" },
  { id: 15, date: "2026-06-15", time: "6:00 PM", home: "Saudi Arabia", away: "Uruguay", group: "C", stage: "Group Stage", network: "FS1", venue: "Levi's Stadium, San Francisco" },
  { id: 16, date: "2026-06-15", time: "9:00 PM", home: "Iran", away: "New Zealand", group: "D", stage: "Group Stage", network: "FS1", venue: "NRG Stadium, Houston" },
  { id: 17, date: "2026-06-16", time: "3:00 PM", home: "France", away: "Senegal", group: "E", stage: "Group Stage", network: "FOX", venue: "MetLife Stadium, New York/NJ" },
  { id: 18, date: "2026-06-16", time: "6:00 PM", home: "Norway", away: "Playoff 2 Winner", group: "F", stage: "Group Stage", network: "FOX", venue: "Gillette Stadium, Boston" },
  { id: 19, date: "2026-06-16", time: "9:00 PM", home: "Argentina", away: "Algeria", group: "G", stage: "Group Stage", network: "FOX", venue: "Arrowhead Stadium, Kansas City" },
  { id: 20, date: "2026-06-17", time: "12:00 PM", home: "Croatia", away: "China", group: "H", stage: "Group Stage", network: "FS1", venue: "SoFi Stadium, Los Angeles" },
  { id: 21, date: "2026-06-17", time: "3:00 PM", home: "Portugal", away: "Playoff 3 Winner", group: "I", stage: "Group Stage", network: "FOX", venue: "AT&T Stadium, Dallas" },
  { id: 22, date: "2026-06-17", time: "6:00 PM", home: "England", away: "Colombia", group: "J", stage: "Group Stage", network: "FOX", venue: "Hard Rock Stadium, Miami" },
  { id: 23, date: "2026-06-17", time: "9:00 PM", home: "Colombia", away: "Uzbekistan", group: "K", stage: "Group Stage", network: "FS1", venue: "NRG Stadium, Houston" },
  { id: 24, date: "2026-06-18", time: "12:00 PM", home: "Denmark", away: "Playoff 1 Winner", group: "L", stage: "Group Stage", network: "FS1", venue: "MetLife Stadium, New York/NJ" },
  { id: 25, date: "2026-06-18", time: "3:00 PM", home: "Mexico", away: "Jordan", group: "A", stage: "Group Stage", network: "Telemundo", venue: "Estadio Akron, Guadalajara" },
  { id: 26, date: "2026-06-18", time: "6:00 PM", home: "South Korea", away: "Romania", group: "B", stage: "Group Stage", network: "FS1", venue: "Lincoln Financial Field, Philadelphia" },
  { id: 27, date: "2026-06-18", time: "9:00 PM", home: "Canada", away: "Honduras", group: "C", stage: "Group Stage", network: "FOX", venue: "BC Place, Vancouver" },
  { id: 28, date: "2026-06-19", time: "12:00 PM", home: "England", away: "Colombia", group: "J", stage: "Group Stage", network: "FOX", venue: "AT&T Stadium, Dallas" },
  { id: 29, date: "2026-06-19", time: "3:00 PM", home: "USA", away: "Australia", group: "D", stage: "Group Stage", network: "FOX", venue: "Lumen Field, Seattle", usmnt: true },
  { id: 30, date: "2026-06-19", time: "6:00 PM", home: "Belgium", away: "Czechia", group: "B", stage: "Group Stage", network: "FS1", venue: "BMO Field, Toronto" },
  { id: 31, date: "2026-06-19", time: "9:00 PM", home: "Brazil", away: "Norway", group: "F", stage: "Group Stage", network: "FOX", venue: "Gillette Stadium, Boston" },
  { id: 32, date: "2026-06-20", time: "12:00 PM", home: "Qatar", away: "France", group: "E", stage: "Group Stage", network: "FS1", venue: "Arrowhead Stadium, Kansas City" },
  { id: 33, date: "2026-06-20", time: "3:00 PM", home: "Argentina", away: "Ghana", group: "G", stage: "Group Stage", network: "FOX", venue: "NRG Stadium, Houston" },
  { id: 34, date: "2026-06-20", time: "6:00 PM", home: "Croatia", away: "Playoff 4 Winner", group: "H", stage: "Group Stage", network: "FS1", venue: "SoFi Stadium, Los Angeles" },
  { id: 35, date: "2026-06-20", time: "9:00 PM", home: "Germany", away: "Portugal", group: "I", stage: "Group Stage", network: "FOX", venue: "MetLife Stadium, New York/NJ" },
  { id: 36, date: "2026-06-21", time: "12:00 PM", home: "Netherlands", away: "Colombia", group: "J", stage: "Group Stage", network: "FS1", venue: "Hard Rock Stadium, Miami" },
  { id: 37, date: "2026-06-21", time: "3:00 PM", home: "Ivory Coast", away: "Slovakia", group: "K", stage: "Group Stage", network: "FS1", venue: "Lincoln Financial Field, Philadelphia" },
  { id: 38, date: "2026-06-21", time: "6:00 PM", home: "Sweden", away: "Ukraine", group: "L", stage: "Group Stage", network: "FS1", venue: "Levi's Stadium, San Francisco" },
  { id: 39, date: "2026-06-21", time: "9:00 PM", home: "Spain", away: "Japan", group: "A", stage: "Group Stage", network: "FOX", venue: "Estadio BBVA, Monterrey" },
  { id: 40, date: "2026-06-22", time: "12:00 PM", home: "Saudi Arabia", away: "Iran", group: "C", stage: "Group Stage", network: "FS1", venue: "BMO Field, Toronto" },
  { id: 41, date: "2026-06-22", time: "3:00 PM", home: "South Africa", away: "Cabo Verde", group: "A", stage: "Group Stage", network: "Telemundo", venue: "Estadio Azteca, Mexico City" },
  { id: 42, date: "2026-06-22", time: "6:00 PM", home: "Egypt", away: "Czechia", group: "B", stage: "Group Stage", network: "FS1", venue: "BC Place, Vancouver" },
  { id: 43, date: "2026-06-22", time: "9:00 PM", home: "Uruguay", away: "New Zealand", group: "D", stage: "Group Stage", network: "FS1", venue: "AT&T Stadium, Dallas" },
  { id: 44, date: "2026-06-23", time: "12:00 PM", home: "France", away: "Playoff 2 Winner", group: "E", stage: "Group Stage", network: "FOX", venue: "Gillette Stadium, Boston" },
  { id: 45, date: "2026-06-23", time: "3:00 PM", home: "Morocco", away: "Norway", group: "F", stage: "Group Stage", network: "FS1", venue: "NRG Stadium, Houston" },
  { id: 46, date: "2026-06-23", time: "6:00 PM", home: "Haiti", away: "Algeria", group: "G", stage: "Group Stage", network: "FS1", venue: "Arrowhead Stadium, Kansas City" },
  { id: 47, date: "2026-06-23", time: "9:00 PM", home: "Türkiye", away: "China", group: "H", stage: "Group Stage", network: "FS1", venue: "Hard Rock Stadium, Miami" },
  { id: 48, date: "2026-06-24", time: "12:00 PM", home: "Curaçao", away: "Playoff 3 Winner", group: "I", stage: "Group Stage", network: "FS1", venue: "Lincoln Financial Field, Philadelphia" },
  { id: 49, date: "2026-06-24", time: "3:00 PM", home: "Japan", away: "Uzbekistan", group: "J", stage: "Group Stage", network: "FOX", venue: "MetLife Stadium, New York/NJ" },
  { id: 50, date: "2026-06-24", time: "6:00 PM", home: "Ecuador", away: "Slovakia", group: "K", stage: "Group Stage", network: "FS1", venue: "Levi's Stadium, San Francisco" },
  { id: 51, date: "2026-06-24", time: "9:00 PM", home: "Tunisia", away: "Playoff 1 Winner", group: "L", stage: "Group Stage", network: "FS1", venue: "SoFi Stadium, Los Angeles" },
  { id: 52, date: "2026-06-25", time: "12:00 PM", home: "Scotland", away: "Ghana", group: "G", stage: "Group Stage", network: "FOX", venue: "BC Place, Vancouver" },
  { id: 53, date: "2026-06-25", time: "12:00 PM", home: "Argentina", away: "Haiti", group: "G", stage: "Group Stage", network: "FS1", venue: "Arrowhead Stadium, Kansas City" },
  { id: 54, date: "2026-06-25", time: "3:00 PM", home: "China", away: "Playoff 4 Winner", group: "H", stage: "Group Stage", network: "FOX", venue: "Hard Rock Stadium, Miami" },
  { id: 55, date: "2026-06-25", time: "3:00 PM", home: "Australia", away: "Croatia", group: "H", stage: "Group Stage", network: "FS1", venue: "SoFi Stadium, Los Angeles" },
  { id: 56, date: "2026-06-25", time: "10:00 PM", home: "Türkiye", away: "USA", group: "D", stage: "Group Stage", network: "FOX", venue: "SoFi Stadium, Los Angeles", usmnt: true },
  { id: 57, date: "2026-06-26", time: "12:00 PM", home: "New Zealand", away: "Paraguay", group: "D", stage: "Group Stage", network: "FS1", venue: "NRG Stadium, Houston" },
  { id: 58, date: "2026-06-26", time: "12:00 PM", home: "Switzerland", away: "Senegal", group: "E", stage: "Group Stage", network: "FOX", venue: "AT&T Stadium, Dallas" },
  { id: 59, date: "2026-06-26", time: "3:00 PM", home: "Morocco", away: "Norway (R3)", group: "F", stage: "Group Stage", network: "FS1", venue: "Gillette Stadium, Boston" },
  { id: 60, date: "2026-06-26", time: "3:00 PM", home: "Brazil", away: "Playoff 2 (R3)", group: "F", stage: "Group Stage", network: "FOX", venue: "MetLife Stadium, New York/NJ" },
  { id: 61, date: "2026-06-27", time: "12:00 PM", home: "South Korea", away: "Egypt", group: "B", stage: "Group Stage", network: "FOX", venue: "BMO Field, Toronto" },
  { id: 62, date: "2026-06-27", time: "12:00 PM", home: "Belgium", away: "Romania", group: "B", stage: "Group Stage", network: "FS1", venue: "Lincoln Financial Field, Philadelphia" },
  { id: 63, date: "2026-06-27", time: "3:00 PM", home: "Canada", away: "Saudi Arabia", group: "C", stage: "Group Stage", network: "FOX", venue: "BC Place, Vancouver" },
  { id: 64, date: "2026-06-27", time: "3:00 PM", home: "Uruguay", away: "Honduras", group: "C", stage: "Group Stage", network: "FS1", venue: "Levi's Stadium, San Francisco" },
  { id: 65, date: "2026-06-27", time: "6:00 PM", home: "Cabo Verde", away: "Jordan", group: "A", stage: "Group Stage", network: "FOX", venue: "Estadio Akron, Guadalajara" },
  { id: 66, date: "2026-06-27", time: "6:00 PM", home: "Spain", away: "Mexico", group: "A", stage: "Group Stage", network: "Telemundo", venue: "Estadio Azteca, Mexico City" },
  { id: 67, date: "2026-06-27", time: "9:00 PM", home: "Germany", away: "Curaçao (R3)", group: "I", stage: "Group Stage", network: "FOX", venue: "AT&T Stadium, Dallas" },
  { id: 68, date: "2026-06-27", time: "9:00 PM", home: "Portugal", away: "Playoff 3 (R3)", group: "I", stage: "Group Stage", network: "FS1", venue: "NRG Stadium, Houston" },
  { id: 69, date: "2026-06-29", time: "3:00 PM", home: "Runner-up A", away: "Runner-up B", group: "", stage: "Round of 32", network: "FOX", venue: "SoFi Stadium, Los Angeles" },
  { id: 70, date: "2026-06-29", time: "7:00 PM", home: "Winner C", away: "Runner-up F", group: "", stage: "Round of 32", network: "FS1", venue: "NRG Stadium, Houston" },
  { id: 71, date: "2026-06-29", time: "11:00 PM", home: "Winner F", away: "Runner-up C", group: "", stage: "Round of 32", network: "FS1", venue: "Estadio BBVA, Monterrey" },
  { id: 72, date: "2026-06-30", time: "3:00 PM", home: "Winner E", away: "3rd A/B/C/D/F", group: "", stage: "Round of 32", network: "FOX", venue: "Gillette Stadium, Boston" },
  { id: 73, date: "2026-06-30", time: "7:00 PM", home: "Runner-up E", away: "Runner-up I", group: "", stage: "Round of 32", network: "FS1", venue: "AT&T Stadium, Dallas" },
  { id: 74, date: "2026-06-30", time: "11:00 PM", home: "Winner I", away: "3rd C/D/F/G/H", group: "", stage: "Round of 32", network: "FOX", venue: "MetLife Stadium, New York/NJ" },
  { id: 75, date: "2026-07-01", time: "12:00 PM", home: "Winner A", away: "Runner-up D", group: "", stage: "Round of 32", network: "FS1", venue: "Estadio Azteca, Mexico City" },
  { id: 76, date: "2026-07-01", time: "4:00 PM", home: "Winner G", away: "3rd A/E/H/I/J", group: "", stage: "Round of 32", network: "FOX", venue: "Lumen Field, Seattle" },
  { id: 77, date: "2026-07-01", time: "8:00 PM", home: "Winner D", away: "3rd B/E/F/I/J", group: "", stage: "Round of 32", network: "FS1", venue: "Levi's Stadium, San Francisco" },
  { id: 78, date: "2026-07-02", time: "3:00 PM", home: "Winner H", away: "Runner-up J", group: "", stage: "Round of 32", network: "FOX", venue: "SoFi Stadium, Los Angeles" },
  { id: 79, date: "2026-07-02", time: "7:00 PM", home: "Runner-up K", away: "Runner-up L", group: "", stage: "Round of 32", network: "FS1", venue: "BMO Field, Toronto" },
  { id: 80, date: "2026-07-02", time: "11:00 PM", home: "Winner B", away: "3rd E/F/G/I/J", group: "", stage: "Round of 32", network: "FOX", venue: "BC Place, Vancouver" },
  { id: 81, date: "2026-07-03", time: "2:00 PM", home: "Runner-up D", away: "Runner-up G", group: "", stage: "Round of 32", network: "FS1", venue: "AT&T Stadium, Dallas" },
  { id: 82, date: "2026-07-03", time: "6:00 PM", home: "Winner J", away: "Runner-up H", group: "", stage: "Round of 32", network: "FOX", venue: "Hard Rock Stadium, Miami" },
  { id: 83, date: "2026-07-03", time: "9:30 PM", home: "Winner K", away: "3rd D/E/I/J/L", group: "", stage: "Round of 32", network: "FS1", venue: "Arrowhead Stadium, Kansas City" },
  { id: 84, date: "2026-07-04", time: "1:00 PM", home: "R32 Match W1", away: "R32 Match W2", group: "", stage: "Round of 32", network: "FOX", venue: "NRG Stadium, Houston" },
  { id: 85, date: "2026-07-04", time: "5:00 PM", home: "Winner L", away: "Runner-up K", group: "", stage: "Round of 32", network: "FS1", venue: "Lincoln Financial Field, Philadelphia" },
  { id: 86, date: "2026-07-04", time: "9:00 PM", home: "Runner-up J", away: "Runner-up L", group: "", stage: "Round of 32", network: "FOX", venue: "Levi's Stadium, San Francisco" },
  { id: 87, date: "2026-07-06", time: "3:00 PM", home: "R32 W1", away: "R32 W2", group: "", stage: "Round of 16", network: "FOX", venue: "MetLife Stadium, New York/NJ" },
  { id: 88, date: "2026-07-06", time: "7:00 PM", home: "R32 W3", away: "R32 W4", group: "", stage: "Round of 16", network: "FS1", venue: "AT&T Stadium, Dallas" },
  { id: 89, date: "2026-07-07", time: "3:00 PM", home: "R32 W5", away: "R32 W6", group: "", stage: "Round of 16", network: "FOX", venue: "SoFi Stadium, Los Angeles" },
  { id: 90, date: "2026-07-07", time: "7:00 PM", home: "R32 W7", away: "R32 W8", group: "", stage: "Round of 16", network: "FS1", venue: "Levi's Stadium, San Francisco" },
  { id: 91, date: "2026-07-08", time: "3:00 PM", home: "R32 W9", away: "R32 W10", group: "", stage: "Round of 16", network: "FOX", venue: "Hard Rock Stadium, Miami" },
  { id: 92, date: "2026-07-08", time: "7:00 PM", home: "R32 W11", away: "R32 W12", group: "", stage: "Round of 16", network: "FS1", venue: "Arrowhead Stadium, Kansas City" },
  { id: 93, date: "2026-07-09", time: "3:00 PM", home: "R32 W13", away: "R32 W14", group: "", stage: "Round of 16", network: "FOX", venue: "NRG Stadium, Houston" },
  { id: 94, date: "2026-07-09", time: "7:00 PM", home: "R32 W15", away: "R32 W16", group: "", stage: "Round of 16", network: "FS1", venue: "Gillette Stadium, Boston" },
  { id: 95, date: "2026-07-11", time: "3:00 PM", home: "R16 W1", away: "R16 W2", group: "", stage: "Quarterfinals", network: "FOX", venue: "MetLife Stadium, New York/NJ" },
  { id: 96, date: "2026-07-11", time: "7:00 PM", home: "R16 W3", away: "R16 W4", group: "", stage: "Quarterfinals", network: "FS1", venue: "SoFi Stadium, Los Angeles" },
  { id: 97, date: "2026-07-12", time: "3:00 PM", home: "R16 W5", away: "R16 W6", group: "", stage: "Quarterfinals", network: "FOX", venue: "AT&T Stadium, Dallas" },
  { id: 98, date: "2026-07-12", time: "7:00 PM", home: "R16 W7", away: "R16 W8", group: "", stage: "Quarterfinals", network: "FS1", venue: "Levi's Stadium, San Francisco" },
  { id: 99, date: "2026-07-14", time: "7:00 PM", home: "QF W1", away: "QF W2", group: "", stage: "Semifinals", network: "FOX", venue: "MetLife Stadium, New York/NJ" },
  { id: 100, date: "2026-07-15", time: "7:00 PM", home: "QF W3", away: "QF W4", group: "", stage: "Semifinals", network: "FOX", venue: "AT&T Stadium, Dallas" },
  { id: 101, date: "2026-07-19", time: "3:00 PM", home: "SF W1", away: "SF W2", group: "", stage: "Final", network: "FOX", venue: "MetLife Stadium, New York/NJ" },
];

const stageBg = { "Group Stage": "#1a1a2e", "Round of 32": "#16213e", "Round of 16": "#0f3460", "Quarterfinals": "#533483", "Semifinals": "#e94560", "Final": "#f5a623" };

function NetworkBadge({ network }) {
  const cfg = NETWORK_COLORS[network] || { bg: "#555", text: "#fff", label: network };
  return <span style={{ background: cfg.bg, color: cfg.text, fontSize: "10px", fontWeight: 700, letterSpacing: "0.05em", padding: "2px 6px", borderRadius: "4px", whiteSpace: "nowrap", fontFamily: "monospace" }}>{cfg.label}</span>;
}

function formatDate(dateStr) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
}

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
       
      maxWidth: "100%"

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
