import "./src/env.js";

/** @type {import('next').NextConfig} */
const config = {
	transpilePackages: [
		"@workspace/ui",
		"@workspace/auth",
		"@workspace/db",
		"@workspace/trpc",
	],
};

export default config;
