'use client'

import Image from 'next/image'
import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

// All images in the gallery
const allImages = [
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.14.jpeg",
    alt: "Gastro Conference Training Session"
  },
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.15.jpeg",
    alt: "Gastro Conference Participants"
  },
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.14 (1).jpeg",
    alt: "Training Session 1"
  },
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.14 (2).jpeg",
    alt: "Training Session 2"
  },
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.14 (3).jpeg",
    alt: "Training Session 3"
  },
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.15 (1).jpeg",
    alt: "Conference Participants 1"
  },
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.15 (2).jpeg",
    alt: "Conference Participants 2"
  },
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.16.jpeg",
    alt: "Training Workshop"
  },
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.18.jpeg",
    alt: "Medical Training Session"
  },
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.18 (1).jpeg",
    alt: "Hands-on Training 1"
  },
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.18 (2).jpeg",
    alt: "Hands-on Training 2"
  },
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.39.jpeg",
    alt: "Conference Presentation"
  },
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.39 (1).jpeg",
    alt: "Medical Equipment Training"
  },
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.39 (2).jpeg",
    alt: "Group Training Session"
  },
  {
    src: "/gastro-training/WhatsApp Image 2025-09-01 at 10.37.39 (3).jpeg",
    alt: "Professional Development"
  }
]

export default function JulyGastroTraining() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeModal = () => {
    setSelectedImageIndex(null)
  }

  const goToPrevious = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + allImages.length) % allImages.length)
    }
  }

  const goToNext = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % allImages.length)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeModal()
    if (e.key === 'ArrowLeft') goToPrevious()
    if (e.key === 'ArrowRight') goToNext()
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-24">
      <div className="relative w-full max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-8">
          NAIROBI GASTRO FOURTH INTERNATIONAL CONFERENCE 2025
        </h1>
        <div className="text-center mb-6">
          <span className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium">
            Past Event - July 2025
          </span>
        </div>

        {/* Hero Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Image
            src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.14.jpeg"
            alt="Gastro Conference Training Session"
            width={600}
            height={400}
            className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openModal(0)}
          />
          <Image
            src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.15.jpeg"
            alt="Gastro Conference Participants"
            width={600}
            height={400}
            className="rounded-lg object-cover cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => openModal(1)}
          />
        </div>

        {/* Training Gallery */}
        <section className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Conference Highlights</h2>
          <p className="text-gray-600 mb-6">
            A look back at the successful Fourth International Gastroenterology Conference held in July 2025.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.14 (1).jpeg"
              alt="Training Session 1"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(2)}
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.14 (2).jpeg"
              alt="Training Session 2"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(3)}
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.14 (3).jpeg"
              alt="Training Session 3"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(4)}
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.15 (1).jpeg"
              alt="Conference Participants 1"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(5)}
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.15 (2).jpeg"
              alt="Conference Participants 2"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(6)}
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.16.jpeg"
              alt="Training Workshop"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(7)}
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.18.jpeg"
              alt="Medical Training Session"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(8)}
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.18 (1).jpeg"
              alt="Hands-on Training 1"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(9)}
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.18 (2).jpeg"
              alt="Hands-on Training 2"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(10)}
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.39.jpeg"
              alt="Conference Presentation"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(11)}
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.39 (1).jpeg"
              alt="Medical Equipment Training"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(12)}
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.39 (2).jpeg"
              alt="Group Training Session"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(13)}
            />
            <Image
              src="/gastro-training/WhatsApp Image 2025-09-01 at 10.37.39 (3).jpeg"
              alt="Professional Development"
              width={400}
              height={300}
              className="rounded-lg object-cover w-full h-48 cursor-pointer hover:opacity-90 transition-opacity"
              onClick={() => openModal(14)}
            />
          </div>
        </section>

        <div className="space-y-6">
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Conference Schedule</h2>
            <p className="text-gray-600 mb-4">The conference was successfully held with the following schedule:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Pre-congress Hands-on Training: July 30th, 2025</li>
              <li>Live cases and didactic lectures: July 31st - August 2nd, 2025</li>
            </ul>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Event Details</h2>
            <p className="text-gray-600 mb-4">The conference took place at:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold">Dates</h3>
                <p>July 31st - August 2nd, 2025</p>
                <p>Daily: 11:00 AM - 5:17 PM</p>
              </div>
              <div>
                <h3 className="font-semibold">Venues</h3>
                <p>Radisson Blu Hotel, Upperhill</p>
                <p>& Endoscopy Unit, KNH</p>
              </div>
            </div>
          </section>

          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Registration Information</h2>
            <p className="text-gray-600 mb-4">The conference registration fees were:</p>
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
            <h2 className="text-xl font-semibold mb-4">Featured Speakers</h2>
            <p className="text-gray-600 mb-4">The conference featured renowned international speakers:</p>
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
            <h2 className="text-xl font-semibold mb-4">Conference Outcomes</h2>
            <p className="text-gray-600 mb-4">The conference was a great success with:</p>
            <ul className="list-disc pl-6">
              <li>Over 500 healthcare professionals in attendance</li>
              <li>Multiple international and local speakers</li>
              <li>Hands-on training sessions and live case demonstrations</li>
            </ul>
          </section>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-60 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-colors"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

            {/* Previous Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToPrevious()
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-60 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                goToNext()
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-60 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>

            {/* Image */}
            <div
              className="relative max-w-full max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={allImages[selectedImageIndex].src}
                alt={allImages[selectedImageIndex].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain"
                priority
              />
              
              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                {selectedImageIndex + 1} / {allImages.length}
              </div>
              
              {/* Image Title */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg text-center max-w-md">
                {allImages[selectedImageIndex].alt}
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}