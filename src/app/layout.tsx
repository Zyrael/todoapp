import './globals.css';

import localFont from 'next/font/local';

import StoreProvider from '@/app/StoreProvider';

const roboto = localFont({
  src: '../fonts/Roboto-VariableFont_wdth,wght.ttf',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang='en' className={roboto.className}>
        <body>{children}</body>
      </html>
    </StoreProvider>
  );
}
