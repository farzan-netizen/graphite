import type { Metadata, Viewport } from 'next'
import Script from 'next/script'
import { Manrope, Dancing_Script } from 'next/font/google'
import { headers } from 'next/headers'

import { SourcebusterInit } from '@/app/components/sourcebuster-init'
import { ErrorBoundary } from '@/app/providers/error-boundary'
import { StoreProvider } from '@/app/providers/store'
import { ThemeProvider } from '@/app/providers/theme'
import { HeaderKeys } from '@/constants/headers'
import '@/styles/globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-manrope',
})

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-dancing-script',
})

export const metadata: Metadata = {
  title: 'Bettermode',
}

export const viewport: Viewport = {
  interactiveWidget: 'resizes-content',
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const email = headersList.get(HeaderKeys.Email)

  return (
    <html
      lang="en"
      className={`${manrope.variable} ${dancingScript.variable}`}
      suppressHydrationWarning
    >
      <head>
        <Script src="/scripts/theme-init.js" strategy="beforeInteractive" />
        <SourcebusterInit />
      </head>
      <body suppressHydrationWarning>
        <div id="root">
          <ErrorBoundary>
            <StoreProvider email={email}>
              <ThemeProvider>{children}</ThemeProvider>
            </StoreProvider>
          </ErrorBoundary>
        </div>
      </body>
    </html>
  )
}
