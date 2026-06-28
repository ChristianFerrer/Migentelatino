import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/components/LocaleProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mi Gente Latino — Latin American groceries in Austria",
  description:
    "Authentic Latin American groceries, snacks and flavors, delivered across Austria. Join the waitlist for early access and a launch-day discount.",
  keywords: [
    "latino store Austria",
    "Latin American groceries Vienna",
    "productos latinos Austria",
    "lateinamerikanische Lebensmittel Österreich",
    "Mi Gente Latino",
  ],
  openGraph: {
    title: "Mi Gente Latino — The taste of home, in Austria",
    description:
      "Authentic Latin American groceries delivered across Austria. Join the waitlist.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#FF7A33",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body>
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
