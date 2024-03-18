import './globals.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Script from 'next/script';
import Hedaer_Componet from './componets/header';
import Footer_Componets from './componets/footer';

export const metadata = {
  title: 'E-Commerce',
  description: 'Created By Keyur Pansuriya',
  icons: {
    icon: '/meta_logo.png'
  }

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Hedaer_Componet />
        </header>
        <main>
          {children}
        </main>
        <footer>
          <Footer_Componets />
        </footer>
      </body>
      <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"></Script>
      <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></Script>
    </html>
  )
}
