import {  Coda } from "next/font/google";
import { AntdRegistry } from '@ant-design/nextjs-registry';

// Font Configurations
const inner = Coda({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={inner.className}>
        <AntdRegistry>{children}</AntdRegistry>
    </div>
  );
}
