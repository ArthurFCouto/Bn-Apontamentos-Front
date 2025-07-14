import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { Roboto } from "next/font/google";
import { AppThemeProvider } from "@/contexts/theme";
import "./globals.css";
import { UserProvider } from "@/contexts/user";

export const metadata: Metadata = {
  applicationName: "BN Apontamentos",
  description: "Gerenciamento de apontamentos de produção.",
  icons: "/favicon.jpg",
  title: "BN - Apontamentos",
  keywords: ["Solar", "Energia", "Apontamento"],
  authors: [
    { name: "Arthur F Couto", url: "https://instagram.com/arthur_fcouto" },
  ],
  creator: "Arthur F Couto",
  publisher: "Arthur F Couto",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={roboto.variable}>
        <AppRouterCacheProvider>
          <AppThemeProvider>
            <UserProvider>{children}</UserProvider>
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
