"use client";

import Image from "next/image";
import Link from "next/link";
import ScrollAnimation, { HoverCard } from "../ui/ScrollAnimation";
import { motion } from "framer-motion";

export default function EventsSection() {
  const events = [
    {
      id: "yoga-event",
      title: "STALLION CLASSIC YOGA EVENT",
      description: "",
      image: "/images/events/yogaevent.jpg",
      date: { month: "JUN", day: "21" },
      buttonText: "Resgister Now",
      buttonLink: "/events/yoga-event",
    },
  ];

  return (
    <section className="py-20 bg-white px-2 sm:px-6">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="text-4xl md:text-3xl font-bold uppercase tracking-wider text-center text-black mb-4 font-['AkiraExpanded']">
            UPCOMING EVENTS
          </h2>
          <p className="text-center text-gray-700 mb-16 max-w-3xl mx-auto font-['Degular'] tracking-wider">
            At Stallion Xtreme Fitness, we&apos;re not just building bodies —
            we&apos;re building lifestyles.
          </p>
        </ScrollAnimation>

        <div
          className={`grid ${
            events.length === 1
              ? "grid-cols-1 md:flex md:justify-center"
              : "grid-cols-1 md:grid-cols-3"
          } gap-6`}
        >
          {events.map((event, index) => (
            <ScrollAnimation key={event.id} delay={0.2 * index}>
              <Link href={event.buttonLink} className="block">
                <HoverCard
                  className={`relative overflow-hidden h-[430px] w-full cursor-pointer ${
                    events.length === 1 ? "md:w-[600px]" : ""
                  }`}
                >
                  <div className="relative h-full w-full">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      fill
                      className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>

                    {/* Date Badge */}
                    <motion.div
                      className="absolute top-4 left-4 bg-white rounded-lg text-black p-0.5 w-12 text-center"
                      whileHover={{ scale: 1.1, rotate: -2 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="text-[10px] font-bold bg-black text-white py-0.5 rounded-t-lg">
                        {event.date.month}
                      </div>
                      <div className="text-xl font-bold py-0.5">
                        {event.date.day}
                      </div>
                      <div className="text-[8px] uppercase">WED</div>
                    </motion.div>

                    {/* Event Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold uppercase tracking-wider text-white mb-2 font-['AkiraExpanded']">
                        {event.title}
                      </h3>
                      <p className="text-gray-200 mb-6 font-['Degular'] tracking-wider">
                        {event.description}
                      </p>
                      <motion.div
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="block font-['Degular'] tracking-wider w-full bg-[#e71b4b] text-white py-3 text-center font-medium hover:bg-opacity-90 transition">
                          {event.buttonText}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </HoverCard>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
