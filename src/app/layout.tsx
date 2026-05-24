import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "شعار العقارية | CHAAR Real Estate",
  description: "شعار العقارية - معتمدة من الهيئة العامة للعقار، تقدم مجموعة متكاملة من الخدمات العقارية في مدينة جدة، متخصصة في مجال التسويق والوساطة العقارية",
  keywords: "عقارات جدة، فلل للبيع، شقق للبيع، عقارات السعودية، شعار العقارية",
  openGraph: {
    title: "شعار العقارية | CHAAR Real Estate",
    description: "شعار العقارية - معتمدة من الهيئة العامة للعقار",
    locale: "ar_SA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen bg-[#f5f0e8]">
        {children}
      </body>
    </html>
  );
}
