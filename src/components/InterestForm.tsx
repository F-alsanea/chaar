import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { Property } from '../types';
import { cn } from '../lib/utils';

interface InterestFormProps {
  property: Property;
  onClose: () => void;
}

export const InterestForm: React.FC<InterestFormProps> = ({ property, onClose }) => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [formData, setFormData] = useState({
    property_id: property.id,
    property_number: property.propertyNumber || '',
    name: '',
    email: '',
    employer: '',
    job_title: '',
    age: '',
    phone: '',
    income: '',
    has_commitments: 'no',
    commitment_amount: '',
    has_downpayment: 'no',
    downpayment_amount: '',
    has_cosigner: 'no',
    cosigner_income: '',
    contact_method: 'phone'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify({
          ...formData,
          type: 'interest',
          property_title: property.title
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        const data = await response.json().catch(() => null);
        alert(data?.error || 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.');
        setStatus('idle');
      }
    } catch (error) {
      console.error('Error submitting interest:', error);
      alert('حدث خطأ في الاتصال. يرجى التحقق من الإنترنت والمحاولة مرة أخرى.');
      setStatus('idle');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          <button
            onClick={onClose}
            className="absolute top-6 left-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>

          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-20 h-20 mb-6 text-emerald-500 bg-emerald-50 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">شكراً لك!</h3>
                <p className="text-xl text-slate-600">تم استلام طلبك بنجاح. سيتم التواصل معك من قبل فريق المبيعات في أقرب وقت ممكن بخصوص {property.title}.</p>
                <button
                  onClick={onClose}
                  className="mt-10 px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-colors"
                >
                  إغلاق
                </button>
              </motion.div>
            ) : (
              <motion.div key="form">
                <div className="mb-8">
                  <h3 className="text-2xl font-black text-slate-900">أنا مهتم بهذا العقار</h3>
                  <p className="text-slate-500 mt-2 font-medium">يرجى تعبئة النموذج التالي وسنقوم بالتواصل معك</p>
                  <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-sm text-slate-500 font-bold">العقار: {property.title}</div>
                    {property.propertyNumber && <div className="text-sm text-indigo-600 font-bold">رقم العقار: {property.propertyNumber}</div>}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">الاسم الكامل</label>
                      <input
                        required
                        type="text"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="أدخل اسمك"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">رقم الجوال</label>
                      <input
                        required
                        type="tel"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="05xxxxxxxx"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">البريد الإلكتروني</label>
                      <input
                        required
                        type="email"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="example@mail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">العمر</label>
                      <input
                        required
                        type="number"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="أدخل عمرك"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">جهة العمل</label>
                      <input
                        required
                        type="text"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="اسم جهة العمل"
                        value={formData.employer}
                        onChange={(e) => setFormData({ ...formData, employer: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">المسمى الوظيفي</label>
                      <input
                        required
                        type="text"
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                        placeholder="مسمالك الوظيفي"
                        value={formData.job_title}
                        onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Financial Info */}
                  <div className="pt-4 border-t border-slate-100">
                    <h4 className="text-lg font-bold text-slate-900 mb-6">المعلومات المالية</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">الدخل الشهري</label>
                        <input
                          required
                          type="number"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          placeholder="ر.س"
                          value={formData.income}
                          onChange={(e) => setFormData({ ...formData, income: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">لديك التزامات؟</label>
                        <div className="flex gap-4">
                          {['yes', 'no'].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setFormData({ ...formData, has_commitments: opt })}
                              className={cn(
                                "flex-1 py-4 rounded-2xl font-bold border transition-all",
                                formData.has_commitments === opt
                                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                  : "bg-white border-slate-200 text-slate-500"
                              )}
                            >
                              {opt === 'yes' ? 'نعم' : 'لا'}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {formData.has_commitments === 'yes' && (
                      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
                        <label className="block text-sm font-bold text-slate-700 mb-2">مقدار الالتزامات الشهرية</label>
                        <input
                          required
                          type="number"
                          className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                          placeholder="ر.س"
                          value={formData.commitment_amount}
                          onChange={(e) => setFormData({ ...formData, commitment_amount: e.target.value })}
                        />
                      </motion.div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">يتوفر لديك دفعة؟</label>
                        <div className="flex gap-4">
                          {['yes', 'no'].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setFormData({ ...formData, has_downpayment: opt })}
                              className={cn(
                                "flex-1 py-4 rounded-2xl font-bold border transition-all",
                                formData.has_downpayment === opt
                                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                  : "bg-white border-slate-200 text-slate-500"
                              )}
                            >
                              {opt === 'yes' ? 'نعم' : 'لا'}
                            </button>
                          ))}
                        </div>
                      </div>
                      {formData.has_downpayment === 'yes' && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                          <label className="block text-sm font-bold text-slate-700 mb-2">مقدار الدفعة المتوفرة</label>
                          <input
                            required
                            type="number"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="ر.س"
                            value={formData.downpayment_amount}
                            onChange={(e) => setFormData({ ...formData, downpayment_amount: e.target.value })}
                          />
                        </motion.div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">لديك متضامنين؟</label>
                        <div className="flex gap-4">
                          {['yes', 'no'].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setFormData({ ...formData, has_cosigner: opt })}
                              className={cn(
                                "flex-1 py-4 rounded-2xl font-bold border transition-all",
                                formData.has_cosigner === opt
                                  ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                                  : "bg-white border-slate-200 text-slate-500"
                              )}
                            >
                              {opt === 'yes' ? 'نعم' : 'لا'}
                            </button>
                          ))}
                        </div>
                      </div>
                      {formData.has_cosigner === 'yes' && (
                        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                          <label className="block text-sm font-bold text-slate-700 mb-2">مقدار دخل المتضامن</label>
                          <input
                            required
                            type="number"
                            className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="ر.س"
                            value={formData.cosigner_income}
                            onChange={(e) => setFormData({ ...formData, cosigner_income: e.target.value })}
                          />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Contact Method */}
                  <div className="pt-4 border-t border-slate-100">
                    <label className="block text-sm font-bold text-slate-700 mb-4">طريقة الاتصال المفضلة</label>
                    <div className="flex gap-4">
                      {[
                        { id: 'phone', label: 'الهاتف' },
                        { id: 'whatsapp', label: 'الواتس اب' }
                      ].map((method) => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, contact_method: method.id })}
                          className={cn(
                            "flex-1 py-4 rounded-2xl font-bold border transition-all",
                            formData.contact_method === method.id
                              ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-200"
                              : "bg-white border-slate-200 text-slate-500"
                          )}
                        >
                          {method.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    disabled={status === 'submitting'}
                    type="submit"
                    className="w-full flex items-center justify-center gap-3 py-5 bg-indigo-600 text-white rounded-[24px] font-black text-lg hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-xl shadow-indigo-200"
                  >
                    {status === 'submitting' ? (
                      <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>إرسال الطلب</span>
                        <Send size={22} />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};
