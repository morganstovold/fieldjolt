import "./env.js";

/** @type {import('next').NextConfig} */
const config = {
	devIndicators: false,
	transpilePackages: [
		"@workspace/ui",
		"@workspace/auth",
		"@workspace/db",
		"@workspace/trpc",
		"@workspace/lib",
		"@workspace/config",
	],
};

export default config;
