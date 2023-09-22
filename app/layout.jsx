import '@styles/globals.css'
import Navbar from '@components/Navbar'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <Navbar className="bg-[#F5F5F6] top-0 absolute "/>
        <main className="py-14">
          {children}
        </main>
      </body>
    </html>
  )
}
