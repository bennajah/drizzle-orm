/**
 * Compile-time regression tests for using `eslint-plugin-drizzle` in ESLint
 * configuration files: legacy (`.eslintrc`) configs and flat configs.
 */
import type { Linter } from 'eslint';
import drizzle from 'eslint-plugin-drizzle';
import type { DrizzleFlatConfig } from 'eslint-plugin-drizzle';

// The plugin's configs can be spread into a legacy (`.eslintrc`) config.
const legacyConfig: Linter.LegacyConfig = {
	...drizzle.configs.recommended,
	rules: {
		'drizzle/enforce-delete-with-where': 'error',
		'drizzle/enforce-update-with-where': ['error', { drizzleObjectName: ['db'] }],
	},
};

// Flat config: the plugin object can be registered under a name.
const flatConfig: Linter.FlatConfig = {
	plugins: {
		drizzle,
	},
	rules: {
		'drizzle/enforce-delete-with-where': ['error', { drizzleObjectName: ['db'] }],
		'drizzle/enforce-update-with-where': ['error', { drizzleObjectName: 'db' }],
	},
};

// Flat config with drizzle-specific rule typing: rule options are checked.
const drizzleFlatConfig: DrizzleFlatConfig = {
	plugins: {
		drizzle,
	},
	rules: {
		'drizzle/enforce-delete-with-where': ['error', { drizzleObjectName: ['db'] }],
		'drizzle/enforce-update-with-where': ['error', { drizzleObjectName: ['db'] }],
	},
};

// Severity-only entries are allowed.
const severityOnlyConfig: DrizzleFlatConfig = {
	plugins: {
		drizzle,
	},
	rules: {
		'drizzle/enforce-delete-with-where': 'error',
		'drizzle/enforce-update-with-where': 2,
	},
};

// Rules may be omitted entirely.
const noRulesConfig: DrizzleFlatConfig = {
	plugins: {
		drizzle,
	},
};

// Invalid rule options produce type errors.
const invalidOptionsConfig: DrizzleFlatConfig = {
	plugins: {
		drizzle,
	},
	rules: {
		// @ts-expect-error - drizzleObjectName must be a string or an array of strings
		'drizzle/enforce-delete-with-where': ['error', { drizzleObjectName: 123 }],
		// @ts-expect-error - unknown option properties are rejected
		'drizzle/enforce-update-with-where': ['error', { drizzleObjName: 'db' }],
	},
};

// Invalid severities produce type errors.
const invalidSeverityConfig: DrizzleFlatConfig = {
	plugins: {
		drizzle,
	},
	rules: {
		// @ts-expect-error - 'strict' is not a valid severity
		'drizzle/enforce-delete-with-where': 'strict',
	},
};

// The plugin's `all` config is interchangeable with `recommended`.
const allConfig: Linter.LegacyConfig = drizzle.configs.all;

export const eslintConfigs = [
	allConfig,
	drizzleFlatConfig,
	flatConfig,
	invalidOptionsConfig,
	invalidSeverityConfig,
	legacyConfig,
	noRulesConfig,
	severityOnlyConfig,
];
