/**
 * Type declarations for `eslint-plugin-drizzle`.
 *
 * The plugin ships as CommonJS, so these declarations use the `export =`
 * pattern: `import drizzle from 'eslint-plugin-drizzle'` resolves to the
 * module namespace (`module.exports`) through Node's CommonJS/ESM interop,
 * which is the import style ESLint recommends for flat configs. The named
 * exports (`rules`, `configs`, `meta`) and every exported type can be imported
 * directly as well.
 *
 * All types reference the official `eslint` types, so these declarations work
 * both with `@types/eslint` (ESLint v8) and with the types bundled with
 * ESLint v9 and later.
 */

import type { Linter, Rule } from 'eslint';

declare namespace plugin {
	/**
	 * Options object shared by the `enforce-delete-with-where` and
	 * `enforce-update-with-where` rules.
	 *
	 * @example
	 * ```ts
	 * // .eslintrc.json
	 * {
	 * 	"rules": {
	 * 		"drizzle/enforce-delete-with-where": ["error", { "drizzleObjectName": ["db"] }]
	 * 	}
	 * }
	 * ```
	 */
	export interface DrizzleWhereOptions {
		/**
		 * Name of the variable, object member, or class member your Drizzle instance
		 * is assigned to (like `db`), or an array of such names.
		 *
		 * When it's an empty array, the rule is applied to every object with a
		 * matching method name. This is useful when you have classes with a
		 * `delete`/`update` method that is not from Drizzle: pass the names you use
		 * for Drizzle objects so that only their method calls are checked.
		 */
		drizzleObjectName: string | string[];
	}

	/**
	 * The `enforce-delete-with-where` rule.
	 *
	 * Enforce that `delete` is used with the `.where()` clause to avoid deleting
	 * all the rows in a table.
	 */
	export interface EnforceDeleteWithWhereRule extends Rule.RuleModule {
		/** Options applied when the rule is enabled without any options. */
		readonly defaultOptions: readonly [DrizzleWhereOptions];
		readonly meta: {
			readonly type: 'problem';
			readonly docs: {
				readonly description: string;
				readonly url: string;
			};
			readonly messages: {
				readonly enforceDeleteWithWhere: string;
			};
			readonly fixable: 'code';
			readonly schema: [{
				readonly type: 'object';
				readonly properties: {
					readonly drizzleObjectName: {
						readonly type: ['string', 'array'];
					};
				};
				readonly additionalProperties: false;
			}];
		};
	}

	/**
	 * The `enforce-update-with-where` rule.
	 *
	 * Enforce that `update` is used with the `.where()` clause to avoid updating
	 * all the rows in a table.
	 */
	export interface EnforceUpdateWithWhereRule extends Rule.RuleModule {
		/** Options applied when the rule is enabled without any options. */
		readonly defaultOptions: readonly [DrizzleWhereOptions];
		readonly meta: {
			readonly type: 'problem';
			readonly docs: {
				readonly description: string;
				readonly url: string;
			};
			readonly messages: {
				readonly enforceUpdateWithWhere: string;
			};
			readonly fixable: 'code';
			readonly schema: [{
				readonly type: 'object';
				readonly properties: {
					readonly drizzleObjectName: {
						readonly type: ['string', 'array'];
					};
				};
				readonly additionalProperties: false;
			}];
		};
	}

	/**
	 * All rules provided by the plugin, keyed by rule name.
	 */
	export type DrizzleRules = {
		readonly 'enforce-delete-with-where': EnforceDeleteWithWhereRule;
		readonly 'enforce-update-with-where': EnforceUpdateWithWhereRule;
	};

	/**
	 * The configs provided by the plugin, keyed by config name.
	 */
	export type DrizzleConfigs = {
		/** Enables all non-deprecated rules. Currently equivalent to `recommended`. */
		readonly all: Linter.LegacyConfig;
		/** Enables the recommended rules. */
		readonly recommended: Linter.LegacyConfig;
	};

	/**
	 * Metadata about the plugin itself.
	 */
	export type DrizzlePluginMeta = {
		readonly name: string;
		readonly version: string;
	};

	/**
	 * The shape of the `eslint-plugin-drizzle` module.
	 */
	export type DrizzlePlugin = {
		readonly rules: DrizzleRules;
		readonly configs: DrizzleConfigs;
		readonly meta: DrizzlePluginMeta;
	};

	/**
	 * A rule entry for one of the `drizzle/enforce-*-with-where` rules, i.e.
	 * the value a `rules` record maps a drizzle rule name to:
	 * a severity, or a severity followed by the rule options.
	 *
	 * @example
	 * ```ts
	 * ['error', { drizzleObjectName: ['db'] }]
	 * ```
	 */
	export type DrizzleRuleEntry = Linter.RuleEntry<[DrizzleWhereOptions]>;

	/**
	 * A `rules` record that only accepts the rules of this plugin with their
	 * supported options.
	 */
	export type DrizzleRulesRecord = {
		readonly 'drizzle/enforce-delete-with-where': DrizzleRuleEntry;
		readonly 'drizzle/enforce-update-with-where': DrizzleRuleEntry;
	};

	/**
	 * A flat config object with the `drizzle` plugin registered, whose `rules`
	 * only accepts the rules of this plugin with their supported options.
	 *
	 * @example
	 * ```ts
	 * import drizzle from 'eslint-plugin-drizzle';
	 * import type { DrizzleFlatConfig } from 'eslint-plugin-drizzle';
	 *
	 * export const drizzleConfig: DrizzleFlatConfig = {
	 * 	plugins: { drizzle },
	 * 	rules: {
	 * 		'drizzle/enforce-delete-with-where': ['error', { drizzleObjectName: ['db'] }],
	 * 		'drizzle/enforce-update-with-where': ['error', { drizzleObjectName: ['db'] }],
	 * 	},
	 * };
	 * ```
	 */
	export type DrizzleFlatConfig = Linter.FlatConfig<DrizzleRulesRecord>;
}

declare const plugin: plugin.DrizzlePlugin;

export = plugin;
