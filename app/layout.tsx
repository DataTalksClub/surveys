import React from "react"
import type { Metadata } from 'next'
import { Alegreya_Sans, Raleway } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const alegreyaSans = Alegreya_Sans({ 
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: '--font-sans'
});

const raleway = Raleway({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: '--font-title'
});

export const metadata: Metadata = {
  title: 'AI, Data Engineering & MLOps Survey Results 2025-2026',
  description: 'Survey results from professionals working with AI, data engineering, MLOps, and developer-focused AI tools.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${alegreyaSans.variable} ${raleway.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
