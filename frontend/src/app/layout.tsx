import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/features/auth/AuthContext";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Navbar } from "@/components/ui/navbar";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EventFlow - College Event Management",
  description: "Modern platform for college events management and attendance tracking",
  keywords: ["college events", "event management", "attendance tracking", "student events", "campus activities"],
  authors: [{ name: "EventFlow Team" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eventflow.com",
    title: "EventFlow - College Event Management",
    description: "Modern platform for college events management and attendance tracking",
    siteName: "EventFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "EventFlow - College Event Management",
    description: "Modern platform for college events management and attendance tracking",
    creator: "@eventflow",
  },
  metadataBase: new URL("https://eventflow.com"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-dvh flex flex-col bg-background text-foreground antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <AuthProvider>
            <div className="relative flex min-h-dvh flex-col">
              <Navbar />
              <div className="flex-1">
                <main>
                  {children}
                </main>
              </div>
            </div>
            <Toaster 
              position="bottom-right"
              toastOptions={{
                duration: 5000,
                style: {
                  background: 'var(--background)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                },
                success: {
                  iconTheme: {
                    primary: 'var(--success)',
                    secondary: 'var(--success-foreground)',
                  },
                },
                error: {
                  iconTheme: {
                    primary: 'var(--destructive)',
                    secondary: 'var(--destructive-foreground)',
                  },
                },
              }}
            />
            <Analytics />
            <SpeedInsights />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}