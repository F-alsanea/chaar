import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, animate, useInView } from 'motion/react';
import { BrowserRouter, Routes, Route, Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  Search,
  Home,
  Building2,
  Key,
  Filter,
  MapPin,
  Menu,
  X,
  ArrowRight,
  Twitter,
  Instagram,
  Target,
  Zap,
  ShieldCheck,
  Wallet,
  Users,
  CheckCircle2,
  Quote,
  Star,
  Phone,
  Mail,
  MessageCircle,
  Sun,
  Moon
} from 'lucide-react';
import { MOCK_PROPERTIES, Property } from './types';
import { PropertyCard } from './components/PropertyCard';
import { PropertyDetail } from './components/PropertyDetail';
import { InterestForm } from './components/InterestForm';
import { cn } from './lib/utils';
import OwnYourProperty from './pages/OwnYourProperty';
import Dashboard from './pages/Dashboard';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';

const LUXURY_SLIDES = [
  {
    image: "https://i.ibb.co/cXVWB5Bn/pexels-expect-best-79873-323780.jpg",
    title: "منزل العمر",
    subtitle: "يبدأ هنا"
  },
  {
    image: "https://i.ibb.co/1fphYkmN/pexels-artbovich-6587904.jpg",
    title: "مساحة سعيدة",
    subtitle: "تنتظرك"
  },
  {
    image: "https://i.ibb.co/YFkKXch8/pexels-artbovich-8134816.jpg",
    title: "شراء منزل",
    subtitle: "بناء مستقبل"
  },
  {
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1920",
    title: "أحدث العروض",
    subtitle: "والإعلانات الحصرية"
  }
];

function LuxuryBanner() {
  const [current, setCurrent] = useState(0);
  const [slides, setSlides] = useState(LUXURY_SLIDES);

  useEffect(() => {
    // Fetch Banner 5 settings
    fetch('/api/settings')
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.banner5_visible && data?.banner5_image) {
          setSlides([
            ...LUXURY_SLIDES,
            { image: data.banner5_image, title: '', subtitle: '' }
          ]);
        }
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-[400px] lg:h-[600px] rounded-[40px] overflow-hidden group">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {(slides[current].title || slides[current].subtitle) && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white p-6">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl lg:text-7xl font-black mb-4 drop-shadow-2xl"
              >
                {slides[current].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xl lg:text-3xl font-bold opacity-90 tracking-widest"
              >
                {slides[current].subtitle}
              </motion.p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={cn(
              "w-3 h-3 rounded-full transition-all duration-500",
              current === idx ? "bg-white w-12" : "bg-white/40 hover:bg-white/60"
            )}
          />
        ))}
      </div>
    </div>
  );
}

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayValue(Math.round(latest))
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

