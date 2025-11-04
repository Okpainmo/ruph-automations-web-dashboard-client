import '@/app/styles/globals.css';
import type { Metadata } from 'next';
import { nunito_sans, poppins, lato } from './utils/font';
import { Toaster } from 'react-hot-toast';
import { RTKProvider } from '@/app/rtk-base/provider';

export const metadata: Metadata = {
  title: 'Ruph Automations: Admin Dashboard',
  description: 'Ruph Automations: Admin Dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className={`${nunito_sans} ${poppins} ${lato}`}>
      <body suppressHydrationWarning>
        <RTKProvider>
          {children}
          <Toaster position='top-right' />
        </RTKProvider>
      </body>
    </html>
  );
}
