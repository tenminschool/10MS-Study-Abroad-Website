import type { Metadata } from 'next';
import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata: Metadata = {
  title: '10 Minute School | Study Abroad',
  description: 'Explore universities, compare countries, and get free guidance — trusted by Bangladeshi students',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // Dark mode is temporarily disabled site-wide — always light,
          // regardless of any previously stored preference or OS setting.
          dangerouslySetInnerHTML={{
            __html: `(function () {
              try {
                document.documentElement.setAttribute('data-theme', 'light');
              } catch (e) {}
            })()`,
          }}
        />
        <script
          // Applied before first paint so Navbar and the matcher's
          // AppProvider (src/matcher/app/providers.tsx) agree on the
          // language from the first frame — both read data-lang, and
          // without this they'd desync whenever localStorage already
          // holds a saved preference on load.
          dangerouslySetInnerHTML={{
            __html: `(function () {
              try {
                var l = localStorage.getItem('lang') || 'en';
                document.documentElement.setAttribute('data-lang', l);
                document.documentElement.setAttribute('lang', l);
              } catch (e) {}
            })()`,
          }}
        />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
