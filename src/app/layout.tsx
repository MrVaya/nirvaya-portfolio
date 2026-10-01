/* eslint-disable @next/next/no-page-custom-font -- External font links are an explicit design requirement. */
import type { Metadata } from "next";
import "./globals.css";

const description =
  "Portfolio of Nirvaya Ligal, a QA Engineer based in Pokhara, Nepal, focused on manual testing, API testing, Playwright automation, TypeScript, Postman, SQL, and software quality assurance.";

export const metadata: Metadata = {
  title: "Nirvaya Ligal | QA Engineer & Software Tester",
  description,
  openGraph: {
    title: "Nirvaya Ligal | QA Engineer & Software Tester",
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nirvaya Ligal | QA Engineer & Software Tester",
    description,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@500;600;700&family=Sora:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
