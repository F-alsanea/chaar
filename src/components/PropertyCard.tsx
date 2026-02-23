import React from 'react';
import { motion } from 'motion/react';
import { MapPin, BedDouble, Bath, Square, ChevronLeft } from 'lucide-react';
import { Property } from '../types';
import { cn } from '../lib/utils';

interface PropertyCardProps {
  property: Property;
  onClick: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 property-card-shadow cursor-pointer transition-colors"
      onClick={() => onClick(property)}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md",
            property.type === 'sale' ? "bg-indigo-600/90 text-white" : "bg-emerald-600/90 text-white"
          )}>
            {property.type === 'sale' ? 'للبيع' : 'للإيجار'}
          </span>
          {property.isFeatured && (
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-400/90 text-amber-950 backdrop-blur-md">
              مميز
            </span>
          )}
        </div>
        <div className="absolute bottom-4 left-4">
          {property.showPrice !== false ? (
            <div className="px-3 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-indigo-900 dark:text-indigo-300 font-bold text-lg">
              {property.price.toLocaleString()} <span className="text-xs font-normal">ر.س</span>
            </div>
          ) : (
            <div className="px-3 py-1 rounded-lg bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-indigo-900 dark:text-indigo-300 font-bold text-sm">
              السعر عند التواصل
            </div>
          )}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-1 text-slate-400 dark:text-slate-500 text-xs mb-2">
          <MapPin size={14} />
          <span>{property.location}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {property.title}
        </h3>

        <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-4">
          <div className="flex gap-4">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <BedDouble size={16} className="text-slate-400 dark:text-slate-500" />
                <span className="text-sm font-medium">{property.bedrooms}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
                <Bath size={16} className="text-slate-400 dark:text-slate-500" />
                <span className="text-sm font-medium">{property.bathrooms}</span>
              </div>
            )}
            <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400">
              <Square size={16} className="text-slate-400 dark:text-slate-500" />
              <span className="text-sm font-medium">{property.area}م²</span>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/30 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all">
            <ChevronLeft size={18} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
