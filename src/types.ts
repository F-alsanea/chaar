export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: 'sale' | 'rent';
  category: 'apartment' | 'villa' | 'office' | 'land';
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  description: string;
  features: string[];
  isFeatured?: boolean;
  propertyNumber?: string;
  licenseNumber?: string;
  subType?: string;
  showPrice?: boolean;
}

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'فيلا فاخرة في حي النرجس',
    price: 3500000,
    location: 'الرياض، حي النرجس',
    type: 'sale',
    category: 'villa',
    bedrooms: 5,
    bathrooms: 6,
    area: 450,
    image: 'https://picsum.photos/seed/villa1/800/600',
    description: 'فيلا مودرن بتصميم عصري وتشطيبات فاخرة، تحتوي على مسبح ومصعد ومساحات خضراء واسعة.',
    features: ['مسبح', 'مصعد', 'تكييف مركزي', 'غرفة خادمة', 'كراج سيارة'],
    isFeatured: true,
    propertyNumber: '127',
    licenseNumber: '7200322211',
    subType: 'دبلكس',
  },
  {
    id: '2',
    title: 'شقة مودرن بإطلالة بحرية',
    price: 85000,
    location: 'جدة، أبحر الشمالية',
    type: 'rent',
    category: 'apartment',
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    image: 'https://picsum.photos/seed/apt1/800/600',
    description: 'شقة واسعة في برج سكني فاخر، تتميز بإطلالة مباشرة على البحر وقربها من الخدمات.',
    features: ['إطلالة بحرية', 'نادي صحي', 'أمن 24/7', 'موقف خاص'],
    isFeatured: true,
  },
  {
    id: '3',
    title: 'مكتب تجاري في قلب المدينة',
    price: 1200000,
    location: 'الرياض، طريق الملك فهد',
    type: 'sale',
    category: 'office',
    bedrooms: 0,
    bathrooms: 2,
    area: 120,
    image: 'https://picsum.photos/seed/office1/800/600',
    description: 'مكتب تجاري مجهز بالكامل في أحد أرقى الأبراج المكتبية، موقع استراتيجي للأعمال.',
    features: ['ألياف بصرية', 'قاعة اجتماعات', 'استقبال', 'مواقف قبو'],
  },
  {
    id: '4',
    title: 'فيلا كلاسيكية مع حديقة كبيرة',
    price: 4200000,
    location: 'الدمام، حي الشاطئ',
    type: 'sale',
    category: 'villa',
    bedrooms: 6,
    bathrooms: 5,
    area: 600,
    image: 'https://picsum.photos/seed/villa2/800/600',
    description: 'فيلا كلاسيكية واسعة جداً مناسبة للعائلات الكبيرة، تتميز بحديقة غناء ومجالس خارجية.',
    features: ['حديقة واسعة', 'ملحق خارجي', 'مجلس رجال', 'مطبخ خارجي'],
  },
  {
    id: '5',
    title: 'شقة استوديو للعزاب',
    price: 25000,
    location: 'الرياض، حي الملقا',
    type: 'rent',
    category: 'apartment',
    bedrooms: 1,
    bathrooms: 1,
    area: 55,
    image: 'https://picsum.photos/seed/studio1/800/600',
    description: 'استوديو عصري مؤثث بالكامل، مثالي للمهنيين الشباب، قريب من مراكز التسوق.',
    features: ['مؤثث', 'دخول ذكي', 'قريب من المترو'],
  },
  {
    id: '6',
    title: 'أرض سكنية زاوية',
    price: 1800000,
    location: 'الخبر، حي العزيزية',
    type: 'sale',
    category: 'land',
    bedrooms: 0,
    bathrooms: 0,
    area: 900,
    image: 'https://picsum.photos/seed/land1/800/600',
    description: 'أرض سكنية بموقع مميز على شارعين، جاهزة للبناء في منطقة هادئة وراقية.',
    features: ['شارعين', 'موقع زاوية', 'قريبة من المسجد'],
  }
];
