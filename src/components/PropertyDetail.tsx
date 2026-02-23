import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, BedDouble, Bath, Square, CheckCircle2, Phone, Share2, MessageCircle } from 'lucide-react';
import { Property } from '../types';

interface PropertyDetailProps {
  property: Property;
  onClose: () => void;
  onInterest: () => void;
}

export const PropertyDetail: React.FC<PropertyDetailProps> = ({ property, onClose, onInterest }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 z-10 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full transition-all"
        >
          <X size={24} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-6 right-6 flex gap-2">
            <button className="p-3 bg-white/90 backdrop-blur-sm rounded-xl text-slate-700 hover:bg-white transition-all">
              <Share2 size={20} />
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="w-full md:w-1/2 overflow-y-auto p-8 md:p-10">
          <div className="flex items-center gap-2 mb-4">
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold ${
              property.type === 'sale' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'
            }`}>
              {property.type === 'sale' ? 'للبيع' : 'للإيجار'}
            </span>
            <span className="text-slate-400 text-sm">•</span>
            <span className="text-slate-500 font-medium">{property.category === 'apartment' ? 'شقة' : property.category === 'villa' ? 'فيلا' : property.category === 'office' ? 'مكتب' : 'أرض'}</span>
            {property.subType && (
              <>
                <span className="text-slate-400 text-sm">•</span>
                <span className="text-slate-500 font-medium">{property.subType}</span>
              </>
            )}
          </div>

          <h2 className="text-3xl font-bold text-slate-900 mb-2">{property.title}</h2>
          
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
            <div className="flex items-center gap-1 text-slate-500">
              <MapPin size={18} />
              <span>{property.location}</span>
            </div>
            {property.propertyNumber && (
              <div className="text-slate-500 text-sm">
                <span className="font-bold">رقم العقار:</span> {property.propertyNumber}
              </div>
            )}
            {property.licenseNumber && (
              <div className="text-slate-500 text-sm">
                <span className="font-bold">رقم ترخيص الاعلان:</span> {property.licenseNumber}
              </div>
            )}
          </div>

          <div className="text-4xl font-black text-indigo-600 mb-8">
            {property.showPrice !== false ? (
              <>
                {property.price.toLocaleString()} <span className="text-lg font-normal text-slate-400">ر.س</span>
              </>
            ) : (
              <span className="text-2xl">السعر عند التواصل</span>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {property.bedrooms > 0 && (
              <div className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center gap-1">
                <BedDouble className="text-indigo-500" />
                <span className="text-sm text-slate-500">غرف نوم</span>
                <span className="font-bold text-slate-900">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center gap-1">
                <Bath className="text-indigo-500" />
                <span className="text-sm text-slate-500">دورات مياه</span>
                <span className="font-bold text-slate-900">{property.bathrooms}</span>
              </div>
            )}
            <div className="p-4 bg-slate-50 rounded-2xl flex flex-col items-center gap-1">
              <Square className="text-indigo-500" />
              <span className="text-sm text-slate-500">المساحة</span>
              <span className="font-bold text-slate-900">{property.area}م²</span>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-lg font-bold text-slate-900 mb-3">الوصف</h4>
            <p className="text-slate-600 leading-relaxed">
              {property.description}
            </p>
          </div>

          <div className="mb-10">
            <h4 className="text-lg font-bold text-slate-900 mb-4">المزايا والمرافق</h4>
            <div className="grid grid-cols-2 gap-3">
              {property.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 size={18} className="text-emerald-500" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky bottom-0 bg-white pt-4 border-t border-slate-100 flex gap-4">
            <button
              onClick={onInterest}
              className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
            >
              أنا مهتم بالعقار
            </button>
            <a 
              href="tel:0544137950"
              className="p-4 bg-slate-100 text-slate-600 rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center"
            >
              <Phone size={24} />
            </a>
            <a 
              href={`https://wa.me/966544137950?text=${encodeURIComponent(`انا مهتم بـ ${property.title} عقار رقم ${property.propertyNumber || property.id}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl hover:bg-emerald-200 transition-all flex items-center justify-center"
            >
              <MessageCircle size={24} />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
