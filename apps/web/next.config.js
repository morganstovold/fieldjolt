import "./env.js";

/** @type {import('next').NextConfig} */
const config = {
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
