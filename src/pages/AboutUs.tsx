import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Users, Target, Award } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-black mb-8"
          >
            من نحن
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed"
          >
            شعار العقارية.. شريكك الموثوق في رحلة البحث عن التميز العقاري
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black text-slate-900 mb-8 leading-tight">
                شعار العقارية، معتمدة من الهيئة العامة للعقار
              </h2>
              <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                <p>
                  تقدم مجموعة متكاملة من الخدمات العقارية مقّرهــا في مدينــة جــدة، متخصصة في مجال التسويق و الوساطة العقارية وغيرها من الخدمات الواسعة حيث مكّنت آلاف العائلات من تملك منزلهم.
                </p>
                <p>
                  نحن نسعى دائمًا للابتكار والتفرد في عالم العقارات، ونعمل جاهدين على تحقيق أقصى استفادة للعميل. دعنا نساعدك في بناء مستقبل أفضل وتحقيق أحلامك.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-12">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-4">
                    <Award size={24} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">معتمدة رسمياً</h4>
                  <p className="text-sm text-slate-500">من الهيئة العامة للعقار</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4">
                    <Users size={24} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-1">آلاف العائلات</h4>
                  <p className="text-sm text-slate-500">تم تمكينهم من التملك</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden shadow-2xl">
                <img
                  src="/favicon.png"
                  alt="About Us"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 p-8 bg-white rounded-3xl shadow-xl border border-slate-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 text-white rounded-full flex items-center justify-center">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">موثوقية</div>
                    <div className="text-sm text-slate-500 font-bold">أمان تام في التعامل</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-black text-slate-900 mb-16">قيمنا الجوهرية</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "الابتكار",
                desc: "نسعى دائماً لتقديم حلول عقارية مبتكرة تسبق تطلعات السوق.",
                icon: Target
              },
              {
                title: "الشفافية",
                desc: "نؤمن بأن الصدق والوضوح هما أساس بناء علاقة مستدامة مع عملائنا.",
                icon: ShieldCheck
              },
              {
                title: "التميز",
                desc: "نلتزم بأعلى معايير الجودة في كل خدمة نقدمها لعملائنا.",
                icon: Award
              }
            ].map((value, idx) => (
              <div key={idx} className="p-10 bg-white rounded-[40px] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-slate-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <value.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-500 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
