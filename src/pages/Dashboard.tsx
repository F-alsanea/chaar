import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Calendar,
  Phone,
  Mail,
  Home,
  DollarSign,
  MapPin,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Briefcase,
  Wallet,
  MessageSquare,
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Eye,
  EyeOff,
  Save,
  X,
  Lock,
  User,
  Copy,
  Link as LinkIcon,
  Upload,
  Settings,
  Megaphone,
  ClipboardCopy
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Property } from '../types';

/** Helper to add CSRF headers */
function secureHeaders(): Record<string, string> {
  return { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' };
}

interface Submission {
  id: number;
  name: string;
  email: string;
  employer: string;
  job_title: string;
  age: number;
  phone: string;
  has_joint_applicants: number;
  joint_applicant_income: number;
  property_type: string;
  property_value: number;
  district: string;
  city: string;
  area: number;
  monthly_income: number;
  has_obligations: number;
  obligation_amount: number;
  has_down_payment: number;
  down_payment_amount: number;
  contact_method: string;
  created_at: string;
}

export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'submissions' | 'properties' | 'banner'>('submissions');
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [propertyImages, setPropertyImages] = useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  // Banner 5 state
  const [banner5Visible, setBanner5Visible] = useState(false);
  const [banner5Image, setBanner5Image] = useState('');
  const [bannerSaving, setBannerSaving] = useState(false);

  useEffect(() => {
    // Always fetch properties (public)
    fetchProperties();
    if (isLoggedIn) {
      fetchSubmissions();
      fetchBannerSettings();
    } else {
      setLoading(false);
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: secureHeaders(),
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setIsLoggedIn(true);
        setLoginError('');
        setLoading(true);
      } else {
        const data = await response.json();
        setLoginError(data.error || 'اسم المستخدم أو كلمة المرور غير صحيحة');
      }
    } catch {
      setLoginError('حدث خطأ في الاتصال بالخادم');
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/submissions', { headers: secureHeaders() });
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error('Error fetching submissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties');
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const fetchBannerSettings = async () => {
    try {
      const response = await fetch('/api/settings');
      if (response.ok) {
        const data = await response.json();
        setBanner5Visible(data.banner5_visible || false);
        setBanner5Image(data.banner5_image || '');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    }
  };

  const handleSaveBanner = async () => {
    setBannerSaving(true);
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: secureHeaders(),
        body: JSON.stringify({ banner5_visible: banner5Visible, banner5_image: banner5Image }),
      });
    } catch (error) {
      console.error('Error saving banner:', error);
    } finally {
      setBannerSaving(false);
    }
  };

  const handleBannerImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = reader.result as string;
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: secureHeaders(),
          body: JSON.stringify({ file: base64, fileName: file.name }),
        });
        if (response.ok) {
          const { url } = await response.json();
          setBanner5Image(url);
        }
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch {
      setUploading(false);
    }
  };

  const handleSaveProperty = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const propertyData = {
      id: editingProperty?.id || undefined,
      title: formData.get('title') as string,
      price: Number(formData.get('price')),
      location: formData.get('location') as string,
      type: formData.get('type') as 'sale' | 'rent',
      category: formData.get('category') as string,
      bedrooms: Number(formData.get('bedrooms')),
      bathrooms: Number(formData.get('bathrooms')),
      area: Number(formData.get('area')),
      description: formData.get('description') as string,
      features: (formData.get('features') as string).split(',').map(f => f.trim()).filter(f => f),
      image: propertyImages.length > 0 ? propertyImages[0] : (editingProperty?.image || 'https://picsum.photos/seed/new/800/600'),
      images: propertyImages,
      showPrice: formData.get('showPrice') === 'on',
      propertyNumber: formData.get('propertyNumber') as string,
      licenseNumber: formData.get('licenseNumber') as string,
      subType: formData.get('subType') as string,
    };

    try {
      const method = editingProperty ? 'PUT' : 'POST';
      const response = await fetch('/api/properties', {
        method,
        headers: secureHeaders(),
        body: JSON.stringify(propertyData),
      });
      if (response.ok) {
        await fetchProperties();
        setEditingProperty(null);
        setIsAddingProperty(false);
        setPropertyImages([]);
        setNewImageUrl('');
      }
    } catch (error) {
      console.error('Error saving property:', error);
    }
  };

  const handleAddImage = () => {
    const url = newImageUrl.trim();
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      setPropertyImages(prev => [...prev, url]);
      setNewImageUrl('');
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        await new Promise<void>((resolve) => {
          reader.onload = async () => {
            const base64 = reader.result as string;
            const response = await fetch('/api/upload', {
              method: 'POST',
              headers: secureHeaders(),
              body: JSON.stringify({ file: base64, fileName: file.name }),
            });
            if (response.ok) {
              const { url } = await response.json();
              setPropertyImages(prev => [...prev, url]);
            }
            resolve();
          };
          reader.readAsDataURL(file);
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleRemoveImage = (index: number) => {
    setPropertyImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleDuplicateProperty = (property: Property) => {
    const duplicated = {
      ...property,
      id: undefined as any,
      title: property.title + ' (نسخة)',
    };
    setEditingProperty(null);
    setIsAddingProperty(true);
    setPropertyImages((property as any).images || (property.image ? [property.image] : []));
    // Use setTimeout to let the form render first
    setTimeout(() => {
      setEditingProperty(duplicated);
    }, 50);
  };

  const handleStartEdit = (property: Property) => {
    setEditingProperty(property);
    setPropertyImages((property as any).images || (property.image ? [property.image] : []));
  };

  const handleStartAdd = () => {
    setIsAddingProperty(true);
    setPropertyImages([]);
    setNewImageUrl('');
  };

  const handleDeleteProperty = async (id: string) => {
    if (confirm('هل أنت متأكد من حذف هذا العقار؟')) {
      try {
        const response = await fetch(`/api/properties?id=${id}`, {
          method: 'DELETE',
          headers: secureHeaders(),
        });
        if (response.ok) await fetchProperties();
      } catch (error) {
        console.error('Error deleting property:', error);
      }
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[40px] p-10 shadow-2xl border border-slate-100 dark:border-slate-800 transition-colors"
        >
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-indigo-600 dark:bg-indigo-500 text-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-indigo-200 dark:shadow-none">
              <Lock size={40} />
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">تسجيل الدخول</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-2">لوحة التحكم الخاصة بشعار العقارية</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block">اسم المستخدم</label>
              <div className="relative">
                <User className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
                <input
                  name="username"
                  required
                  className="w-full pr-14 pl-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                  placeholder="أدخل اسم المستخدم"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={20} />
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full pr-14 pl-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                  placeholder="أدخل كلمة المرور"
                />
              </div>
            </div>

            {loginError && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold text-center"
              >
                {loginError}
              </motion.div>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
            >
              دخول
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12 px-4 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">لوحة التحكم</h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">إدارة الطلبات والعقارات المعروضة</p>
          </div>

          <div className="flex bg-white dark:bg-slate-900 p-1 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
            {['submissions', 'properties', 'banner'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-4 sm:px-6 py-2.5 rounded-xl font-bold text-sm transition-all whitespace-nowrap",
                  activeTab === tab
                    ? "bg-indigo-600 dark:bg-indigo-500 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                )}
              >
                {tab === 'submissions' ? `الطلبات (${submissions.length})` : tab === 'properties' ? `العقارات (${properties.length})` : 'الإعلانات'}
              </button>
            ))}
          </div>
        </div>

        {activeTab === 'submissions' && (
          <div className="space-y-4">
            {submissions.map((sub) => (
              <div
                key={sub.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-all hover:shadow-md transition-colors"
              >
                <div
                  className="p-6 flex flex-wrap items-center justify-between gap-4 cursor-pointer"
                  onClick={() => setExpandedId(expandedId === sub.id ? null : sub.id)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center font-bold text-xl transition-colors">
                      {sub.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-lg">{sub.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1">
                        <span className="flex items-center gap-1"><Clock size={14} /> {new Date(sub.created_at).toLocaleDateString('ar-SA')}</span>
                        <span className="flex items-center gap-1"><Phone size={14} /> {sub.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "px-4 py-1.5 rounded-full text-xs font-bold",
                      sub.property_type === 'فيلا مستقلة' ? "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300" :
                        sub.property_type === 'فيلا دبلكس' ? "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300" : "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                    )}>
                      {sub.property_type}
                    </span>
                    <div className="text-slate-400 dark:text-slate-500">
                      {expandedId === sub.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {expandedId === sub.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="px-6 pb-8 border-t border-slate-50 dark:border-slate-800 pt-6 transition-colors"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {/* Column 1: Personal */}
                      <div className="space-y-6">
                        <h4 className="font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider">المعلومات الشخصية</h4>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Mail size={18} className="text-slate-400 dark:text-slate-500" />
                            <span className="text-slate-700 dark:text-slate-300">{sub.email}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Briefcase size={18} className="text-slate-400 dark:text-slate-500" />
                            <span className="text-slate-700 dark:text-slate-300">{sub.employer} - {sub.job_title}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Calendar size={18} className="text-slate-400 dark:text-slate-500" />
                            <span className="text-slate-700 dark:text-slate-300">العمر: {sub.age} سنة</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MessageSquare size={18} className="text-slate-400 dark:text-slate-500" />
                            <span className="text-slate-700 dark:text-slate-300">التواصل: {sub.contact_method}</span>
                          </div>
                        </div>
                      </div>

                      {/* Column 2: Property */}
                      <div className="space-y-6">
                        <h4 className="font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider">بيانات العقار</h4>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <DollarSign size={18} className="text-indigo-500 dark:text-indigo-400" />
                            <span className="text-slate-900 dark:text-white font-bold">{sub.property_value.toLocaleString()} ر.س</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <MapPin size={18} className="text-slate-400 dark:text-slate-500" />
                            <span className="text-slate-700 dark:text-slate-300">{sub.city}، {sub.district}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Home size={18} className="text-slate-400 dark:text-slate-500" />
                            <span className="text-slate-700 dark:text-slate-300">المساحة: {sub.area} م²</span>
                          </div>
                        </div>
                      </div>

                      {/* Column 3: Financial */}
                      <div className="space-y-6">
                        <h4 className="font-bold text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider">المعلومات المالية</h4>
                        <div className="space-y-4">
                          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-3 transition-colors">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-500 dark:text-slate-400">الدخل الشهري</span>
                              <span className="font-bold text-slate-900 dark:text-white">{sub.monthly_income.toLocaleString()} ر.س</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-500 dark:text-slate-400">الالتزامات</span>
                              <span className={cn("font-bold", sub.has_obligations ? "text-red-500 dark:text-red-400" : "text-emerald-500 dark:text-emerald-400")}>
                                {sub.has_obligations ? `${sub.obligation_amount.toLocaleString()} ر.س` : 'لا يوجد'}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-slate-500 dark:text-slate-400">الدفعة الأولى</span>
                              <span className={cn("font-bold", sub.has_down_payment ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400 dark:text-slate-500")}>
                                {sub.has_down_payment ? `${sub.down_payment_amount.toLocaleString()} ر.س` : 'لا يتوفر'}
                              </span>
                            </div>
                          </div>
                          {sub.has_joint_applicants === 1 && (
                            <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl flex justify-between items-center transition-colors">
                              <span className="text-sm text-indigo-700 dark:text-indigo-300 font-bold">دخل المتضامن</span>
                              <span className="font-bold text-indigo-900 dark:text-indigo-100">{sub.joint_applicant_income.toLocaleString()} ر.س</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-4 transition-colors">
                      <button
                        // ... clipboard logic ...
                        className="flex items-center gap-2 px-6 py-3 bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 rounded-2xl font-bold hover:bg-indigo-100 dark:hover:bg-indigo-900/60 transition-all text-sm transition-colors"
                      >
                        <ClipboardCopy size={16} />
                        نسخ بيانات الطلب
                      </button>

                      <button
                        // ... whatsapp logic ...
                        className="flex items-center gap-2 px-6 py-3 bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 rounded-2xl font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition-all text-sm transition-colors"
                      >
                        <MessageSquare size={16} />
                        إرسال رسالة واتساب
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ))}

            {submissions.length === 0 && (
              <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-700 transition-colors">
                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 text-slate-300 dark:text-slate-600 rounded-full flex items-center justify-center mx-auto mb-6 transition-colors">
                  <Users size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">لا توجد طلبات بعد</h3>
                <p className="text-slate-500 dark:text-slate-400">سيتم عرض الطلبات هنا بمجرد قيام العملاء بتعبئة نموذج التملك.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'properties' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">إدارة العقارات</h2>
              <button
                onClick={handleStartAdd}
                className="flex items-center gap-2 px-6 py-3 bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200 dark:shadow-none transition-colors"
              >
                <Plus size={20} />
                إضافة عقار جديد
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <div key={property.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden group transition-colors">
                  <div className="aspect-video relative overflow-hidden">
                    <img
                      src={property.image}
                      alt={property.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <span className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md text-white",
                        property.type === 'sale' ? "bg-indigo-600/90 dark:bg-indigo-500/90" : "bg-emerald-600/90 dark:bg-emerald-500/90"
                      )}>
                        {property.type === 'sale' ? 'للبيع' : 'للإيجار'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">{property.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-4">
                      <MapPin size={14} />
                      {property.location}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800 transition-colors">
                      <div className="font-black text-indigo-600 dark:text-indigo-400">
                        {property.showPrice !== false ? `${property.price.toLocaleString()} ر.س` : 'السعر مخفي'}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStartEdit(property)}
                          className="p-2 text-slate-400 dark:text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-xl transition-all"
                          title="تعديل"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => handleDuplicateProperty(property)}
                          className="p-2 text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-xl transition-all"
                          title="تكرار"
                        >
                          <Copy size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProperty(property.id)}
                          className="p-2 text-slate-400 dark:text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all"
                          title="حذف"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'banner' && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-[40px] p-8 md:p-12 border border-slate-100 dark:border-slate-800 shadow-sm transition-colors">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center transition-colors">
                  <Megaphone size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">إدارة البنر الإعلاني</h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400">بنر رقم 5 - يظهر في السلايدر الرئيسي</p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Toggle */}
                <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-3xl transition-colors">
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">حالة البنر</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{banner5Visible ? 'البنر ظاهر للزوار' : 'البنر مخفي'}</p>
                  </div>
                  <button
                    onClick={() => setBanner5Visible(!banner5Visible)}
                    className={cn(
                      "relative w-16 h-8 rounded-full transition-all",
                      banner5Visible ? "bg-indigo-600" : "bg-slate-300"
                    )}
                  >
                    <span className={cn(
                      "absolute top-1 w-6 h-6 bg-white rounded-full transition-all shadow",
                      banner5Visible ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>

                {/* Image */}
                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">صورة البنر</label>
                  {banner5Image && (
                    <div className="aspect-[3/1] rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-700 transition-colors">
                      <img src={banner5Image} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  <label className="flex items-center justify-center gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all">
                    <Upload size={20} className="text-slate-400 dark:text-slate-500" />
                    <span className="font-bold text-slate-500 dark:text-slate-400">{uploading ? 'جاري الرفع...' : 'رفع صورة البنر'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleBannerImageUpload}
                      disabled={uploading}
                    />
                  </label>
                </div>

                {/* Save */}
                <button
                  onClick={handleSaveBanner}
                  disabled={bannerSaving}
                  className="w-full py-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
                >
                  <Save size={20} />
                  {bannerSaving ? 'جاري الحفظ...' : 'حفظ الإعدادات'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Property Form Modal */}
      <AnimatePresence>
        {(editingProperty || isAddingProperty) && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[40px] p-8 md:p-12 shadow-2xl border dark:border-slate-800 transition-colors"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  {editingProperty ? 'تعديل العقار' : 'إضافة عقار جديد'}
                </h2>
                <button
                  onClick={() => { setEditingProperty(null); setIsAddingProperty(false); }}
                  className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSaveProperty} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">عنوان العقار</label>
                    <input
                      name="title"
                      defaultValue={editingProperty?.title}
                      required
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                      placeholder="مثال: شقة استوديو للعزاب"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">الموقع</label>
                    <input
                      name="location"
                      defaultValue={editingProperty?.location}
                      required
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                      placeholder="الرياض، حي الملقا"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">السعر (ر.س)</label>
                    <input
                      name="price"
                      type="number"
                      defaultValue={editingProperty?.price}
                      required
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">نوع العرض</label>
                    <select
                      name="type"
                      defaultValue={editingProperty?.type || 'sale'}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none transition-all dark:text-white"
                    >
                      <option value="sale" className="dark:bg-slate-900">للبيع</option>
                      <option value="rent" className="dark:bg-slate-900">للإيجار</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">التصنيف</label>
                    <select
                      name="category"
                      defaultValue={editingProperty?.category || 'apartment'}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none transition-all dark:text-white"
                    >
                      <option value="apartment" className="dark:bg-slate-900">شقة</option>
                      <option value="villa" className="dark:bg-slate-900">فيلا</option>
                      <option value="office" className="dark:bg-slate-900">مكتب</option>
                      <option value="land" className="dark:bg-slate-900">أرض</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">النوع الفرعي</label>
                    <input
                      name="subType"
                      defaultValue={editingProperty?.subType}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                      placeholder="مثال: دبلكس، استوديو"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">غرف النوم</label>
                    <input
                      name="bedrooms"
                      type="number"
                      defaultValue={editingProperty?.bedrooms || 0}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">دورات المياه</label>
                    <input
                      name="bathrooms"
                      type="number"
                      defaultValue={editingProperty?.bathrooms || 0}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">المساحة (م²)</label>
                    <input
                      name="area"
                      type="number"
                      defaultValue={editingProperty?.area}
                      required
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">رقم العقار</label>
                    <input
                      name="propertyNumber"
                      defaultValue={editingProperty?.propertyNumber}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 dark:text-slate-300">رقم ترخيص الإعلان</label>
                    <input
                      name="licenseNumber"
                      defaultValue={editingProperty?.licenseNumber}
                      className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                    />
                  </div>
                  <div className="flex items-center gap-3 pt-10">
                    <input
                      type="checkbox"
                      name="showPrice"
                      id="showPrice"
                      defaultChecked={editingProperty?.showPrice !== false}
                      className="w-6 h-6 rounded-lg text-indigo-600 focus:ring-indigo-500 border-slate-200 dark:border-slate-700 dark:bg-slate-800"
                    />
                    <label htmlFor="showPrice" className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                      عرض السعر للعملاء
                      {editingProperty?.showPrice === false ? <EyeOff size={16} className="text-slate-400 dark:text-slate-500" /> : <Eye size={16} className="text-indigo-500 dark:text-indigo-400" />}
                    </label>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">الوصف</label>
                  <textarea
                    name="description"
                    defaultValue={editingProperty?.description}
                    required
                    rows={4}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none transition-all dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">المزايا والمرافق (افصل بينها بفاصلة)</label>
                  <input
                    name="features"
                    defaultValue={editingProperty?.features.join(', ')}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all dark:text-white"
                    placeholder="مثال: مؤثث، دخول ذكي، قريب من المترو"
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300">صور العقار</label>
                  <label className="flex items-center justify-center gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-indigo-300 dark:hover:border-indigo-500 transition-all mb-4">
                    <Upload size={20} className="text-slate-400 dark:text-slate-500" />
                    <span className="font-bold text-slate-500 dark:text-slate-400">{uploading ? 'جاري الرفع...' : 'رفع صور من الجهاز'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileUpload}
                      disabled={uploading}
                    />
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {propertyImages.map((img, index) => (
                      <div key={index} className="aspect-square relative rounded-3xl overflow-hidden group border dark:border-slate-800">
                        <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                          <button type="button" onClick={() => handleRemoveImage(index)} className="p-2 bg-red-500 text-white rounded-xl">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        {index === 0 && (
                          <span className="absolute top-2 right-2 px-2 py-1 bg-indigo-600 dark:bg-indigo-500 text-white text-xs rounded-lg font-bold">رئيسية</span>
                        )}
                      </div>
                    ))}
                    {propertyImages.length === 0 && (
                      <div className="aspect-square bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-3xl flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 transition-all">
                        <ImageIcon size={32} className="text-slate-300 dark:text-slate-600" />
                        <span className="text-xs font-bold mt-2 text-center px-2">ارفع صور من الجهاز</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-indigo-600 dark:bg-indigo-500 text-white rounded-2xl font-bold hover:bg-indigo-700 dark:hover:bg-indigo-600 transition-all shadow-lg shadow-indigo-200 dark:shadow-none flex items-center justify-center gap-2 transition-colors"
                  >
                    <Save size={20} />
                    حفظ التغييرات
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEditingProperty(null); setIsAddingProperty(false); }}
                    className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-2xl font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
