import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ErrorBoundary } from "@/components/error-boundary";

export const metadata: Metadata = {
  title: "Power College POC-AMS",
  description:
    "Academic management and ETA compliance operations console for Power Online College, Finote Selam, Ethiopia.",
  keywords: [
    "Power College",
    "POC-AMS",
    "Academic Management",
    "ETA Compliance",
    "Online Education",
    "Ethiopia",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <ErrorBoundary>
          <Providers>{children}</Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}