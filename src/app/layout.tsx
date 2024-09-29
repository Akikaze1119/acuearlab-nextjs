import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ConfigProvider } from 'antd';
import { QuizProvider } from '@/context/QuizContext';
import { AntdRegistry } from '@ant-design/nextjs-registry';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'AcuEarLab',
  description:
    'A listening quiz app designed to help users distinguish between similar sounds accurately.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#2cb0c7',
            },
            components: {
              Layout: {
                bodyBg: '#fff',
              },
            },
          }}
        >
          <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <AntdRegistry>
              <QuizProvider>{children}</QuizProvider>
            </AntdRegistry>
          </body>
        </ConfigProvider>
      </html>
    </ClerkProvider>
  );
}
