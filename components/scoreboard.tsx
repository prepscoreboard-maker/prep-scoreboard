"use client"

import { useState } from "react"
import { TeamPanel } from "./team-panel"
import { GameClock } from "./game-clock"

export function Scoreboard() {
  const [homeName, setHomeName] = useState("Home")
  const [awayName, setAwayName] = useState("Away")
  const [homeScore, setHomeScore] = useState(0)
  const [awayScore, setAwayScore] = useState(0)
  const [period, setPeriod] = useState(1)

  const bump = (setter: React.Dispatch<React.SetStateAction<number>>) => (delta: number) =>
    setter((prev) => Math.max(0, prev + delta))

  const resetGame = () => {
    setHomeScore(0)
    setAwayScore(0)
    setPeriod(1)
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
      <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-[1fr_auto_1fr]">
        <TeamPanel
          side="home"
          name={homeName}
          score={homeScore}
          onNameChange={setHomeName}
          onScore={bump(setHomeScore)}
          accentVar="var(--home)"
        />

        <div className="flex flex-col items-center justify-between gap-6 rounded-[var(--radius)] bg-panel px-6 py-8">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">Period</p>
            <div className="tabular font-mono text-5xl font-bold text-foreground">{period}</div>
            <div className="flex gap-2">
              <button
                onClick={() => setPeriod((p) => Math.max(1, p - 1))}
                className="rounded-md border border-muted/40 px-3 py-1 text-sm text-muted transition-colors hover:text-foreground"
                aria-label="Previous period"
              >
                −
              </button>
              <button
                onClick={() => setPeriod((p) => p + 1)}
                className="rounded-md border border-muted/40 px-3 py-1 text-sm text-muted transition-colors hover:text-foreground"
                aria-label="Next period"
              >
                +
              </button>
            </div>
          </div>

          <GameClock />
        </div>

        <TeamPanel
          side="away"
          name={awayName}
          score={awayScore}
          onNameChange={setAwayName}
          onScore={bump(setAwayScore)}
          accentVar="var(--away)"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={resetGame}
          className="rounded-md border border-muted/40 px-6 py-2 text-sm font-medium uppercase tracking-wider text-muted transition-colors hover:border-foreground/40 hover:text-foreground"
        >
          Reset Game
        </button>
      </div>
    </div>
  )
}
