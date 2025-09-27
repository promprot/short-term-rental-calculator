import type React from "react"
import type { Metadata } from "next"

import "./globals.css"
import { Suspense } from "react"

import { Inter, Roboto, Roboto_Mono, Source_Serif_4 } from "next/font/google"

// Initialize fonts with proper const assignments
const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
})

const robotoMono = Roboto_Mono({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-roboto-mono",
})

const sourceSerif = Source_Serif_4({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-source-serif",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "STR Financial Calculator - Short Term Rental ROI & Tax Benefits Analysis",
  description:
    "Professional short-term rental calculator for Airbnb and VRBO investments. Analyze cash flow, ROI, cap rates, and maximize tax benefits with 100% bonus depreciation, QBI deductions, and material participation strategies under Trump's 2025 tax reforms.",
  generator: "v0.app",
  keywords: [
    "short term rental",
    "airbnb calculator",
    "vrbo calculator",
    "rental property ROI",
    "cash flow analysis",
    "real estate investment",
    "STR tax benefits",
    "bonus depreciation",
    "QBI deduction",
    "material participation",
    "real estate tax savings",
    "Trump tax reforms 2025",
    "rental property depreciation",
    "high earner tax strategies",
  ],
  authors: [{ name: "STR Calculator" }],
  creator: "STR Calculator",
  publisher: "STR Calculator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-icon-57x57.png", sizes: "57x57", type: "image/png" },
      { url: "/apple-icon-60x60.png", sizes: "60x60", type: "image/png" },
      { url: "/apple-icon-72x72.png", sizes: "72x72", type: "image/png" },
      { url: "/apple-icon-76x76.png", sizes: "76x76", type: "image/png" },
      { url: "/apple-icon-114x114.png", sizes: "114x114", type: "image/png" },
      { url: "/apple-icon-120x120.png", sizes: "120x120", type: "image/png" },
      { url: "/apple-icon-144x144.png", sizes: "144x144", type: "image/png" },
      { url: "/apple-icon-152x152.png", sizes: "152x152", type: "image/png" },
      { url: "/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon.ico",
      },
      {
        rel: "icon",
        url: "/android-icon-36x36.png",
        sizes: "36x36",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-icon-48x48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-icon-72x72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-icon-96x96.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-icon-144x144.png",
        sizes: "144x144",
        type: "image/png",
      },
      {
        rel: "icon",
        url: "/android-icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
    ],
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "STR Financial Calculator - Short Term Rental ROI & Tax Benefits Analysis",
    description:
      "Professional short-term rental calculator for Airbnb and VRBO investments. Analyze cash flow, ROI, cap rates, and maximize tax benefits with 100% bonus depreciation and QBI deductions.",
    url: "https://str-calculator.vercel.app",
    siteName: "STR Financial Calculator",
    images: [
      {
        url: "/str-cal-preview.png",
        width: 1200,
        height: 630,
        alt: "STR Financial Calculator - Analyze your short-term rental investment potential",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "STR Financial Calculator - Short Term Rental ROI & Tax Benefits Analysis",
    description:
      "Professional short-term rental calculator for Airbnb and VRBO investments. Analyze cash flow, ROI, and maximize tax benefits with bonus depreciation.",
    images: ["/str-cal-preview.png"],
  },
  other: {
    "msapplication-TileColor": "#ffffff",
    "msapplication-config": "/browserconfig.xml",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "STR Financial Calculator",
    description:
      "Professional short-term rental calculator for Airbnb and VRBO investments. Analyze cash flow, ROI, cap rates, and maximize tax benefits with comprehensive expense tracking and tax optimization strategies.",
    url: "https://str-calculator.vercel.app",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "STR Calculator",
    },
    keywords:
      "short term rental calculator, airbnb calculator, vrbo calculator, rental property ROI, cash flow analysis, real estate investment, STR tax benefits, bonus depreciation, QBI deduction, material participation, real estate tax savings",
  }

  return (
    <html
      lang="en"
      className={`${inter.variable} ${roboto.variable} ${robotoMono.variable} ${sourceSerif.variable} antialiased`}
    >
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </body>
    </html>
  )
}
