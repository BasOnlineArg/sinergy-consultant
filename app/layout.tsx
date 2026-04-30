import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sinergy Consultant',
  description: 'Consultora Técnica Integral — Patagonia Argentina',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
