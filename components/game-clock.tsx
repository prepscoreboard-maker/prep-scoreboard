"use client"

import { useEffect, useRef, useState } from "react"

function format(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, "0")}`
}

export function GameClock() {
  const [seconds, setSeconds] = useState(600)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev <= 1) {
            setRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [running])

  const adjust = (delta: number) => {
    setSeconds((prev) => Math.max(0, prev + delta))
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-muted">Game Clock</p>
      <div className="tabular font-mono text-5xl font-bold text-accent md:text-6xl">{format(seconds)}</div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          onClick={() => setRunning((r) => !r)}
          className="rounded-md bg-accent px-6 py-2 text-sm font-bold uppercase tracking-wider text-background transition-transform active:scale-95"
        >
          {running ? "Pause" : "Start"}
        </button>
        <button
          onClick={() => {
            setRunning(false)
            setSeconds(600)
          }}
          className="rounded-md border border-muted/40 px-4 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground"
        >
          Reset
        </button>
        <button
          onClick={() => adjust(60)}
          disabled={running}
          className="rounded-md border border-muted/40 px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:opacity-40"
        >
          +1:00
        </button>
        <button
          onClick={() => adjust(-60)}
          disabled={running}
          className="rounded-md border border-muted/40 px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:opacity-40"
        >
          −1:00
        </button>
      </div>
    </div>
  )
}
