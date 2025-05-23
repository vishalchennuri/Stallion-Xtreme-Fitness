"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import ScrollAnimation from "../ui/ScrollAnimation";
import { motion } from "framer-motion";

export default function PartnersSection() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marqueeElement = marqueeRef.current;
    if (!marqueeElement) return;

    // Need to wait until images are loaded for accurate measurements
    const handleLoad = () => {
      // const firstItemWidth = marqueeElement.querySelector('div')?.offsetWidth || 0
      const scrollWidth = marqueeElement.scrollWidth / 2; // Half because we duplicate the items

      // Much slower speed for a very gentle continuous scroll
      const baseSpeed = 1; // Reduced from 0.15 to make it much slower
      const speed = baseSpeed;

      let position = 0;
      let animationId: number;

      const scroll = () => {
        position += speed;

        // Reset position in a way that creates a seamless loop
        // This prevents the visual gap at the end
        if (position >= scrollWidth) {
          position -= scrollWidth;
        }

        marqueeElement.style.transform = `translateX(${-position}px)`;
        animationId = requestAnimationFrame(scroll);
      };

      // Start animation
      scroll();

      return () => {
        cancelAnimationFrame(animationId);
      };
    };

    // Start after a short delay to ensure all images are loaded and measured
    const timer = setTimeout(handleLoad, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const partners = [
    { name: "Navayug", logo: "/svg/navayug.PNG" },
    { name: "LifeSpan", logo: "/svg/lifespan.PNG" },
    { name: "TechMocha", logo: "/svg/techmocha.png" },
    { name: "cnes", logo: "/svg/cnes.jpg" },
  ];

  // Create multiple duplications for truly seamless infinite scrolling
  // Triple the items to ensure we always have enough content on screen
  const displayPartners = [...partners, ...partners, ...partners];

  return (
    <section className="py-10 md:py-16 bg-[#f4f4f4]">
      <div className="container mx-auto px-4">
        <ScrollAnimation>
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wider text-center text-black mb-2 font-['AkiraExpanded'] ">
            Powered by the best
          </h2>
          <p className="text-center text-gray-600 mb-8 md:mb-12 text-lg md:text-2xl tracking-wider font-[Degular]">
            We only work with brands that match our extreme standards.
          </p>
        </ScrollAnimation>

        <div className="relative overflow-hidden">
          <div
            ref={marqueeRef}
            className="flex items-center whitespace-nowrap"
            style={{ willChange: "transform" }}
          >
            {displayPartners.map((partner, i) => (
              <motion.div
                key={i}
                className="py-6 md:py-8 flex items-center justify-center min-w-[160px] md:min-w-[200px] w-[240px] md:w-[300px] px-6 md:px-8"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 15px rgba(0,0,0,0.1)",
                  transition: { duration: 0.2 },
                }}
              >
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={240}
                  height={120}
                  className="h-20 md:h-28 w-auto"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
