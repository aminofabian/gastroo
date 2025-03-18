import { Metadata } from 'next'
import { Card } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'GSK Membership Benefits',
  description: 'Become a member of the Gastroenterology Society of Kenya and help advance digestive healthcare.',
}

const benefits = [
  {
    title: 'Access to Exclusive Resources',
    description: 'Get access to our comprehensive library of research papers, clinical guidelines, and educational materials.',
    icon: '📚',
  },
  {
    title: 'Professional Networking',
    description: 'Connect and collaborate with fellow gastroenterology professionals across Kenya and beyond.',
    icon: '🤝',
  },
  {
    title: 'Events & Workshops',
    description: 'Participate in conferences, workshops, and continuing medical education programs.',
    icon: '🎯',
  },
  {
    title: 'Medical Guidelines',
    description: 'Contribute to and stay updated with the latest medical guidelines and best practices.',
    icon: '📋',
  },
  {
    title: 'Professional Development',
    description: 'Access career advancement opportunities, mentorship programs, and specialized training.',
    icon: '📈',
  },
  {
    title: 'Latest Updates',
    description: 'Stay informed with regular updates on the latest developments in gastroenterology.',
    icon: '🔔',
  },
]

export default function MembershipBenefits() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">Membership Benefits</h1>
        <p className="text-xl text-muted-foreground">
          Become a member of the Gastroenterology Society of Kenya and help advance digestive healthcare.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits.map((benefit, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="text-4xl mb-4">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
            <p className="text-muted-foreground">{benefit.description}</p>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-full font-semibold text-lg">
          Join GSK Today
        </button>
      </div>
    </div>
  )
}
