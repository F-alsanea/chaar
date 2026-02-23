import { z } from 'zod';

/** Validation schema for property ownership form (OwnYourProperty) */
export const submissionSchema = z.object({
    name: z.string().min(2, 'الاسم مطلوب').max(100, 'الاسم طويل جداً'),
    email: z.string().email('بريد إلكتروني غير صالح'),
    employer: z.string().min(2, 'جهة العمل مطلوبة').max(100),
    jobTitle: z.string().min(2, 'المسمى الوظيفي مطلوب').max(100),
    age: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(18, 'العمر يجب أن يكون 18 أو أكثر').max(120)),
    phone: z.string().min(10, 'رقم الجوال غير صالح').max(15).regex(/^[0-9+\-() ]+$/, 'رقم جوال غير صالح'),
    hasJointApplicants: z.boolean(),
    jointApplicantIncome: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(0)).optional().default(0),
    propertyType: z.string().min(1, 'نوع العقار مطلوب'),
    propertyValue: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(1, 'قيمة العقار مطلوبة')),
    district: z.string().min(1, 'الحي مطلوب').max(100),
    city: z.string().min(1, 'المدينة مطلوبة').max(100),
    area: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(1, 'المساحة مطلوبة')),
    monthlyIncome: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(1, 'الدخل الشهري مطلوب')),
    hasObligations: z.boolean(),
    obligationAmount: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(0)).optional().default(0),
    hasDownPayment: z.boolean(),
    downPaymentAmount: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(0)).optional().default(0),
    contactMethod: z.string().min(1),
});

/** Validation schema for interest form (InterestForm) */
export const interestSchema = z.object({
    property_id: z.string(),
    property_number: z.string().optional().default(''),
    property_title: z.string().optional().default(''),
    name: z.string().min(2, 'الاسم مطلوب').max(100),
    email: z.string().email('بريد إلكتروني غير صالح'),
    employer: z.string().min(2, 'جهة العمل مطلوبة').max(100),
    job_title: z.string().min(2, 'المسمى الوظيفي مطلوب').max(100),
    age: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(18).max(120)),
    phone: z.string().min(10).max(15).regex(/^[0-9+\-() ]+$/),
    income: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(0)),
    has_commitments: z.string(),
    commitment_amount: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(0)).optional().default(0),
    has_downpayment: z.string(),
    downpayment_amount: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(0)).optional().default(0),
    has_cosigner: z.string(),
    cosigner_income: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(0)).optional().default(0),
    contact_method: z.string().min(1),
    type: z.string().optional(),
});

/** Validation schema for property management (Dashboard) */
export const propertySchema = z.object({
    id: z.string().optional(),
    title: z.string().min(2, 'عنوان العقار مطلوب').max(200),
    price: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(0)),
    location: z.string().min(2, 'الموقع مطلوب').max(200),
    type: z.enum(['sale', 'rent']),
    category: z.enum(['apartment', 'villa', 'office', 'land']),
    bedrooms: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(0).max(50)),
    bathrooms: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(0).max(50)),
    area: z.union([z.string(), z.number()]).transform(Number).pipe(z.number().min(0)),
    description: z.string().min(2, 'الوصف مطلوب').max(2000),
    features: z.union([z.string().transform(s => s.split(',').map(f => f.trim()).filter(Boolean)), z.array(z.string())]),
    image: z.string().url().optional().default('https://picsum.photos/seed/new/800/600'),
    showPrice: z.boolean().optional().default(true),
    propertyNumber: z.string().max(50).optional().default(''),
    licenseNumber: z.string().max(50).optional().default(''),
    subType: z.string().max(100).optional().default(''),
});

/** Validation schema for login */
export const loginSchema = z.object({
    username: z.string().min(1, 'اسم المستخدم مطلوب').max(50),
    password: z.string().min(1, 'كلمة المرور مطلوبة').max(100),
});

/** Helper to validate and return errors */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: string[] } {
    const result = schema.safeParse(data);
    if (result.success) {
        return { success: true, data: result.data };
    }
    return {
        success: false,
        errors: result.error.errors.map(e => e.message),
    };
}
