import type { Metadata } from 'next'
import { Spinnaker } from 'next/font/google'
import './globals.css'
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const spinnaker = Spinnaker({ 
  subsets: ['latin'],
  weight: ['400'] 
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={spinnaker.className}>{children}</body>
    </html>
  )
}
