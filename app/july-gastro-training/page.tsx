import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NAIROBI GASTRO FOURTH INTERNATIONAL CONFERENCE 2025',
  description: 'Join us for the Fourth International Gastroenterology Conference in Nairobi',
}

export default function JulyGastroTraining() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="relative w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          NAIROBI GASTRO FOURTH INTERNATIONAL CONFERENCE 2025
        </h1>

        {/* Hero Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Image
            src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.14.jpeg"
            alt="Gastro Conference Training Session"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
          <Image
            src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.15.jpeg"
            alt="Gastro Conference Participants"
            width={600}
            height={400}
            className="rounded-lg object-cover"
          />
        </div>

        {/* Training Gallery */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-6">Training Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.14 (1).jpeg"
              alt="Training Session 1"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.14 (2).jpeg"
              alt="Training Session 2"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.14 (3).jpeg"
              alt="Training Session 3"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.15 (1).jpeg"
              alt="Conference Participants 1"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.15 (2).jpeg"
              alt="Conference Participants 2"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.16.jpeg"
              alt="Training Workshop"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.18.jpeg"
              alt="Medical Training Session"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.18 (1).jpeg"
              alt="Hands-on Training 1"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.18 (2).jpeg"
              alt="Hands-on Training 2"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.39.jpeg"
              alt="Conference Presentation"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.39 (1).jpeg"
              alt="Medical Equipment Training"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.39 (2).jpeg"
              alt="Group Training Session"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.39 (3).jpeg"
              alt="Professional Development"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48"
            />
          </div>
        </section>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Conference Schedule</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pre-congress Hands-on Training: 30th July 2025</li>
              <li>Live cases and didactic lectures: 31st July to 2nd August 2025</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Date & Time</h3>
                <p>July 31st, 2025 - August 2nd, 2025</p>
                <p>11:00 AM - 5:17 PM</p>
              </div>
              <div>
                <h3 className="font-semibold">Venue</h3>
                <p>Radisson Blu Hotel, Upperhill</p>
                <p>& Endoscopy Unit, KNH</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Registration Fees</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Members</h3>
                <p>KES 26,000</p>
              </div>
              <div>
                <h3 className="font-semibold">Non-Members</h3>
                <p>KES 26,000</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Speakers</h2>
            <ul className="list-disc pl-6">
              <li>Dr. Imran Aziz</li>
              <li>Dr. Rafael Esteban</li>
              <li>Dr. Rajesh Puri</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Moderators</h2>
            <ul className="list-disc pl-6">
              <li>Onyango S.</li>
              <li>Ajua N.</li>
              <li>Gathara L.</li>
              <li>Devani S.</li>
              <li>Elly O. Ogutu</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
            <ul className="list-disc pl-6">
              <li>Attendees Capacity: 5000</li>
              <li>Event Staff: 1 speaker, 1 moderator</li>
              <li>CPD Points: TBD</li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  )
}