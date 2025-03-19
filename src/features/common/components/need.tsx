import { Button } from "@/components/ui/button"

export default function HowItWorks() {
  return (
    <div className="min-h-screen bg-[url('/vegetable1.jpg')] bg-cover bg-center relative">
      <div className="absolute inset-0 bg-yellow-50/50"></div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="bg-yellow-100 p-6 rounded-3xl shadow-lg mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-sm font-medium text-emerald-700">HOW IT WORKS</span>
            <h1 className="text-4xl font-bold text-neutral-900 mt-2">What You Need to Do</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <StepCard key={index} {...step} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="default"
              className="bg-teal-700 hover:bg-teal-800 text-white font-medium px-8 py-3 rounded-md transition-colors"
            >
              Join Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StepProps {
  number: number
  title: string
  description: string
  bgColor: string
  textColor: string
  rotate?: string
}

function StepCard({ number, title, description, bgColor, textColor, rotate }: StepProps) {
  return (
    <div className={`${bgColor} p-6 rounded-lg shadow-lg ${rotate || ""}`}>
      <div className={`text-2xl font-bold ${textColor} mb-3`}>{number}</div>
      <h3 className="font-medium mb-2">{title}</h3>
      <p className="text-sm text-neutral-600">{description}</p>
    </div>
  )
}

const steps: StepProps[] = [
  {
    number: 1,
    title: "You will Need to Join the Club",
    description:
      "We are a private club... something like it. It is based on a Golf and Country Club. It is free to join. Our members help with the ethics of our community.",
    bgColor: "bg-brand-50/90",
    textColor: "text-brand-600",
    rotate: "transform rotate-[-2deg]",
  },
  {
    number: 2,
    title: "You can then open the shopping page.",
    description:
      "We are a private club... something like it. It is based on a Golf and Country Club. It is free to join. Our members help with the ethics of our community.",
    bgColor: "bg-blue-50/90",
    textColor: "text-blue-600",
  },
  {
    number: 3,
    title: "You will Need to Join the Club",
    description:
      "We are a private club... something like it. It is based on a Golf and Country Club. It is free to join. Our members help with the ethics of our community.",
    bgColor: "bg-brand-50/90",
    textColor: "text-brand-600",
    rotate: "transform rotate-[2deg]",
  },
]

