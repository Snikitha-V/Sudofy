import type React from "react"
import type { Metadata } from "next"
import { Roboto, Roboto_Mono } from "next/font/google"
import "./globals.css"

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] })
const robotoMono = Roboto_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sudofy – Type & Solve",
  description: "Modern Sudoku solver with cyberpunk aesthetics",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
