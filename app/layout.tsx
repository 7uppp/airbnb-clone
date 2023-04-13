import { Nunito } from 'next/font/google'
import Navbar from './components/Navbar/Navbar'
import './globals.css'
import ClientOnly from './components/ClientOnly'
import RegisterModel from './components/modals/RegisterModal'
import ToastProvider from './providers/ToastProvider'

export const metadata = {
  title: 'airbnb',
  description: 'airbnb clone ',
}

const font = Nunito({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToastProvider />
          <RegisterModel />
          <Navbar />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}
