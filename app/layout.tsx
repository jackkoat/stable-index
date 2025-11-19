import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Stable Index - World Risk Assessment Platform",
  description: "Real-time country risk assessment and stability index platform with comprehensive data visualization and analysis tools.",
  keywords: ["risk assessment", "stability index", "country risk", "financial analysis", "world map", "data visualization"],
  authors: [{ name: "Stable Index Team" }],
  creator: "Stable Index",
  publisher: "Stable Index",
  openGraph: {
    title: "Stable Index - World Risk Assessment Platform",
    description: "Real-time country risk assessment and stability index platform",
    type: "website",
    locale: "en_US",
    siteName: "Stable Index",
  },
  twitter: {
    card: "summary_large_image",
    title: "Stable Index - World Risk Assessment Platform",
    description: "Real-time country risk assessment and stability index platform",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-slate-100">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}