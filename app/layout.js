import './globals.css';

export const metadata = {
  title: 'U.S.A.S.F. — United States Air Sports Federation',
  description: 'The future of human flight. Uniting the world of air sports through speed, discipline and freedom.',
  openGraph: {
    title: 'U.S.A.S.F. — United States Air Sports Federation',
    description: 'Where human flight evolves. One Federation. One Sky.',
    type: 'website',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FFFFFF',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ background: '#FFFFFF', color: '#0A0A0A' }}>
        {children}
      </body>
    </html>
  );
}
