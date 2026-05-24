"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { siteSettings, partners } from "@/data/properties";

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 2000;
          const increment = end / (duration / 16);

          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, hasAnimated]);

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-bold text-[#2c5f71]">
      {count}+{suffix}
    </div>
  );
}

export default function Partners() {
  const stats = [
    { value: siteSettings.stats.developers, label: "ملاك ومطورون" },
    { value: siteSettings.stats.companies, label: "شركة عقارية" },
    { value: siteSettings.stats.clients, label: "عميل" },
  ];

  return (
    <section className="py-20 bg-[#f5f0e8]" id="partners">
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-[#2c5f71] text-center mb-16"
          style={{ fontFamily: "var(--font-serif-display)" }}
        >
          الشركاء
        </h2>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-3xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <AnimatedCounter end={stat.value} />
              <p className="text-[#666] mt-2">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Partner Logos */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className="h-12 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
