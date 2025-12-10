import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// 👇 Dòng này CỰC KỲ QUAN TRỌNG, thiếu là lỗi giao diện ví
import "@rainbow-me/rainbowkit/styles.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IOTA Attendance App",
  description: "Ứng dụng điểm danh phi tập trung chạy trên IOTA EVM",
  icons: {
    icon: "/favicon.ico", // Bạn có thể thêm icon nếu muốn
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        {/* Bọc Providers để Web3 hoạt động ở mọi nơi */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
