import { Star } from "lucide-react";
import { Reveal } from "./Reveal";

const reviews = [
  { name: "Bishal Adhikari", date: "2025-03-03", stars: 5, text: "Was planning to throw away my kid's car but then came across MyToysCare. The biggest service center for toys — was not expecting much, but to my amazement they gave a very good servicing. Best service at the best price. Loved it!" },
  { name: "Priya Sharma", date: "2025-02-14", stars: 5, text: "Extremely good service. Was able to fix the RC toy car which stopped working. Delighted with the type of service and the explanation given to maintain the toy in good condition." },
  { name: "Sneha Ravi", date: "2025-02-14", stars: 4, text: "Fast response and quality work. My daughter's toy scooter was repaired within one day." },
  { name: "Nitish Reddy", date: "2025-01-25", stars: 5, text: "Excellent repair service. My son's ride-on car is working like new again. Highly recommended." },
  { name: "Rahul Gowda", date: "2025-01-25", stars: 5, text: "Very professional support and genuine spare parts." },
  { name: "Swarna J", date: "2025-01-25", stars: 4, text: "Affordable and fast repair service. Recommended." },
];

export function Reviews() {
  return (
    <section id="reviews" className="py-24">
      <div className="container mx-auto px-4">
        <Reveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs uppercase tracking-[0.2em] text-brand font-semibold mb-4">Customer Reviews</div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold">
              Loved by <span className="text-gradient-brand">Bangalore Parents</span>
            </h2>
            <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-border bg-gradient-card px-5 py-3">
              <span className="font-display text-2xl font-bold text-brand">4.9</span>
              <div>
                <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-brand text-brand" />)}</div>
                <div className="text-xs text-muted-foreground mt-0.5">Based on 133 Google Reviews</div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-3xl border border-border bg-gradient-card p-6 shadow-card hover:border-brand/40 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-brand text-brand-foreground font-bold">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{r.name}</div>
                      <div className="text-xs text-muted-foreground">{r.date}</div>
                    </div>
                  </div>
                  <div className="font-display text-xl font-bold text-brand">G</div>
                </div>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className={`h-4 w-4 ${idx < r.stars ? "fill-brand text-brand" : "text-muted"}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}