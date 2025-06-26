import type { Metadata } from "next";
import { Anton, Bebas_Neue, Geist, Geist_Mono, Lato, Lobster, Raleway, Roboto } from "next/font/google";
import { dark } from '@clerk/themes'
import NextTopLoader from 'nextjs-toploader';
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import {
  ClerkProvider,
} from '@clerk/nextjs'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const roboto=Raleway({
  variable:"--font-roboto",
  subsets:["latin"],
  
})
const bebas=Lobster({
  variable:"--font-bebas",
  subsets:["latin"],
  weight:"400"
})
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
 title:{
  template:"%s - Resume Builder",
  absolute:"Resume Builder"
 },
  description: "Build your resumes easily and for free..",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
    appearance={{
      baseTheme: dark,
    }}
    >
    <html lang="en">
      <body
        className={`${geistSans.variable} ${bebas.variable} ${roboto.variable} ${geistMono.variable} bg-gray-950 text-gray-50 antialiased relative`}
      >
        <div className="font-roboto absolute z-10 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <NextTopLoader 
          showSpinner={false}
        />
        {children}
        <Toaster />
      </body>
    </html>
    </ClerkProvider>
  );
}
