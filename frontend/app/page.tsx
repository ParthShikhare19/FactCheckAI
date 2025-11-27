import { Hero } from "@/components/factcheck/hero"
import { About } from "@/components/factcheck/about"
import { Features } from "@/components/factcheck/features"
import { Testimonials } from "@/components/factcheck/testimonials"
import { Footer } from "@/components/factcheck/footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Hero />
      <About />
      <Features />
      <Testimonials />
      <Footer />
    </main>
  )
}
