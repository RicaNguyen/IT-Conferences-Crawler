import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{
          margin: 0,
          backgroundImage: `url(images/background.png)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "repeat",
        }}
      >
        {children}
      </body>
    </html>
  );
}
