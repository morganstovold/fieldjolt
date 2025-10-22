"use client";

import { ReactQueryDevtools, TRPCReactProvider } from "@workspace/trpc/react";
import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type * as React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<NuqsAdapter>
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
				<ReactQueryDevtools />
			</TRPCReactProvider>
		</NuqsAdapter>
	);
}
