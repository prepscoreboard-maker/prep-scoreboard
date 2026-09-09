"use client"

type Side = "home" | "away"

interface TeamPanelProps {
  side: Side
  name: string
  score: number
  onNameChange: (name: string) => void
  onScore: (delta: number) => void
  accentVar: string
}

const STEPS = [1, 2, 3]

export function TeamPanel({ side, name, score, onNameChange, onScore, accentVar }: TeamPanelProps) {
  return (
    <section
      className="flex flex-col items-center rounded-[var(--radius)] bg-panel p-6 md:p-8"
      style={{ borderTop: `4px solid ${accentVar}` }}
      aria-label={`${side} team scoreboard`}
    >
      <input
        value={name}
        onChange={(e) => onNameChange(e.target.value.slice(0, 16))}
        aria-label={`${side} team name`}
        className="w-full rounded-md bg-transparent text-center text-xl font-semibold uppercase tracking-widest text-foreground outline-none focus:bg-background/60 md:text-2xl"
        style={{ color: accentVar }}
        spellCheck={false}
      />

      <div className="tabular my-4 font-mono text-[6rem] font-bold leading-none md:text-[9rem]" style={{ color: accentVar }}>
        {score}
      </div>

      <div className="flex w-full flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {STEPS.map((step) => (
            <button
              key={step}
              onClick={() => onScore(step)}
              className="rounded-md bg-background/70 py-4 text-lg font-bold text-foreground transition-colors hover:bg-background active:scale-95"
              aria-label={`Add ${step} point${step > 1 ? "s" : ""} to ${side}`}
            >
              +{step}
            </button>
          ))}
        </div>
        <button
          onClick={() => onScore(-1)}
          disabled={score <= 0}
          className="rounded-md border border-muted/40 py-3 text-sm font-medium text-muted transition-colors hover:text-foreground disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={`Subtract 1 point from ${side}`}
        >
          −1
        </button>
      </div>
    </section>
  )
}
