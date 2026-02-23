import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Mail,
  Briefcase,
  UserCircle,
  Calendar,
  Phone,
  Home,
  DollarSign,
  MapPin,
  Maximize,
  Wallet,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { cn } from '../lib/utils';

export default function OwnYourProperty() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employer: '',
    jobTitle: '',
    age: '',
    phone: '',
    hasJointApplicants: false,
    jointApplicantIncome: '',
    propertyType: 'فيلا مستقلة',
    propertyValue: '',
    district: '',
    city: '',
    area: '',
    monthlyIncome: '',
    hasObligations: false,
    obligationAmount: '',
    hasDownPayment: false,
    downPaymentAmount: '',
    contactMethod: 'الهاتف'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const data = await response.json().catch(() => null);
        alert(data?.error || 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('حدث خطأ في الاتصال. يرجى التحقق من الإنترنت والمحاولة مرة أخرى.');
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[40px] shadow-2xl text-center"
        >
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-4">شكراً لك!</h2>
          <p className="text-lg text-slate-600 mb-10 leading-relaxed">
            تم استلام طلبك بنجاح. سيقوم فريق المبيعات بالتواصل معك في أقرب وقت ممكن لمتابعة إجراءات تملك عقارك.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all"
          >
            <span>العودة للرئيسية</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black text-slate-900 mb-4">تملك عقارك</h1>
          <p className="text-slate-500 text-lg">املأ النموذج التالي وسنقوم بدراسة طلبك وتقديم أفضل الحلول التمويلية لك</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <User size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">المعلومات الشخصية</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">الاسم الكامل</label>
                <div className="relative">
                  <UserCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="text"
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="أدخل اسمك الثلاثي"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">البريد الإلكتروني</label>
                <div className="relative">
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="email"
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="example@mail.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">جهة العمل</label>
                <div className="relative">
                  <Briefcase className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="text"
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="اسم الشركة أو الوزارة"
                    value={formData.employer}
                    onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">المسمى الوظيفي</label>
                <div className="relative">
                  <UserCircle className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="text"
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="مثال: مهندس برمجيات"
                    value={formData.jobTitle}
                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">العمر</label>
                <div className="relative">
                  <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="text"
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="أدخل عمرك"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">رقم الجوال</label>
                <div className="relative">
                  <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="tel"
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="05xxxxxxxx"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Property Data */}
          <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                <Home size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">بيانات العقار</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-slate-700">نوع العقار</label>
                <div className="grid grid-cols-3 gap-4">
                  {['فيلا مستقلة', 'فيلا دبلكس', 'شقة'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setFormData({ ...formData, propertyType: type })}
                      className={cn(
                        "py-4 rounded-2xl font-bold border transition-all",
                        formData.propertyType === type
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200"
                          : "bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-300"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">قيمة العقار المتوقعة</label>
                <div className="relative">
                  <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="text"
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="ر.س"
                    value={formData.propertyValue}
                    onChange={(e) => setFormData({ ...formData, propertyValue: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">المساحة</label>
                <div className="relative">
                  <Maximize className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="text"
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="م²"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">المدينة</label>
                <div className="relative">
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="text"
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="مثال: جدة"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">الحي</label>
                <div className="relative">
                  <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="text"
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="مثال: حي الشاطئ"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Financial Information */}
          <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center">
                <Wallet size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">المعلومات المالية</h2>
            </div>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">الدخل الشهري</label>
                <div className="relative">
                  <DollarSign className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input
                    required
                    type="text"
                    className="w-full pr-12 pl-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                    placeholder="ر.س"
                    value={formData.monthlyIncome}
                    onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 block">هل لديك التزامات مالية؟</label>
                  <div className="flex gap-4">
                    {[true, false].map((val) => (
                      <button
                        key={val ? 'yes' : 'no'}
                        type="button"
                        onClick={() => setFormData({ ...formData, hasObligations: val })}
                        className={cn(
                          "flex-1 py-3 rounded-xl font-bold border transition-all",
                          formData.hasObligations === val
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "bg-slate-50 border-slate-100 text-slate-600"
                        )}
                      >
                        {val ? 'نعم' : 'لا'}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {formData.hasObligations && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <input
                          type="text"
                          className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          placeholder="مقدار الالتزامات الشهرية"
                          value={formData.obligationAmount}
                          onChange={(e) => setFormData({ ...formData, obligationAmount: e.target.value })}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 block">هل يتوفر لديك دفعة أولى؟</label>
                  <div className="flex gap-4">
                    {[true, false].map((val) => (
                      <button
                        key={val ? 'yes' : 'no'}
                        type="button"
                        onClick={() => setFormData({ ...formData, hasDownPayment: val })}
                        className={cn(
                          "flex-1 py-3 rounded-xl font-bold border transition-all",
                          formData.hasDownPayment === val
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "bg-slate-50 border-slate-100 text-slate-600"
                        )}
                      >
                        {val ? 'نعم' : 'لا'}
                      </button>
                    ))}
                  </div>
                  <AnimatePresence>
                    {formData.hasDownPayment && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <input
                          type="text"
                          className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          placeholder="مقدار الدفعة المتوفرة"
                          value={formData.downPaymentAmount}
                          onChange={(e) => setFormData({ ...formData, downPaymentAmount: e.target.value })}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-slate-700 block">هل لديك متضامنين؟</label>
                <div className="flex gap-4 max-w-md">
                  {[true, false].map((val) => (
                    <button
                      key={val ? 'yes' : 'no'}
                      type="button"
                      onClick={() => setFormData({ ...formData, hasJointApplicants: val })}
                      className={cn(
                        "flex-1 py-3 rounded-xl font-bold border transition-all",
                        formData.hasJointApplicants === val
                          ? "bg-indigo-600 border-indigo-600 text-white"
                          : "bg-slate-50 border-slate-100 text-slate-600"
                      )}
                    >
                      {val ? 'نعم' : 'لا'}
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {formData.hasJointApplicants && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden space-y-2"
                    >
                      <label className="text-sm font-bold text-slate-700">دخل المتضامن الشهري</label>
                      <input
                        type="text"
                        className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="ر.س"
                        value={formData.jointApplicantIncome}
                        onChange={(e) => setFormData({ ...formData, jointApplicantIncome: e.target.value })}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </section>

          {/* Contact Method */}
          <section className="bg-white p-8 md:p-10 rounded-[32px] shadow-xl shadow-slate-200/50 border border-slate-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
                <MessageSquare size={20} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">طريقة الاتصال المفضلة</h2>
            </div>

            <div className="flex gap-4">
              {['الهاتف', 'الواتس اب'].map((method) => (
                <button
                  key={method}
                  type="button"
                  onClick={() => setFormData({ ...formData, contactMethod: method })}
                  className={cn(
                    "flex-1 py-4 rounded-2xl font-bold border transition-all flex items-center justify-center gap-2",
                    formData.contactMethod === method
                      ? "bg-slate-900 border-slate-900 text-white shadow-lg"
                      : "bg-slate-50 border-slate-100 text-slate-600 hover:border-slate-300"
                  )}
                >
                  {method === 'الهاتف' ? <Phone size={18} /> : <MessageSquare size={18} />}
                  <span>{method}</span>
                </button>
              ))}
            </div>
          </section>

          <button
            type="submit"
            className="w-full py-6 bg-indigo-600 text-white rounded-[24px] font-black text-xl hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 flex items-center justify-center gap-3"
          >
            <span>إرسال طلب التملك</span>
            <ArrowRight size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}
