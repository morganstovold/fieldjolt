export function getTimezoneFromState(state: string | undefined): string {
	if (!state) return "America/New_York"; // Default to ET

	const timezones: Record<string, string> = {
		// Eastern
		CT: "America/New_York",
		DE: "America/New_York",
		FL: "America/New_York",
		GA: "America/New_York",
		ME: "America/New_York",
		MD: "America/New_York",
		MA: "America/New_York",
		NH: "America/New_York",
		NJ: "America/New_York",
		NY: "America/New_York",
		NC: "America/New_York",
		OH: "America/New_York",
		PA: "America/New_York",
		RI: "America/New_York",
		SC: "America/New_York",
		VT: "America/New_York",
		VA: "America/New_York",
		WV: "America/New_York",
		// Central
		AL: "America/Chicago",
		AR: "America/Chicago",
		IL: "America/Chicago",
		IN: "America/Chicago",
		IA: "America/Chicago",
		KS: "America/Chicago",
		KY: "America/Chicago",
		LA: "America/Chicago",
		MN: "America/Chicago",
		MS: "America/Chicago",
		MO: "America/Chicago",
		NE: "America/Chicago",
		ND: "America/Chicago",
		OK: "America/Chicago",
		SD: "America/Chicago",
		TN: "America/Chicago",
		TX: "America/Chicago",
		WI: "America/Chicago",
		// Mountain
		AZ: "America/Phoenix", // No DST
		CO: "America/Denver",
		ID: "America/Denver",
		MT: "America/Denver",
		NM: "America/Denver",
		UT: "America/Denver",
		WY: "America/Denver",
		// Pacific
		CA: "America/Los_Angeles",
		NV: "America/Los_Angeles",
		OR: "America/Los_Angeles",
		WA: "America/Los_Angeles",
		// Alaska & Hawaii
		AK: "America/Anchorage",
		HI: "Pacific/Honolulu",
	};

	return timezones[state.toUpperCase()] || "America/New_York";
}
