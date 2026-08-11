import { SectionTitle } from '@/components/common/section-title'

export function AboutStorySection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14 sm:py-24">
      <SectionTitle eyebrow="The story" title="Why Spenza exists" />

      <div className="mx-auto mt-8 max-w-2xl space-y-4 text-sm leading-relaxed text-muted-foreground sm:mt-10 sm:text-base">
        <p>
          Spenza started as a personal project — a way to stop losing track of where money was going every month,
          without reaching for a spreadsheet or a bloated finance app packed with features that never got used.
        </p>
        <p>
          Most expense trackers either try to do too much — budgeting rules, investment tracking, bank sync, ads — or
          too little. Spenza is built around the one thing that actually matters day to day: logging an expense in
          seconds and being able to make sense of it later.
        </p>
        <p>It's still evolving, one feature at a time, based on what's actually useful to the people using it.</p>
      </div>
    </section>
  )
}
