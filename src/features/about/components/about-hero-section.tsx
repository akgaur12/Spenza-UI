export function AboutHeroSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20 pb-16 text-center lg:pt-28">
      <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-success/20 bg-success/10 px-3 py-1 text-xs font-medium text-success">
        <span className="size-1.5 rounded-full bg-success" />
        About Spenza
      </div>

      <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl lg:text-pretty">
        Built to make expense tracking effortless, not a chore.
      </h1>

      <p className="mx-auto mt-6 max-w-lg text-lg text-muted-foreground text-balance">
        Spenza is a small, focused app for one job: helping you see where your money actually goes, without the
        clutter most finance apps pile on top of it.
      </p>
    </section>
  )
}
