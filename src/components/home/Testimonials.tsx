'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { text: "Beautiful diya set! The brass quality is genuine and they look gorgeous when lit during aarti.", name: "Ananya Patel", city: "Ahmedabad", rating: 5 },
  { text: "The rudraksha mala feels authentic. Very happy with the quality and packaging.", name: "Suresh Reddy", city: "Hyderabad", rating: 5 },
  { text: "Fast delivery and beautifully packed. The wooden mandir exceeded my expectations!", name: "Meera Iyer", city: "Chennai", rating: 5 },
  { text: "Pure cow ghee for diya — burns so clean and the flame is steady for hours.", name: "Vikram Singh", city: "Delhi", rating: 4 },
  { text: "The craftsmanship is simply stunning. Worth every rupee.", name: "Rajesh Kumar", city: "Jaipur", rating: 5 },
  { text: "Camphor quality is exceptional. The fragrance fills the entire room instantly.", name: "Priya Sharma", city: "Jaipur", rating: 5 },
];

export function Testimonials() {
  return (
    <section className="bg-(--bg-page) py-32 border-b border-(--border-subtle) overflow-hidden relative z-10">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-accent mb-2.5 font-serif">
            Loved by Devotees
          </p>
          <h2 className="text-3xl md:text-5xl font-display text-(--text-primary)">
            Witnesses of Quality
          </h2>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.96, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, scale: 1.015 }}
              className="rounded-[24px] p-6.5 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group bg-(--card-bg) border border-(--border-subtle) hover:border-(--card-hover-border) shadow-xs hover:shadow-accent"
            >
              {/* Decorative quotation mark */}
              <div className="absolute top-4 right-6 text-7xl text-(--text-primary)/5 font-display select-none pointer-events-none group-hover:text-accent/10 transition-colors">
                “
              </div>

              <div>
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6 select-none">
                  {[1, 2, 3, 4, 5].map(s => (
                    <Star 
                      key={s} 
                      className={`w-4 h-4 ${s <= r.rating ? 'text-accent fill-accent' : 'text-(--border-strong) fill-none'}`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm font-serif text-(--text-secondary) italic leading-relaxed mb-6 font-medium">
                  &ldquo;{r.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 border-t border-(--border-subtle) pt-5 mt-auto">
                {/* Avatar with gradient */}
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-accent/20 to-accent/5 flex items-center justify-center text-xs font-bold text-accent shrink-0 shadow-inner border border-accent/10">
                  {r.name[0]}
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-(--text-primary)">{r.name}</h4>
                  <p className="text-[9px] font-semibold text-(--text-muted) flex items-center gap-1 mt-0.5">
                    <span className="text-emerald-500 font-bold">✓</span> Verified Devotee · {r.city}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
