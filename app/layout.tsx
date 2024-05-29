import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import { ThemeModeProvider } from "@/components/ColorModeContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rica Nguyen",
  description: "IT CONFERENCES by Rica Nguyen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //Check system preference for dark mode

  return (
    <html lang="en">
      <body
        className={inter.className}
        // style={{
        //   margin: 0,
        //   // backgroundImage: `url(images/background.png)`,
        //   backgroundPosition: "center",
        //   backgroundSize: "cover",
        //   backgroundRepeat: "repeat",
        // }}
      >
        <AppRouterCacheProvider>
          <ThemeModeProvider>{children}</ThemeModeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
