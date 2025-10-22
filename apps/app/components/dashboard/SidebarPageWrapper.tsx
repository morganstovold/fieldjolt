import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import { buttonVariants } from "@workspace/ui/components/button";
import { Separator } from "@workspace/ui/components/separator";
import { SidebarTrigger } from "@workspace/ui/components/sidebar";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

type SidebarPageWrapperProps = {
	breadcrumbs: { label: string; url?: string }[];
};

export function SidebarPageWrapper({ breadcrumbs }: SidebarPageWrapperProps) {
	return (
		<header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
			<div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
				<SidebarTrigger className="-ml-1" />
				<Separator
					orientation="vertical"
					className="mx-2 data-[orientation=vertical]:h-4"
				/>
				<Breadcrumb>
					<BreadcrumbList>
						{breadcrumbs.map((breadcrumb, index) => (
							<Fragment key={index}>
								{index > 0 && (
									<BreadcrumbSeparator className="mx-2 data-[orientation=vertical]:h-4" />
								)}
								<BreadcrumbItem>
									{breadcrumb.url ? (
										<BreadcrumbLink href={breadcrumb.url}>
											{breadcrumb.label}
										</BreadcrumbLink>
									) : (
										<BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
									)}
								</BreadcrumbItem>
							</Fragment>
						))}
					</BreadcrumbList>
				</Breadcrumb>
				<div className="ml-auto flex items-center gap-2">
					<Link
						href="https://github.com/morganstovold/fieldjolt"
						rel="noopener noreferrer"
						target="_blank"
						className={buttonVariants({
							variant: "ghost",
							size: "sm",
							className: "!hidden sm:!inline-flex cursor-default",
						})}
					>
						<GithubIcon className="size-4" />
						<span>Github</span>
					</Link>
				</div>
			</div>
		</header>
	);
}
