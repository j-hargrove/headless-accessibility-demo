import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Headless Accessibility Demo",
  description:
    "A live demo showing how semantic structure supports accessibility and AI agent interpretation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}