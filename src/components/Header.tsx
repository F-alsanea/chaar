"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { siteSettings } from "@/data/properties";

const navItems = [
  { label: "الصفحة الرئيسية", href: "/" },
  { label: "من نحن", href: "#about" },
  { label: "موقعنا", href: "#location" },
  { label: "تملك عقارك", href: "#properties" },
  { label: "الاستشارات", href: "#consultation" },
  { label: "المشاريع", href: "#projects" },
  { label: "شركائنا", href: "#partners" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 right-0 left-0 z-50 bg-[#f5f0e8]/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={siteSettings.logo}
              alt={siteSettings.siteName}
              width={80}
              height={60}
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#333] hover:text-[#2c5f71] transition-colors font-medium text-sm"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={siteSettings.socialMedia.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#2c5f71] text-white px-5 py-2.5 rounded-sm hover:bg-[#1e4a5a] transition-colors"
            >
              <Phone size={18} />
              <span>تواصل معنا</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="lg:hidden p-2 text-[#2c5f71]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-[#e8e1d5]">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[#333] hover:text-[#2c5f71] transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <a
                href={siteSettings.socialMedia.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#2c5f71] text-white px-5 py-3 rounded-sm hover:bg-[#1e4a5a] transition-colors mt-2"
              >
                <Phone size={18} />
                <span>تواصل معنا</span>
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
