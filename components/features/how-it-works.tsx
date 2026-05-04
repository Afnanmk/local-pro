// How It Works section with 3-step process
import { FiSearch, FiSliders, FiCheckCircle } from 'react-icons/fi'

const steps = [
  {
    icon: FiSearch,
    title: 'Search',
    description:
      'Enter your location and choose the service you need. Browse local professionals in your area.',
  },
  {
    icon: FiSliders,
    title: 'Compare',
    description:
      'Compare ratings, reviews, and pricing. Find the best match for your budget and requirements.',
  },
  {
    icon: FiCheckCircle,
    title: 'Book',
    description:
      'Book your chosen provider directly through the platform. Fast, secure, and hassle-free.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-muted px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Getting the help you need is simple — just three easy steps
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-white">
                <step.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
