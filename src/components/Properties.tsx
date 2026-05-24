"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, Layers, Bath, BedDouble, Maximize } from "lucide-react";
import { properties } from "@/data/properties";
import type { Property } from "@/types/property";

function PropertyCard({ property }: { property: Property }) {
  return (
    <div className="property-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.featuredImage}
          alt={property.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 right-3 flex gap-2">
          {property.isNew && (
            <span className="bg-[#2c5f71] text-white text-xs px-3 py-1 rounded">
              جديد
            </span>
          )}
          {property.isExclusive && (
            <span className="bg-[#c9a55c] text-white text-xs px-3 py-1 rounded">
              حصري
            </span>
          )}
        </div>
        {/* Click to view */}
        <div className="absolute bottom-3 left-0 right-0 text-center">
          <span className="bg-white/90 text-[#2c5f71] text-xs px-4 py-1 rounded">
            اضغط على الصورة لمشاهدة العقار
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-[#2c5f71] mb-2 line-clamp-1">
          {property.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 text-[#666] text-sm mb-4">
          <MapPin size={16} />
          <span>الموقع</span>
          <span className="text-[#2c5f71] font-medium">{property.neighborhood}</span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-2 text-center border-t border-[#eee] pt-4">
          <div>
            <span className="text-xs text-[#999] block">مساحة</span>
            <span className="font-bold text-[#333] flex items-center justify-center gap-1">
              <Maximize size={14} />
              {property.area}م
            </span>
          </div>
          <div>
            <span className="text-xs text-[#999] block">طوابق</span>
            <span className="font-bold text-[#333] flex items-center justify-center gap-1">
              <Layers size={14} />
              {property.floors}
            </span>
          </div>
          <div>
            <span className="text-xs text-[#999] block">حمام</span>
            <span className="font-bold text-[#333] flex items-center justify-center gap-1">
              <Bath size={14} />
              {property.bathrooms}
            </span>
          </div>
          <div>
            <span className="text-xs text-[#999] block">غرف</span>
            <span className="font-bold text-[#333] flex items-center justify-center gap-1">
              <BedDouble size={14} />
              {property.rooms}
            </span>
          </div>
        </div>

        {/* License Number */}
        <div className="mt-4 text-xs text-[#999] text-center">
          رقم ترخيص الإعلان : {property.licenseNumber}
        </div>
      </div>
    </div>
  );
}

export default function Properties() {
  return (
    <section className="py-20 bg-[#f5f0e8]" id="properties">
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-[#2c5f71] text-center mb-4"
          style={{ fontFamily: "var(--font-serif-display)" }}
        >
          آخر العروض
        </h2>
        <p className="text-center text-[#666] mb-12">
          اكتشف أحدث العقارات المتوفرة لدينا
        </p>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {properties.slice(0, 9).map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            href="/properties"
            className="inline-block bg-[#2c5f71] text-white px-10 py-4 rounded hover:bg-[#1e4a5a] transition-colors font-medium"
          >
            مشاهدة جميع العقارات
          </Link>
        </div>
      </div>
    </section>
  );
}
