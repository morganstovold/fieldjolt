"use client";

import { TRPCReactProvider } from "@workspace/trpc/react";
import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<TRPCReactProvider>
			<NextThemesProvider
				attribute="class"
				defaultTheme="system"
				enableSystem
				disableTransitionOnChange
				enableColorScheme
			>
				{children}
				<Toaster />
			</NextThemesProvider>
		</TRPCReactProvider>
	);
}
