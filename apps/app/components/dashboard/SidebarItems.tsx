"use client";

import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import {
	BarChartIcon,
	BriefcaseIcon,
	CalendarIcon,
	FileTextIcon,
	LayoutDashboardIcon,
	MapPinIcon,
	PackageIcon,
	SettingsIcon,
	Users2Icon,
	UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

const orgRoutes = [
	{
		title: "Overview",
		url: "",
		icon: LayoutDashboardIcon,
	},
	{
		title: "Reporting",
		url: "/reporting",
		icon: BarChartIcon,
	},
	{
		title: "Locations",
		url: "/locations",
		icon: MapPinIcon,
	},
	{
		title: "Customers",
		url: "/customers",
		icon: UsersIcon,
	},
	{
		title: "Settings",
		url: "/settings",
		icon: SettingsIcon,
	},
];

// Location-level routes
const locationRoutes = [
	{
		title: "Dashboard",
		url: "",
		icon: LayoutDashboardIcon,
	},
	{
		title: "CRM",
		url: "/crm",
		icon: UsersIcon,
	},
	{
		title: "Schedule",
		url: "/schedule",
		icon: CalendarIcon,
	},
	{
		title: "Jobs",
		url: "/jobs",
		icon: BriefcaseIcon,
	},
	{
		title: "Customers",
		url: "/customers",
		icon: UsersIcon,
	},
	{
		title: "Invoices",
		url: "/invoices",
		icon: FileTextIcon,
	},
	{
		title: "Inventory",
		url: "/inventory",
		icon: PackageIcon,
	},
	{
		title: "Team",
		url: "/team",
		icon: Users2Icon,
	},
	{
		title: "Settings",
		url: "/settings",
		icon: SettingsIcon,
	},
];

export function SidebarItems() {
	const params = useParams();
	const pathname = usePathname();
	const orgSlug = params.orgSlug as string;
	const locationSlug = params.locationSlug as string | undefined;

	// Determine context
	const isLocationView = !!locationSlug;
	const routes = isLocationView ? locationRoutes : orgRoutes;
	const basePath = isLocationView
		? `/dashboard/${orgSlug}/${locationSlug}`
		: `/dashboard/${orgSlug}`;

	return (
		<SidebarGroup className="border-t">
			<SidebarGroupLabel>
				{isLocationView ? "Operations" : "Management"}
			</SidebarGroupLabel>
			<SidebarGroupContent>
				<SidebarMenu>
					{routes.map((item) => {
						const href = `${basePath}${item.url}`;
						const isActive = pathname === href;

						return (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild isActive={isActive}>
									<Link href={href}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						);
					})}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
}
