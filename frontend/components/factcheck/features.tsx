import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ShieldCheck, Globe, Puzzle } from "lucide-react"

export function Features() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Two-tier verification system",
      desc: "Automated AI checks followed by optional human-verifier workflows for high-stakes claims.",
    },
    {
      icon: Globe,
      title: "Cross-platform availability",
      desc: "Use on web, mobile, and messaging apps. Verify claims wherever you read or share content.",
    },
    {
      icon: Puzzle,
      title: "Browser extension",
      desc: "On-page highlights and instant references right in your browser for seamless verification.",
    },
  ]

  return (
    <section id="features" className="w-full bg-muted/20">
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="mb-8 text-center">
          <h2 className="text-pretty font-sans text-2xl font-semibold md:text-4xl">Built for clarity and trust</h2>
          <p className="mt-2 text-muted-foreground">Lean, fast, and accurate tools to spot truth from noise.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {items.map(({ icon: Icon, title, desc }) => (
            <Card key={title} className="border bg-background">
              <CardHeader>
                <div className="inline-flex size-10 items-center justify-center rounded-full bg-blue-600/10 text-blue-600">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <CardTitle className="mt-2 text-lg">{title}</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">{desc}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
