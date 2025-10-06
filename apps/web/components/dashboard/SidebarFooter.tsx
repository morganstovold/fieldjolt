"use client";

import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "@workspace/ui/components/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
	SidebarFooter,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@workspace/ui/components/sidebar";
import {
	BadgeQuestionMarkIcon,
	CogIcon,
	CreditCardIcon,
	EllipsisVerticalIcon,
	LogOutIcon,
	MoonIcon,
	UserCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const items = [
	{
		title: "Settings",
		url: "/dashboard/settings",
		icon: CogIcon,
	},
	{
		title: "Get Help",
		url: "/help",
		icon: BadgeQuestionMarkIcon,
	},
];

import type { ValidSession } from "@workspace/auth";
import { authClient } from "@workspace/auth/client";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { Switch } from "@workspace/ui/components/switch";

export function AppSidebarFooter({ session }: { session: ValidSession }) {
	const { isMobile } = useSidebar();
	const router = useRouter();
	const { resolvedTheme, setTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	return (
		<SidebarFooter>
			<SidebarMenu>
				{items.map((item) => (
					<SidebarMenuItem key={item.title}>
						<SidebarMenuButton asChild>
							<Link href={item.url}>
								<item.icon />
								<span>{item.title}</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
				<SidebarMenuItem className="group-data-[collapsible=icon]:hidden">
					<SidebarMenuButton asChild>
						{/** biome-ignore lint/a11y/noLabelWithoutControl: false */}
						<label>
							<MoonIcon />
							<span>Dark Mode</span>
							{mounted ? (
								<Switch
									className="ml-auto"
									checked={resolvedTheme !== "light"}
									onCheckedChange={() =>
										setTheme(resolvedTheme === "dark" ? "light" : "dark")
									}
								/>
							) : (
								<Skeleton className="ml-auto h-4 w-8 rounded-full" />
							)}
						</label>
					</SidebarMenuButton>
				</SidebarMenuItem>
			</SidebarMenu>
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<Avatar className="h-8 w-8 rounded-lg">
									<AvatarImage
										src={session.user.image || undefined}
										alt={session.user.name}
									/>
									<AvatarFallback className="rounded-lg">
										{session.user.name
											?.split(" ")
											.map((name) => name[0])
											.join("")}
									</AvatarFallback>
								</Avatar>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{session.user.name}
									</span>
									<span className="truncate text-muted-foreground text-xs">
										{session.user.email}
									</span>
								</div>
								<EllipsisVerticalIcon className="ml-auto size-4" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
							side={isMobile ? "bottom" : "right"}
							align="end"
							sideOffset={4}
						>
							<DropdownMenuLabel className="p-0 font-normal">
								<div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
									<Avatar className="h-8 w-8 rounded-lg">
										<AvatarImage
											src={session.user.image || undefined}
											alt={session.user.name}
										/>
										<AvatarFallback className="rounded-lg">
											{session.user.name
												?.split(" ")
												.map((name) => name[0])
												.join("")}
										</AvatarFallback>
									</Avatar>
									<div className="grid flex-1 text-left text-sm leading-tight">
										<span className="truncate font-medium">
											{session.user.name}
										</span>
										<span className="truncate text-muted-foreground text-xs">
											{session.user.email}
										</span>
									</div>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuGroup>
								<DropdownMenuItem asChild>
									<Link href="/dashboard/settings">
										<UserCircleIcon /> Account
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/dashboard/settings/billing">
										<CreditCardIcon />
										Billing
									</Link>
								</DropdownMenuItem>
								<DropdownMenuItem asChild>
									<Link href="/help">
										<BadgeQuestionMarkIcon />
										Help
									</Link>
								</DropdownMenuItem>
							</DropdownMenuGroup>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={async () => {
									await authClient.signOut({
										fetchOptions: {
											onSuccess: () => {
												router.push("/auth");
											},
										},
									});
								}}
							>
								<LogOutIcon />
								Log out
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarFooter>
	);
}
