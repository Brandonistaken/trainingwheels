import type { Metadata } from "next";
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const heading = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading-raw",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-body-raw",
});

export const metadata: Metadata = {
  title: "TrainingWheels — Employee Onboarding Made Simple",
  description: "Create interactive, AI-powered training walkthroughs for new employees. Upload manuals, build guided tours, and track progress — all in one place.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
