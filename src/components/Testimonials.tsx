"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { testimonials } from "@/data/properties";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 bg-[#2c5f71]">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-white/80 text-lg mb-12">آراء العملاء</h3>

        <div className="max-w-3xl mx-auto relative">
          {/* Navigation Arrows */}
          <button
            type="button"
            onClick={prevTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight size={20} />
          </button>
          <button
            type="button"
            onClick={nextTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Testimonial Content */}
          <div className="text-center px-8 md:px-16">
            <p className="text-sm text-white/60 tracking-widest mb-6 uppercase">
              {currentTestimonial.name}
            </p>

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < currentTestimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-white/30"}
                />
              ))}
            </div>

            <p className="text-white text-lg md:text-xl leading-relaxed">
              {currentTestimonial.content}
            </p>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, index) => (
              <button
                type="button"
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-6"
                    : "bg-white/40 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
