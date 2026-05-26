import './styles.css';

export const metadata = {
  title: 'Lead Management Dashboard',
  description: 'A comprehensive lead management dashboard for tracking leads, payments, and meetings.',
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
