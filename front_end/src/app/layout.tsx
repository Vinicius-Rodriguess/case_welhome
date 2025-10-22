import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Case Welhome",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>
        <Header/>
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
