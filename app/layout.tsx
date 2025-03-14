import { Outfit, EB_Garamond, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import ClientLayout from "@/components/ClientLayout";
import Providers from "@/components/Providers";
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google'
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit"
});

const garamond = EB_Garamond({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: "--font-garamond"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair"
});

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "GSK - Gastroenterology Society of Kenya",
  description: "Advancing Digestive Health Care in Kenya",
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-192x192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512x512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={`${outfit.variable} ${garamond.variable} ${playfair.variable} font-garamond antialiased ${inter.className}`}>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
