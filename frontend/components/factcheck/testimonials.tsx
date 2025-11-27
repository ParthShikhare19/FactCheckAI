import { Card, CardContent } from "@/components/ui/card"

export function Testimonials() {
  const quotes = [
    {
      quote: "FactCheckAI has become essential to our newsroom—fast checks without compromising accuracy.",
      author: "Investigative Editor",
    },
    {
      quote: "We verify sources in minutes, not hours. It has completely streamlined our workflows.",
      author: "Research Analyst",
    },
    {
      quote: "The browser extension is a game changer—instant context on claims wherever I browse.",
      author: "Media Literacy Educator",
    },
  ]

  return (
    <section id="testimonials" className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="mb-8 text-center">
          <h2 className="text-pretty font-sans text-2xl font-semibold md:text-4xl">Trusted by professionals</h2>
          <p className="mt-2 text-muted-foreground">Hear from the people who rely on FactCheckAI every day.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quotes.map((q, i) => (
            <Card key={i} className="border bg-background">
              <CardContent className="pt-6">
                <p className="text-pretty">“{q.quote}”</p>
                <p className="mt-3 text-sm text-muted-foreground">— {q.author}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
