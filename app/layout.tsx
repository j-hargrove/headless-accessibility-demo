import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interpretation Fidelity",
  description: "One meaning model rendered across four interpreters.",
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}