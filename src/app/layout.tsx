import "./globals.css";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Felipe Figueiredo Portfolio",
  description: "Fullstack Developer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${poppins.className} bg-white dark:bg-zinc-800 text-[#2d2e32;] dark:text-white`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
