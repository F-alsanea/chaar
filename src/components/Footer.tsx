import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteSettings } from "@/data/properties";

const quickLinks = [
  { label: "الرئيسية", href: "/" },
  { label: "المشاريع", href: "#projects" },
  { label: "تملك عقارك", href: "#properties" },
  { label: "من نحن", href: "#about" },
  { label: "تواصل معي", href: "#consultation" },
  { label: "سياسة الخصوصية", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="bg-[#f5f0e8] border-t border-[#e8e1d5]" id="location">
      {/* Google Reviews Widget Placeholder */}
      <div className="py-8 border-b border-[#e8e1d5]">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg viewBox="0 0 24 24" className="w-6 h-6">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span className="text-2xl font-bold text-[#333]">4.8</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" className="w-5 h-5 text-yellow-400 fill-current">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
          </div>
          <p className="text-sm text-[#666]">25 مراجعة</p>
          <p className="text-xs text-[#999] mt-1">Free Google Reviews Widget by Elfsight</p>

          <a
            href="https://search.google.com/local/writereview?placeid=ChIJ1SETYbRjwRUR5kwgDm12DeA"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-4 bg-[#2c5f71] text-white px-6 py-2 rounded hover:bg-[#1e4a5a] transition-colors text-sm"
          >
            ضع تعليقك
          </a>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Logo & Description */}
            <div>
              <Image
                src={siteSettings.logo}
                alt={siteSettings.siteName}
                width={100}
                height={80}
                className="h-20 w-auto mb-4"
              />
              <div className="flex gap-4 mt-4">
                {/* License badges */}
                <Image
                  src="https://ext.same-assets.com/63246421/2811491311.png"
                  alt="FAL License"
                  width={50}
                  height={50}
                  className="h-12 w-auto"
                />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-bold text-[#2c5f71] mb-4">روابط مهمة</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#666] hover:text-[#2c5f71] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-bold text-[#2c5f71] mb-4">البريد الالكتروني / الاتصال</h4>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-[#666]">
                  <Phone size={16} className="text-[#2c5f71]" />
                  <span>جوال</span>
                  <a href={`tel:${siteSettings.phone}`} className="hover:text-[#2c5f71]">
                    {siteSettings.phone}
                  </a>
                </li>
                <li className="flex items-center gap-2 text-[#666]">
                  <Mail size={16} className="text-[#2c5f71]" />
                  <span>البريد الالكتروني</span>
                  <a href={`mailto:${siteSettings.email}`} className="hover:text-[#2c5f71]">
                    {siteSettings.email}
                  </a>
                </li>
                <li className="text-[#666]">
                  رخصة رقم : {siteSettings.licenseNumber}
                </li>
                <li className="flex items-center gap-2 text-[#666]">
                  <MapPin size={16} className="text-[#2c5f71]" />
                  <span>الموقع : {siteSettings.address}</span>
                </li>
              </ul>
            </div>

            {/* Map */}
            <div>
              <h4 className="text-lg font-bold text-[#2c5f71] mb-4">موقعنا</h4>
              <div className="w-full h-40 bg-[#ddd] rounded overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3710.123456789!2d39.1184982!3d21.7836818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c163b4611321d5%3A0xe00d766d0e204ce6!2z2LTYudin2LEg2KfZhNi52YLYp9ix2YrYqQ!5e0!3m2!1sar!2ssa!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="موقعنا"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media & Copyright */}
      <div className="py-6 border-t border-[#e8e1d5]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href={siteSettings.socialMedia.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2c5f71] rounded-full flex items-center justify-center text-white hover:bg-[#1e4a5a] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href={siteSettings.socialMedia.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2c5f71] rounded-full flex items-center justify-center text-white hover:bg-[#1e4a5a] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>
              <a
                href={siteSettings.socialMedia.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#2c5f71] rounded-full flex items-center justify-center text-white hover:bg-[#1e4a5a] transition-colors"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <p className="text-[#666] text-sm">
              © {new Date().getFullYear()} by Chaar
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
