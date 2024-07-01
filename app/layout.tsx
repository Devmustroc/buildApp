import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/providers/theme-provider";
import ConvexClerkProvider from "@/components/providers/convexClerkProvider";
import {Toaster} from "sonner";
import ModalProvider from "@/components/providers/modalProvider";
import {EdgeStoreProvider} from "@/lib/edgestore";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Buildapp",
  description: "The connected workspace for faster development & productivity",
  icons: {
    icon: [
      {
        media: "(prefer-color-scheme: light)",
        url: "/logo-light.svg",
        href: "/logo-light.svg",
      },
      {
        media: "(prefer-color-scheme: dark)",
        url: "/logo-dark.svg",
        href: "/logo-dark.svg",
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClerkProvider>
          <EdgeStoreProvider>
            <ThemeProvider
                attribute="class"
                defaultTheme={'system'}
                enableSystem={true}
                disableTransitionOnChange={true}
                storageKey="buildapp-theme"

              >
                <Toaster
                    position={"top-right"}

                />
                <ModalProvider />
                  {children}
              </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClerkProvider>
      </body>
    </html>
  );
}
