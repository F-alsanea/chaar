import { Eye, Target, Building2, Search, Paintbrush } from "lucide-react";

const goals = [
  {
    icon: Building2,
    title: "توفير خدمات متكاملة",
    description: "شراء العقار إلى ما بعد",
  },
  {
    icon: Search,
    title: "تسهيل عمليات البحث عن العقار",
    description: "واختياره وشراءه وتملكه",
  },
  {
    icon: Paintbrush,
    title: "تصميم المساحات والديكور",
    description: "للمنطقة السكنية",
  },
];

export default function Vision() {
  return (
    <section className="py-20 bg-[#f5f0e8]" id="about">
      <div className="container mx-auto px-4">
        {/* Vision */}
        <div className="text-center mb-16">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Eye className="w-12 h-12 text-[#2c5f71]" strokeWidth={1.5} />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#2c5f71] mb-6"
            style={{ fontFamily: "var(--font-serif-display)" }}
          >
            رؤيتنا
          </h2>
          <p className="text-lg text-[#666] max-w-3xl mx-auto leading-relaxed">
            توفير فرص استثمارية وسكنية استثنائية في قطاع العقارات، وتحقيق
            تجربة متفوقة لعملائنا.
          </p>
        </div>

        {/* Goals */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Target className="w-12 h-12 text-[#2c5f71]" strokeWidth={1.5} />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#2c5f71] mb-4"
            style={{ fontFamily: "var(--font-serif-display)" }}
          >
            الأهداف
          </h2>
          <p className="text-lg text-[#666] mb-12">
            لنجعل حياتك أجمل ، أسهل ، وأسعد ... نهدف دوماً إلى
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {goals.map((goal, index) => (
            <div
              key={index}
              className="text-center p-6 hover-lift"
            >
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <goal.icon className="w-10 h-10 text-[#2c5f71]" strokeWidth={1.5} />
              </div>
              <h3 className="text-lg font-bold text-[#2c5f71] mb-2">
                {goal.title}
              </h3>
              <p className="text-[#666]">{goal.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
