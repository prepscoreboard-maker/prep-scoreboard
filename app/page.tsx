import { Scoreboard } from "@/components/scoreboard"

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col px-4 py-8 md:py-12">
      <header className="mx-auto mb-8 w-full max-w-5xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-balance md:text-4xl">
          Prep <span className="text-accent">Scoreboard</span>
        </h1>
        <p className="mt-2 text-sm text-muted text-pretty">
          A free online scoreboard for games, sports, and competitions. Tap to keep score.
        </p>
      </header>
      <Scoreboard />
    </main>
  )
}
