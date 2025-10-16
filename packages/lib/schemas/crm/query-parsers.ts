import { createParser } from "nuqs/server";
import { z } from "zod";

export const filterOperators = [
	"equals",
	"not_equals",
	"contains",
	"not_contains",
	"starts_with",
	"ends_with",
	"greater_than",
	"less_than",
	"greater_than_or_equal",
	"less_than_or_equal",
	"between",
	"is_empty",
	"is_not_empty",
	"in",
	"not_in",
] as const;

export type FilterOperator = (typeof filterOperators)[number];

const filterItemSchema = z.object({
	field: z.string().min(1),
	operator: z.enum(filterOperators),
	value: z.any(),
	value2: z.any().optional(),
});

export type FilterItem = z.infer<typeof filterItemSchema>;

const sortItemSchema = z.object({
	field: z.string().min(1),
	direction: z.enum(["asc", "desc"]),
});

export type SortItem = z.infer<typeof sortItemSchema>;

// ============================================================================
// FILTER PARSER (Separate)
// ============================================================================

export const getFiltersParser = (validColumnIds?: Set<string>) => {
	return createParser<FilterItem[]>({
		parse: (value) => {
			try {
				const parsed = JSON.parse(value);
				const result = z.array(filterItemSchema).safeParse(parsed);

				if (!result.success) return [];

				// Validate column IDs if provided
				if (validColumnIds) {
					return result.data.filter((item) => validColumnIds.has(item.field));
				}

				return result.data;
			} catch {
				return [];
			}
		},

		serialize: (value) => JSON.stringify(value),

		eq: (a, b) => {
			if (a.length !== b.length) return false;
			return a.every((filterA, index) => {
				const filterB = b[index];
				if (!filterB) return false;
				return (
					filterA.field === filterB.field &&
					filterA.operator === filterB.operator &&
					JSON.stringify(filterA.value) === JSON.stringify(filterB.value) &&
					JSON.stringify(filterA.value2) === JSON.stringify(filterB.value2)
				);
			});
		},
	});
};

// ============================================================================
// SORT PARSER (Separate)
// ============================================================================

export const getSortParser = (validColumnIds?: Set<string>) => {
	return createParser<SortItem | null>({
		parse: (value) => {
			try {
				const parsed = JSON.parse(value);
				const result = sortItemSchema.safeParse(parsed);

				if (!result.success) return null;

				// Validate column ID if provided
				if (validColumnIds && !validColumnIds.has(result.data.field)) {
					return null;
				}

				return result.data;
			} catch {
				return null;
			}
		},

		serialize: (value) => JSON.stringify(value),

		eq: (a, b) => {
			if (a === null && b === null) return true;
			if (a === null || b === null) return false;
			return a.field === b.field && a.direction === b.direction;
		},
	});
};
