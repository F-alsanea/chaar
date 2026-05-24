import { TrendingUp, Home, Wallet } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "مرونة و تجاوب",
    description: "توفير الطلب بأسرع وقت\nمتابعة الطلب من الخبز إلى استلام العقار",
  },
  {
    icon: Home,
    title: "عروض مباشرة",
    description: "عروض مباشرة من المالك\nعروض مباشرة من شركات عقارية",
  },
  {
    icon: Wallet,
    title: "حلول تمويليه",
    description: "توفير برامج تمويل متعددة",
  },
];

export default function WhyUs() {
  return (
    <section className="py-20 bg-[#eee8dc]">
      <div className="container mx-auto px-4">
        <h2
          className="text-3xl md:text-4xl font-bold text-[#2c5f71] text-center mb-16"
          style={{ fontFamily: "var(--font-serif-display)" }}
        >
          لماذا نحن؟
        </h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              {/* Custom illustrated icon */}
              <div className="relative w-24 h-24 mx-auto mb-6">
                <div className="absolute inset-0 flex items-end justify-center">
                  {index === 0 && (
                    <svg viewBox="0 0 80 80" className="w-20 h-20">
                      {/* Stairs icon */}
                      <path
                        d="M10 70 L10 50 L30 50 L30 35 L50 35 L50 20 L70 20"
                        fill="none"
                        stroke="#1a1a1a"
                        strokeWidth="2"
                      />
                      <circle cx="70" cy="15" r="4" fill="#2c5f71" />
                    </svg>
                  )}
                  {index === 1 && (
                    <svg viewBox="0 0 80 80" className="w-20 h-20">
                      {/* House icon */}
                      <path
                        d="M15 45 L40 25 L65 45 L65 70 L15 70 Z"
                        fill="none"
                        stroke="#1a1a1a"
                        strokeWidth="2"
                      />
                      <path
                        d="M40 25 L40 10"
                        stroke="#1a1a1a"
                        strokeWidth="2"
                      />
                      <circle cx="40" cy="8" r="4" fill="#2c5f71" />
                    </svg>
                  )}
                  {index === 2 && (
                    <svg viewBox="0 0 80 80" className="w-20 h-20">
                      {/* Lines icon */}
                      <circle cx="25" cy="45" r="4" fill="#2c5f71" />
                      <circle cx="55" cy="25" r="4" fill="#2c5f71" />
                      <path
                        d="M25 45 L40 35 L55 45"
                        fill="none"
                        stroke="#1a1a1a"
                        strokeWidth="2"
                      />
                    </svg>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-[#2c5f71] mb-4">
                {feature.title}
              </h3>
              <p className="text-[#666] whitespace-pre-line leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
