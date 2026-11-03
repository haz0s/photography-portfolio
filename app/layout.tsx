import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "./components/Navigation"
import Footer from "./components/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Judy Abdrabo — Creative Producer, Photographer & Videographer",
  description:
    "Creative Producer, Photographer and Videographer with 8+ years of experience creating campaigns, content and visual stories from Dubai for brands worldwide.",
  keywords:
    "photographer, photography, fashion photography, lifestyle photography, commercial photography, New York photographer",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&family=Bebas+Neue&display=swap" rel="stylesheet"></link>
      </head>
      <body className={inter.className}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
