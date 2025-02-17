import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/providers/themeProvider";
import ReactQuery from "@/providers/reactQueryProvider";
import { StorageProvider } from "@/providers/storageProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FTC FTA Dashboard",
  description: "Made with ❤️ by Shahar Ilany",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <ReactQuery>
            <StorageProvider>
              {/* <TooltipProvider> */}
              {children}
              {/* </TooltipProvider> */}
            </StorageProvider>
          </ReactQuery>
        </ThemeProvider>
      </body>
    </html>
  );
}
