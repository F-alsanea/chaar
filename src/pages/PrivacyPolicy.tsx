import React from 'react';
import { motion } from 'motion/react';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden"
        >
          <div className="bg-indigo-600 p-12 text-white text-center">
            <Shield size={64} className="mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl font-black mb-4">سياسة الخصوصية</h1>
            <p className="text-indigo-100 text-lg">نحن نولي أهمية قصوى لحماية بياناتك الشخصية</p>
          </div>

          <div className="p-12 space-y-10 text-slate-700 leading-relaxed">
            <section>
              <p className="text-lg font-medium">
                تحترم شعار العقارية، خصوصية عملائها، وهدفنا هو حماية بياناتهم الشخصية. توضح هذه السياسات كيفية جمعنا واستخدامنا ومشاركة بياناتك الشخصية عندما تزور موقعنا الإلكتروني أو تستخدم خدماتنا.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <FileText size={18} />
                </div>
                جمع البيانات
              </h2>
              <p>نجمع بياناتك الشخصية عندما تزور موقعنا الإلكتروني أو تستخدم خدماتنا. قد تتضمن هذه البيانات ما يلي:</p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li>معلومات التعريف الشخصية، مثل اسمك وعنوان بريدك الإلكتروني وعنوانك ورقم هاتفك.</li>
                <li>معلومات الاتصال، مثل عنوان بريدك الإلكتروني وعنوانك ورقم هاتفك.</li>
                <li>معلومات الموقع الجغرافي، مثل عنوان بروتوكول الإنترنت (IP) الخاص بك.</li>
                <li>معلومات الاستخدام، مثل صفحات الويب التي تزورها والأنشطة التي تقوم بها على موقعنا الإلكتروني.</li>
                <li>المعلومات المالية، مثل دخلك الشهري والتزاماتك المالية.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <Lock size={18} />
                </div>
                البريد الإلكتروني الخاص بك
              </h2>
              <p>يتطلب منك موقعنا الإلكتروني تقديم عنوان بريد إلكتروني خاص بك. سنستخدم عنوان بريدك الإلكتروني الخاص للتواصل معك بشأن حسابك أو خدماتنا.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                  <Eye size={18} />
                </div>
                استخدام البيانات
              </h2>
              <p>نستخدم بياناتك الشخصية لأغراض مختلفة، بما في ذلك:</p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li>تزويدك بالخدمات التي تطلبها.</li>
                <li>تحسين موقعنا الإلكتروني وخدماتنا.</li>
                <li>التواصل معك بشأن المنتجات والخدمات الجديدة.</li>
                <li>حساب التمويل العقاري لك.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">مشاركة البيانات</h2>
              <p>قد نشارك بياناتك الشخصية مع الأطراف الثالثة التالية:</p>
              <ul className="list-disc list-inside space-y-2 pr-4">
                <li>مزودي الخدمات الذين يساعدوننا في تشغيل موقعنا الإلكتروني وخدماتنا.</li>
                <li>الجهات الحكومية أو التنظيمية التي تتطلب منا الكشف عن هذه المعلومات.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">حماية البيانات</h2>
              <p>نحن ملتزمون بحماية بياناتك الشخصية. نستخدم مجموعة متنوعة من التدابير الأمنية للحماية من الوصول غير المصرح به أو الاستخدام أو الكشف أو التغيير أو الإتلاف لبياناتك الشخصية.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">ملفات تعريف الارتباط</h2>
              <p>نحن نستخدم ملفات تعريف الارتباط على موقعنا الإلكتروني. ملفات تعريف الارتباط هي ملفات صغيرة يتم تخزينها على جهاز الكمبيوتر الخاص بك عندما تزور موقعنا الإلكتروني.</p>
              <p>تساعدنا ملفات تعريف الارتباط على تذكر معلوماتك وإعداد موقعنا الإلكتروني وفقًا لتفضيلاتك. يمكنك ضبط متصفحك لرفض ملفات تعريف الارتباط، ومع ذلك، قد يؤدي ذلك إلى عدم تمكنك من استخدام بعض الميزات على موقعنا الإلكتروني.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">الوصول إلى بياناتك وتعديلها</h2>
              <p>لديك الحق في الوصول إلى بياناتك الشخصية وتعديلها. يمكنك القيام بذلك عن طريق الاتصال بنا على <a href="mailto:Nadabroker@aol.com" className="text-indigo-600 font-bold">Nadabroker@aol.com</a> وسنرسل لك نسخة من بياناتك الشخصية عند الطلب، بما في ذلك عنوان بريدك الإلكتروني الخاص.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">الموافقة</h2>
              <p>باستخدام موقعنا الإلكتروني أو خدماتنا، فإنك توافق على سياسة الخصوصية هذه. إذا كنت لا توافق على هذه السياسة، فيرجى عدم استخدام موقعنا الإلكتروني أو خدماتنا.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">التعديلات</h2>
              <p>قد نقوم بتعديل سياسة الخصوصية هذه من وقت لآخر. إذا أجرينا أي تغييرات جوهرية، فسنخطرك بذلك من خلال نشر إشعار على موقعنا الإلكتروني.</p>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">الاتصال بنا</h2>
              <p>إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، فيرجى الاتصال بنا على <a href="mailto:Nadabroker@aol.com" className="text-indigo-600 font-bold">Nadabroker@aol.com</a></p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
