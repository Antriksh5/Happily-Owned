import { useState } from 'react'
import { BadgeCheck, FileSignature, MessageCircle, Search, ShieldCheck, TrendingUp } from 'lucide-react'
import './Process.css'

const steps = [
  { number: '1', title: 'Discover', description: 'Explore curated real estate opportunities across India.', Icon: Search },
  { number: '2', title: 'Consult', description: 'Get personalized guidance based on your goals and budget.', Icon: MessageCircle },
  { number: '3', title: 'Curate', description: 'Review handpicked, verified properties tailored for you.', Icon: BadgeCheck },
  { number: '4', title: 'Verify & Decide', description: 'We handle due diligence, site visits, and final selection.', Icon: ShieldCheck },
  { number: '5', title: 'Transact', description: 'Complete legal & financial processes seamlessly.', Icon: FileSignature },
  { number: '6', title: 'Manage & Earn', description: 'We manage, rent, and grow your property income.', Icon: TrendingUp },
]

function Step({
  step,
  index,
  layout = 'horizontal',
  showConnector = false,
  reached = false,
  connectorActive = false,
  onHoverStart,
  onHoverEnd,
}) {
  const isVertical = layout === 'vertical'
  const isGrid = layout === 'grid'
  const isHorizontal = layout === 'horizontal'
  const connectorClassName = isVertical
    ? 'process-connector-vertical absolute left-[1.55rem] top-14 h-[calc(100%-1.5rem)] w-[2px]'
    : 'process-connector absolute left-[calc(50%+2.75rem)] top-[2.6rem] h-[3px] w-[calc(100%+1.25rem)]'

  return (
    <div
      className={`group relative ${isVertical ? 'pl-16' : 'min-w-0'} ${isGrid ? 'pt-2' : ''} ${isHorizontal ? 'h-full w-full' : ''
        }`}
      onMouseEnter={() => onHoverStart?.(index)}
      onMouseLeave={onHoverEnd}
    >
      {showConnector && (
        <span
          className={connectorClassName}
          data-active={connectorActive ? 'true' : 'false'}
          aria-hidden="true"
        />
      )}

      <div
        className={`process-step-card relative rounded-[28px] border border-white/70 bg-white/88 p-6 shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_28px_70px_rgba(15,23,42,0.14)] ${reached ? 'ring-1 ring-primary/12' : ''
          } ${isHorizontal ? 'flex h-full min-h-[260px] w-full' : ''}`}
      >
        <div
          className={`relative z-10 flex w-full ${isVertical ? 'items-start gap-4' : 'flex-col items-center text-center gap-4'}`}
        >
          <div
            className={`relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${reached
                ? 'border-primary/30 bg-primary text-white shadow-[0_18px_30px_rgba(11,31,59,0.22)]'
                : 'border-slate-200 bg-white text-secondary group-hover:border-primary/30 group-hover:bg-primary/5'
              }`}
          >
            <step.Icon className={`h-5 w-5 ${reached ? 'text-white' : 'text-primary'}`} aria-hidden="true" />
            <span className="absolute -right-1.5 -top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-bold text-secondary shadow-[0_6px_18px_rgba(15,23,42,0.14)]">
              {step.number}
            </span>
          </div>

          <div className={isVertical ? 'pt-1' : ''}>
            <h3 className={`font-display font-bold text-secondary ${isVertical ? 'text-lg mb-2' : 'text-lg mb-2.5'}`}>
              {step.title}
            </h3>
            <p className={`text-text-muted leading-relaxed ${isVertical ? 'text-sm text-left' : 'text-sm md:text-[15px]'}`}>
              {step.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Process() {
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const progressIndex = hoveredIndex ?? 0

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-0 text-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-secondary mb-4">How It Works</h2>
        <p className="max-w-2xl mx-auto text-text-muted text-base md:text-lg mb-16">
          A structured ownership journey designed to feel guided, transparent, and effortless from discovery to returns.
        </p>

        <div className="xl:hidden">
          <div className="hidden md:grid md:grid-cols-3 gap-6 text-left">
            {steps.map((step, index) => (
              <Step
                key={step.number}
                step={step}
                index={index}
                layout="grid"
                showConnector={index % 3 !== 2 && index !== steps.length - 1}
                reached={index <= progressIndex}
                connectorActive={index < progressIndex}
                onHoverStart={setHoveredIndex}
                onHoverEnd={() => setHoveredIndex(null)}
              />
            ))}
          </div>

          <div className="md:hidden relative space-y-5 text-left">
            {steps.map((step, index) => (
              <Step
                key={step.number}
                step={step}
                index={index}
                layout="vertical"
                showConnector={index !== steps.length - 1}
                reached={index <= progressIndex}
                connectorActive={index < progressIndex}
                onHoverStart={setHoveredIndex}
                onHoverEnd={() => setHoveredIndex(null)}
              />
            ))}
          </div>
        </div>

        <div className="hidden xl:block">
          <div className="relative">
            <div className="grid grid-cols-6 items-stretch gap-5">
              {steps.map((step, index) => (
                <Step
                  key={step.number}
                  step={step}
                  index={index}
                  layout="horizontal"
                  reached={index <= progressIndex}
                  showConnector={index !== steps.length - 1}
                  connectorActive={index < progressIndex}
                  onHoverStart={setHoveredIndex}
                  onHoverEnd={() => setHoveredIndex(null)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
