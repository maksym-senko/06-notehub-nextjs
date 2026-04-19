import type { Metadata } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Next.js Note Application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <TanStackProvider>
          <div className="app-container">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </TanStackProvider>

        <div id="modal-root"></div>
      </body>
    </html>
  );
}