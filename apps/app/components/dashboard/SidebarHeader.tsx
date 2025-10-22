"use client";

import { useSuspenseQuery, useTRPC } from "@workspace/trpc/react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import {
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@workspace/ui/components/sidebar";
import { useIsMobile } from "@workspace/ui/hooks/use-mobile";
import { Building2, Check, ChevronsUpDown, MapPin, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export function AppSidebarHeader() {
	const trpc = useTRPC();
	const isMobile = useIsMobile();
	const router = useRouter();
	const params = useParams();
	const currentOrgSlug = params.orgSlug as string | undefined;
	const currentLocationSlug = params.locationSlug as string | undefined;

	const { data } = useSuspenseQuery(trpc.users.me.queryOptions());

	const currentOrg = data.organizations.find(
		(org) => org.slug === currentOrgSlug,
	);

	const hasMultipleLocations = (currentOrg?.Location.length || 0) > 1;

	const handleOrgSwitch = (newslug: string) => {
		router.push(`/dashboard/${newslug}`);
	};

	const handleLocationSwitch = (locationSlug: string) => {
		router.push(`/dashboard/${currentOrgSlug}/${locationSlug}`);
	};

	return (
		<SidebarHeader className="px-0">
			<SidebarMenu>
				<SidebarMenuItem>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<SidebarMenuButton
								size="lg"
								className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
									<Building2 className="size-4" />
								</div>
								<div className="grid flex-1 text-left text-sm leading-tight">
									<span className="truncate font-medium">
										{currentOrg?.name}
									</span>
									{hasMultipleLocations && currentLocationSlug ? (
										<span className="truncate text-muted-foreground text-xs">
											{
												currentOrg?.Location.find(
													(l) => l.slug === currentLocationSlug,
												)?.name
											}
										</span>
									) : (
										<span className="text-muted-foreground text-xs">
											Management
										</span>
									)}
								</div>
								<ChevronsUpDown className="ml-auto size-4" />
							</SidebarMenuButton>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							className="w-(--radix-dropdown-menu-trigger-width) min-w-72 rounded-lg"
							align="start"
							side={isMobile ? "bottom" : "right"}
							sideOffset={4}
						>
							{/* Organizations Section */}
							<DropdownMenuLabel className="text-muted-foreground text-xs">
								Organizations
							</DropdownMenuLabel>
							{data.organizations.map((org, index) => (
								<DropdownMenuItem
									key={index}
									onClick={() => handleOrgSwitch(org.slug)}
									className="gap-2 p-2"
								>
									<div className="flex size-6 items-center justify-center rounded-md border bg-muted">
										<Building2 className="size-3.5 shrink-0" />
									</div>
									<span className="flex-1">{org.name}</span>
									{org.slug === currentOrgSlug && !currentLocationSlug && (
										<Check className="size-4 text-primary" />
									)}
								</DropdownMenuItem>
							))}
							<DropdownMenuSeparator />
							<DropdownMenuItem
								className="gap-2 p-2"
								onClick={() => router.push("/dashboard/new")}
							>
								<div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
									<Plus className="size-4" />
								</div>
								<div className="font-medium text-muted-foreground">
									New organization
								</div>
							</DropdownMenuItem>

							{/* Locations Section (only if multiple locations) */}
							{hasMultipleLocations && (
								<>
									<DropdownMenuSeparator />
									<DropdownMenuLabel className="text-muted-foreground text-xs">
										Locations
									</DropdownMenuLabel>
									<DropdownMenuItem
										onClick={() => router.push(`/dashboard/${currentOrgSlug}`)}
										className="gap-2 p-2"
									>
										<Building2 className="size-4 text-muted-foreground" />
										<span className="flex-1">All Locations</span>
										{!currentLocationSlug && (
											<Check className="size-4 text-primary" />
										)}
									</DropdownMenuItem>
									{currentOrg?.Location.map((location) => (
										<DropdownMenuItem
											key={location.id}
											onClick={() => handleLocationSwitch(location.slug)}
											className="gap-2 p-2"
										>
											<MapPin className="size-4 text-muted-foreground" />
											<span className="flex-1">{location.name}</span>
											{location.slug === currentLocationSlug && (
												<Check className="size-4 text-primary" />
											)}
										</DropdownMenuItem>
									))}
								</>
							)}
						</DropdownMenuContent>
					</DropdownMenu>
				</SidebarMenuItem>
			</SidebarMenu>
		</SidebarHeader>
	);
}
