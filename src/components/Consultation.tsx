import Link from "next/link";
import { siteSettings } from "@/data/properties";

export default function Consultation() {
  return (
    <section className="py-16 bg-[#f5f0e8]" id="consultation">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#2c5f71] mb-8"
            style={{ fontFamily: "var(--font-serif-display)" }}
          >
            الاستفسارات والاستشارات
          </h2>

          <p className="text-lg text-[#666] mb-8">
            نحن هنا لمساعدتك في جميع استفساراتك العقارية
          </p>

          <a
            href={siteSettings.socialMedia.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#2c5f71] text-white px-12 py-4 rounded hover:bg-[#1e4a5a] transition-colors font-medium text-lg"
          >
            طلب إستشارة
          </a>
        </div>
      </div>
    </section>
  );
}
