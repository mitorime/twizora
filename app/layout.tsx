import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: '青空文庫をTwitterっぽく表示するやつ',
  description: '青空文庫の作品をTwitterのスレッド風に表示する非公式ビューア。ツイ廃向け。',
  openGraph: {
    title: '青空文庫をTwitterっぽく表示するやつ',
    description: '青空文庫の作品をTwitterのスレッド風に表示する非公式ビューア。ツイ廃向け。',
    url: 'https://aozora-twi.vercel.app',
    siteName: '青空文庫をTwitterっぽく表示するやつ',
    images: [
      {
        url: 'https://lh3.googleusercontent.com/pw/AP1GczOgYDPBofbDogGE0NXKrpiO8vlC64WNQmoPN4EuDF-OZpkudiPnorfEGdSZBxz1g2Fith4_ArOEAAHWJegfkfX102MyYyqF9Ntfjt7my-xT3cgs_4VtylpgB02MfKDgYaAG_SoszlKmlYwiVbpALkRn=w1200-h630-s-no',
        width: 1200,
        height: 630,
        alt: '青空文庫Twitter OGP',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '青空文庫をTwitterっぽく表示するやつ',
    description: '青空文庫の作品をTwitterのスレッド風に表示する非公式ビューア。ツイ廃向け。',
    images: ['https://lh3.googleusercontent.com/pw/AP1GczOgYDPBofbDogGE0NXKrpiO8vlC64WNQmoPN4EuDF-OZpkudiPnorfEGdSZBxz1g2Fith4_ArOEAAHWJegfkfX102MyYyqF9Ntfjt7my-xT3cgs_4VtylpgB02MfKDgYaAG_SoszlKmlYwiVbpALkRn=w1200-h630-s-no'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
