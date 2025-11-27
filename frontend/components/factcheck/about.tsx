"use client"

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t">
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <h2 id="about-title" className="text-2xl font-semibold tracking-tight text-balance md:text-3xl">
              About FactCheckAI
            </h2>
            <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
              FactCheckAI helps you quickly validate claims with AI-assisted evidence gathering. Our goal is to make
              reliable information accessible by combining transparent sources with intuitive tooling you can trust.
            </p>
            <ul className="mt-6 space-y-2 text-sm leading-relaxed">
              <li className="text-muted-foreground">• Evidence-first results with citations you can verify</li>
              <li className="text-muted-foreground">• Clear confidence indicators for faster decisions</li>
              <li className="text-muted-foreground">• Designed for journalists, researchers, and everyday readers</li>
            </ul>
          </div>

          <div className="flex items-center justify-center">
            {/* Decorative logo mark (alt empty to avoid repetition for SR users) */}
            <img
              src="/images/factcheckai-logo.png"
              alt=""
              width={240}
              height={240}
              className="h-32 w-32 md:h-40 md:w-40 rounded-md ring-1 ring-border"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
