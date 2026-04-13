import { BadgeCheck, Headset, Map, ShieldX, TrendingUp } from 'lucide-react'

const features = [
  { Icon: ShieldX, label: 'Zero On-Ground Hassle' },
  { Icon: BadgeCheck, label: 'Verified Properties & Best Pricing' },
  { Icon: Headset, label: 'End-to-End Ownership Support' },
  { Icon: Map, label: 'Local Experts, Global Access' },
  { Icon: TrendingUp, label: 'Built for Wealth Creation' },
]

export default function Features() {
  return (
    <section className="py-12 bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className="flex min-w-0 items-center justify-center gap-2 rounded-full border border-primary/10 bg-primary/4 px-3 py-2 text-center"
            >
              <div className="shrink-0 rounded-lg border border-primary/15 bg-primary/10 p-1.5">
                <feature.Icon className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-[12px] font-semibold leading-tight text-secondary md:text-[13px]">
                {feature.label}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