function HomePage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'sale' | 'rent'>('all');
  const [category, setCategory] = useState<'all' | 'apartment' | 'villa' | 'office' | 'land'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [allProperties, setAllProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [searchParams] = useSearchParams();
  const propertiesRef = React.useRef<HTMLDivElement>(null);

  // Scroll to properties if filter is applied via URL
  useEffect(() => {
    const type = searchParams.get('type');
    const category = searchParams.get('category');
    if (type || category) {
      // Add a small delay to allow the grid to filter and layout to stabilize
      const timer = setTimeout(() => {
        const element = document.getElementById('properties-grid');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300); // Slightly longer delay for stability
      return () => clearTimeout(timer);
    }
  }, [searchParams.get('type'), searchParams.get('category')]); // Listen specifically to these params

  // Read category from URL (e.g. /?category=apartment)
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory && ['apartment', 'villa', 'office', 'land'].includes(urlCategory)) {
      setCategory(urlCategory as any);
    }
  }, [searchParams]);

  useEffect(() => {
    fetch('/api/properties')
      .then(r => r.ok ? r.json() : [])
      .then(data => { if (data.length > 0) setAllProperties(data); })
      .catch(() => { });
  }, []);

  const filteredProperties = useMemo(() => {
    return allProperties.filter(p => {
      const matchesType = filter === 'all' || p.type === filter;
      const matchesCategory = category === 'all' || p.category === category;
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesType && matchesCategory && matchesSearch;
    });
  }, [filter, category, searchQuery, allProperties]);

  return (
    <main className="flex-grow">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-white dark:bg-slate-950 transition-colors">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-50/50 dark:bg-indigo-900/10 rounded-bl-[100px]" />
          <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-emerald-50/30 dark:bg-emerald-900/10 blur-3xl rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-1.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-bold mb-6"
            >
              مرحباً بك في شعار العقارية
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8"
            >
              ابحث عن منزل <span className="text-indigo-600 dark:text-indigo-400">أحلامك</span> بكل سهولة وذكاء
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-slate-500 dark:text-slate-400 mb-12 leading-relaxed"
            >
              نقدم لك مجموعة مختارة من أرقى العقارات ، سواء كنت تبحث عن شراء أو استئجار، نحن هنا لخدمتك.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-2 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl shadow-slate-200/50 dark:shadow-slate-950/50 flex flex-col md:flex-row gap-2 border dark:border-slate-800"
            >
              <div className="flex-grow flex items-center px-4 gap-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <Search className="text-slate-400 dark:text-slate-500" size={20} />
                <input
                  type="text"
                  placeholder="ابحث بالحي، المدينة، أو نوع العقار..."
                  className="w-full py-4 bg-transparent outline-none text-slate-900 dark:text-white font-medium placeholder:text-slate-400 dark:placeholder:text-slate-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <div className="hidden md:flex items-center px-4 gap-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700">
                  <MapPin className="text-slate-400 dark:text-slate-500" size={18} />
                  <select className="bg-transparent outline-none text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
                    <option className="dark:bg-slate-800">كل المدن</option>
                    <option className="dark:bg-slate-800">الرياض</option>
                    <option className="dark:bg-slate-800">جدة</option>
                    <option className="dark:bg-slate-800">الدمام</option>
                  </select>
                </div>
                <button className="px-8 py-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center gap-2">
                  <span>ابحث الآن</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Luxury Banner Section */}
      <section className="py-12 bg-white dark:bg-slate-950 transition-colors overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LuxuryBanner />
        </div>
      </section>

      {/* Vision & Goals Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded-xl font-bold mb-6">
                <Target size={20} />
                <span>رؤيتنا</span>
              </div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                توفير فرص استثمارية وسكنية استثنائية في قطاع العقارات
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                نسعى لتحقيق تجربة متفوقة لعملائنا من خلال الابتكار والشفافية، لنكون الخيار الأول في عالم العقارات بالمملكة.
              </p>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-600 dark:bg-indigo-500 rounded-lg flex items-center justify-center text-white">
                    <Zap size={20} />
                  </div>
                  الأهداف
                </h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">لنجعل حياتك أجمل ، أسهل ، وأسعد ... نهدف دوماً إلى:</p>

                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "تنويع خيارات المساحات والديكور وكذلك المنطقة السكنية",
                    "تسهيل عمليات البحث عن العقار واختياره وشراءه وتملكه",
                    "توفير خدمات متكاملة تمتد من فكرة شراء العقار إلى ما بعد البيع"
                  ].map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm transition-colors">
                      <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={20} />
                      <span className="text-slate-700 dark:text-slate-300 font-medium uppercase">{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl dark:shadow-slate-950/50">
                <img
                  src="https://picsum.photos/seed/vision/800/800"
                  alt="Vision"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-700 hidden md:block">
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900 dark:text-white">100%</div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 font-bold">عقارات موثوقة</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">لماذا نحن؟</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">نحن نتميز بتقديم حلول متكاملة تجعل من رحلة البحث عن عقار تجربة ممتعة ومضمونة.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "حلول تمويليه",
                desc: "توفير برامج تمويل متعددة تناسب احتياجاتك وقدراتك المالية بالتعاون مع كبرى البنوك.",
                icon: Wallet,
                color: "bg-blue-50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400"
              },
              {
                title: "عروض مباشرة",
                desc: "عروض مباشرة من المالك أو من شركات عقارية كبرى لضمان أفضل الأسعار والشفافية التامة.",
                icon: Building2,
                color: "bg-indigo-50 dark:bg-indigo-900/10 text-indigo-600 dark:text-indigo-400"
              },
              {
                title: "مرونة و تجاوب",
                desc: "توفير الطلب بأسرع وقت ومتابعة دقيقة من الحجز إلى استلام العقار لضمان رضاكم.",
                icon: Users,
                color: "bg-emerald-50 dark:bg-emerald-900/10 text-emerald-600 dark:text-emerald-400"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 rounded-[32px] border border-slate-100 dark:border-slate-800 hover:border-indigo-100 dark:hover:border-indigo-900/50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group bg-white dark:bg-slate-900/50"
              >
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110", item.color)}>
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">{item.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section id="properties-grid" className="py-24 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">استكشف العقارات المتاحة</h2>
              <p className="text-slate-500 dark:text-slate-400">اختر من بين مئات العقارات الموثوقة والمحدثة يومياً</p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setFilter('all')}
                className={cn(
                  "px-6 py-2.5 rounded-xl font-bold transition-all",
                  filter === 'all' ? "bg-indigo-600 dark:bg-indigo-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                )}
              >
                الكل
              </button>
              <button
                onClick={() => setFilter('sale')}
                className={cn(
                  "px-6 py-2.5 rounded-xl font-bold transition-all",
                  filter === 'sale' ? "bg-indigo-600 dark:bg-indigo-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                )}
              >
                للبيع
              </button>
              <button
                onClick={() => setFilter('rent')}
                className={cn(
                  "px-6 py-2.5 rounded-xl font-bold transition-all",
                  filter === 'rent' ? "bg-emerald-600 dark:bg-emerald-500 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                )}
              >
                للإيجار
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex gap-4 overflow-x-auto pb-6 mb-8 no-scrollbar">
            {[
              { id: 'all', label: 'الكل', icon: Building2 },
              { id: 'apartment', label: 'شقق', icon: Building2 },
              { id: 'villa', label: 'فلل', icon: Home },
              { id: 'office', label: 'مكاتب', icon: Building2 },
              { id: 'land', label: 'أراضي', icon: MapPin },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as any)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3 rounded-2xl border transition-all whitespace-nowrap",
                  category === cat.id
                    ? "bg-indigo-50 dark:bg-indigo-900/30 border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 font-bold"
                    : "bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700"
                )}
              >
                <cat.icon size={18} />
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onClick={setSelectedProperty}
                />
              ))}
            </AnimatePresence>
          </div>

          {filteredProperties.length === 0 && (
            <div className="py-20 text-center">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-400">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">لا توجد نتائج</h3>
              <p className="text-slate-500">جرب تغيير معايير البحث أو الفلاتر</p>
            </div>
          )}
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">شركاؤنا في النجاح</h2>
            <p className="text-slate-500 dark:text-slate-400">نفخر بثقة نخبة من المطورين والعملاء في خدماتنا</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              { label: "ملاك ومطورون", value: 30, suffix: "+" },
              { label: "شركة عقارية", value: 19, suffix: "+" },
              { label: "عميل", value: 200, suffix: "+" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white dark:bg-slate-800 p-8 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-700 text-center transition-colors"
              >
                <div className="text-4xl font-black text-indigo-600 dark:text-indigo-400 mb-2">
                  <Counter value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-slate-600 dark:text-slate-300 font-bold">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 dark:border-slate-800"
          >
            <img
              src="https://i.ibb.co/TxQ5XLYQ/2026-02-22-200829.png"
              alt="Partners"
              className="w-full h-auto object-cover dark:opacity-80 transition-opacity"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden bg-indigo-600 dark:bg-indigo-700 rounded-[40px] p-12 lg:p-20 text-center text-white">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full translate-x-1/3 translate-y-1/3" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-4xl lg:text-5xl font-black mb-6">هل تريد عرض عقارك؟</h2>
              <p className="text-indigo-100 text-lg mb-10 leading-relaxed">
                انضم إلى الملاك والوسطاء العقاريين الذين يعرضون عقاراتهم على موقعنا ويصلون آلاف العملاء المهتمين.
              </p>
              <div className="flex items-center justify-center">
                <a
                  href="tel:0544137950"
                  className="w-full sm:w-auto px-10 py-4 bg-white text-indigo-600 dark:text-indigo-700 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl shadow-indigo-900/20 flex items-center justify-center gap-2"
                >
                  <Phone size={20} />
                  تواصل مع المبيعات
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white overflow-hidden relative transition-colors">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200 dark:bg-indigo-600 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-200 dark:bg-emerald-600 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">آراء عملائنا</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">نفخر بثقة عملائنا ونسعى دائماً لتقديم الأفضل</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "AMIN ALHARBI",
                text: "الله يجزاك خير على التعامل الراقي والرائع الاخت الكريمة ندى الزهراني اللي كانت من البداية الى ان سكنت في بيتي وهي معانا في كل شيء الف شكر لكي",
                role: "عميل سعيد"
              },
              {
                name: "Malaky S",
                text: "الاستاذة ندى الزهراني قد قامت ب الخدمة على اكمل وجهة كان اسلوبها جميل شكراً على مجهوداتها",
                role: "عميل سعيد"
              },
              {
                name: "غرم الله سرحان",
                text: "كنت ابحث عن شقه في محافظة جدة وبحمد الله كان للاخت ندى الفضل بعد الله سبحانه في الحصول على الشقة المناسبة وبالسعر المناسب والمكان المناسب وانصح بالشراء عن طريق الاخت ندى الزهراني لحسن تعاملها مني جزيل الشكر والتقدير",
                role: "عميل سعيد"
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="p-8 bg-white dark:bg-slate-900/50 backdrop-blur-sm rounded-[32px] border border-slate-200 dark:border-slate-800 relative group hover:bg-slate-50 dark:hover:bg-slate-800/80 transition-all shadow-sm"
              >
                <Quote className="absolute top-6 left-6 text-indigo-500/20 group-hover:text-indigo-500/40 transition-colors" size={48} />

                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>

                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 dark:bg-indigo-500 rounded-full flex items-center justify-center font-bold text-xl text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-400 dark:text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">موقعنا</h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-[40px] shadow-2xl dark:shadow-slate-950/50 border border-slate-100 dark:border-slate-800 h-[450px] bg-slate-50 dark:bg-slate-900 transition-colors"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14828.694600109506!2d39.1118671!3d21.7114631!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x15c3d972776c59d9%3A0xe54d6ea61bface66!2z2LTYudCw2LEg2KfZhNi52YLZitCw2LHZitip!5e0!3m2!1sar!2ssa!4v1708684000000!5m2!1sar!2ssa"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع شعار العقارية"
                className="relative z-0 dark:invert-[0.85] dark:hue-rotate-180 transition-all grayscale-[0.2] dark:grayscale-[0.5]"
              ></iframe>

              {/* Link Overlay */}
              <a
                href="https://maps.app.goo.gl/KLYVVN1gQCJKqrxk8"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-10 flex items-end justify-end p-6 bg-transparent group"
              >
                <div className="bg-white dark:bg-slate-800 px-6 py-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 font-bold text-slate-900 dark:text-white group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500 group-hover:text-white transition-all flex items-center gap-2">
                  <MapPin size={20} />
                  <span>فتح في خرائط جوجل</span>
                </div>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <AnimatePresence>
        {selectedProperty && (
          <PropertyDetail
            property={selectedProperty}
            onClose={() => setSelectedProperty(null)}
            onInterest={() => setShowInterestForm(true)}
          />
        )}
        {showInterestForm && selectedProperty && (
          <InterestForm
            property={selectedProperty}
            onClose={() => setShowInterestForm(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 glass dark:bg-slate-900/80 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center shadow-sm dark:shadow-none overflow-hidden">
                <img
                  src="/favicon.png"
                  alt="Logo"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">شعار العقارية</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className={cn("font-medium transition-colors", location.pathname === '/' ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400")}>الرئيسية</Link>
              <Link to="/about-us" className={cn("font-medium transition-colors", location.pathname === '/about-us' ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400")}>من نحن</Link>
              <Link to="/own-property" className={cn("font-medium transition-colors", location.pathname === '/own-property' ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400")}>تملك عقارك</Link>
              <Link to="/?type=sale" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">عقارات للبيع</Link>
              <Link to="/?type=rent" className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors">عقارات للإيجار</Link>

              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-sm"
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <a
                href={`https://wa.me/966544137950?text=${encodeURIComponent('السلام عليكم حاب اعرض عقاري عندكم')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-indigo-600 dark:bg-indigo-500 text-white rounded-xl font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-md shadow-indigo-200 dark:shadow-none"
              >
                أضف عقارك
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                className="p-2 text-slate-600 dark:text-slate-400"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-900 dark:text-white">الرئيسية</Link>
                <Link to="/about-us" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-900 dark:text-white">من نحن</Link>
                <Link to="/own-property" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-900 dark:text-white">تملك عقارك</Link>
                <Link to="/?type=sale" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-900 dark:text-white">عقارات للبيع</Link>
                <Link to="/?type=rent" onClick={() => setIsMenuOpen(false)} className="block text-lg font-medium text-slate-900 dark:text-white">عقارات للإيجار</Link>
                <a
                  href={`https://wa.me/966544137950?text=${encodeURIComponent('السلام عليكم حاب اعرض عقاري عندكم')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-center"
                >
                  أضف عقارك
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {children}

      {/* Footer */}
      <footer className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white pt-20 pb-10 border-t border-slate-200 dark:border-slate-800/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img
                    src="/favicon.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="text-2xl font-black tracking-tight">شعار العقارية</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed">
                شعار العقارية, معتمدة من الهيئة العامة للعقار, تقدم مجموعة متكاملة من الخدمات العقارية مقّرهــا في مدينــة جــدة.
              </p>
              <div className="space-y-3 text-slate-500 dark:text-slate-400 text-sm">
                <div className="flex items-center gap-3">
                  <Phone size={18} className="text-indigo-500" />
                  <a href="tel:0544137950" className="hover:text-indigo-600 dark:hover:text-white transition-colors">0544137950</a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-indigo-500" />
                  <a href="mailto:Nadabroker@aol.com" className="hover:text-indigo-600 dark:hover:text-white transition-colors">Nadabroker@aol.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-indigo-500" />
                  <span>طريق الأمير نايف، ابحر الشمالية، حي الفردوس، جدة 23818</span>
                </div>
              </div>
              <div className="flex gap-4">
                <a href="https://twitter.com/nadabrokersa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-white flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm"><Twitter size={20} /></a>
                <a href="https://www.tiktok.com/@nadabrokersa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-white flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" /></svg></a>
                <a href="https://instagram.com/nadabrokersa" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-white flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all shadow-sm"><Instagram size={20} /></a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400">
                <li><Link to="/about-us" className="hover:text-indigo-600 dark:hover:text-white transition-colors">من نحن</Link></li>
                <li><Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)} className="hover:text-indigo-600 dark:hover:text-white transition-colors">سياسة الخصوصية</Link></li>
                <li><Link to="/?type=sale&category=apartment" onClick={() => window.scrollTo(0, 0)} className="hover:text-indigo-600 dark:hover:text-white transition-colors">شقق للبيع</Link></li>
                <li><Link to="/?type=sale&category=villa" onClick={() => window.scrollTo(0, 0)} className="hover:text-indigo-600 dark:hover:text-white transition-colors">فلل للبيع</Link></li>
                <li className="text-slate-900 dark:text-white font-bold mt-4 mb-2">اتصل بنا</li>
                <li>
                  <a href="tel:0544137950" className="flex items-center gap-3 hover:text-indigo-600 dark:hover:text-white transition-colors">
                    <Phone size={18} className="text-indigo-500" />
                    <span>0544137950</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h4 className="text-lg font-bold mb-6">معلومات قانونية</h4>
              <div className="space-y-4 text-slate-500 dark:text-slate-400 text-sm">
                <p>رخصة فال رقم: 1200027299</p>
                <p>سجل تجاري: ٤٠٣٠٥٥٧٥٩٣</p>
                <p>الهيئة العامة للعقار</p>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-200 dark:border-slate-800/50 text-center text-slate-400 dark:text-slate-500 text-sm">
            <p>© {new Date().getFullYear()} جميع الحقوق محفوظة لشركة شعار العقارية</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/own-property" element={<OwnYourProperty />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
