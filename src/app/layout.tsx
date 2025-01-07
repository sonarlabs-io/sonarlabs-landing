"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import { NavigationBar } from '@/components/NavigationBar';
import { getThemeStyles } from '@/styles/components';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

const RootLayoutContent = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  const themeStyles = getThemeStyles(theme);
  const pathname = usePathname();

  const isAuthPage = pathname === '/';

  return (
    <div className={`${themeStyles.layout.main} max-w-screen overflow-x-hidden`}>
      {!isAuthPage && <NavigationBar />}
      <main className={`min-h-screen w-full px-4 sm:px-6 lg:px-8 ${
        !isAuthPage ? 'pt-[calc(var(--navigation-height)+1rem)] sm:pt-[calc(var(--navigation-height)+1.5rem)] lg:pt-[calc(var(--navigation-height)+2rem)]' : ''
      }`}>
        {children}
      </main>
    </div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <ThemeProvider>
          <RootLayoutContent>    
            {children}
          </RootLayoutContent>  
        </ThemeProvider>
      </body>
    </html>
  );
}