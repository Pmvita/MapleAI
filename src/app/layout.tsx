import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import SessionProvider from "@/components/providers/SessionProvider";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MapleAI - AI-Powered Enterprise SaaS Platform",
  description: "Comprehensive AI-powered SaaS platform for financial compliance, HR automation, workflow orchestration, and predictive analytics.",
  keywords: ["AI", "Enterprise", "SaaS", "Financial Compliance", "HR Automation", "Workflow Orchestration"],
  authors: [{ name: "MapleAI Team" }],
  creator: "MapleAI",
  publisher: "MapleAI Holdings",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://mapleai.com"),
  openGraph: {
    title: "MapleAI - AI-Powered Enterprise SaaS Platform",
    description: "Comprehensive AI-powered SaaS platform for financial compliance, HR automation, workflow orchestration, and predictive analytics.",
    url: "https://mapleai.com",
    siteName: "MapleAI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MapleAI - AI-Powered Enterprise SaaS Platform",
    description: "Comprehensive AI-powered SaaS platform for financial compliance, HR automation, workflow orchestration, and predictive analytics.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
