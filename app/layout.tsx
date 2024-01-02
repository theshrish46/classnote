import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/providers/theme-provider";
import Navbar from "@/components/site-components/Navbar";

const inter = Inter({ subsets: ["latin"] });

// export const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, "font-sans")}>
        <main className="relative flex flex-col min-h-screen">
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            storageKey="blog-theme"
            enableSystem={false}
          >
            <Navbar />
            {children}
          </ThemeProvider>
        </main>
      </body>
    </html>
  );
}