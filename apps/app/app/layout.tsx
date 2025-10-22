import "@workspace/ui/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SITE_CONFIG } from "@workspace/config/site";
import type { Metadata } from "next";
import { Birthstone, Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./Providers";

const fontSans = Geist({
	subsets: ["latin"],
	variable: "--font-sans",
});

const fontMono = Geist_Mono({
	subsets: ["latin"],
	variable: "--font-mono",
});

const fontBirthStone = Birthstone({
	weight: ["400"],
	subsets: ["latin"],
	variable: "--font-birthstone",
});

export const metadata: Metadata = {
	title: SITE_CONFIG.name,
	description: SITE_CONFIG.description,
	icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${fontSans.variable} ${fontMono.variable} ${fontBirthStone.variable} font-sans antialiased`}
			>
				<Providers>{children}</Providers>
				<Analytics />
			</body>
		</html>
	);
}
