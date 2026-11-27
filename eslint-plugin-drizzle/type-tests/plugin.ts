/**
 * Compile-time regression tests for the TypeScript declarations shipped with
 * `eslint-plugin-drizzle`.
 *
 * The `paths` mapping in `tsconfig.json` resolves `eslint-plugin-drizzle` to
 * `../index.d.ts`, the same file consumers resolve through the `types` field
 * of `package.json`, so importing it here fails with TS7016 if the declarations
 * are ever dropped from the package.
 */
// The plugin can be default-imported and is fully typed, and its named
// exports are typed as well.
import drizzle, { configs, meta, rules } from 'eslint-plugin-drizzle';
import type {
	DrizzleConfigs,
	DrizzlePlugin,
	DrizzlePluginMeta,
	DrizzleRules,
	DrizzleWhereOptions,
	EnforceDeleteWithWhereRule,
	EnforceUpdateWithWhereRule,
} from 'eslint-plugin-drizzle';

const plugin: DrizzlePlugin = drizzle;

// The default export exposes the same members as the named exports.
const defaultRules: DrizzleRules = drizzle.rules;
const defaultConfigs: DrizzleConfigs = drizzle.configs;
const defaultMeta: DrizzlePluginMeta = drizzle.meta;

// The named exports are typed as well.
const namedRules: DrizzleRules = rules;
const namedConfigs: DrizzleConfigs = configs;
const namedMeta: DrizzlePluginMeta = meta;

// Plugin metadata.
const pluginName: string = drizzle.meta.name;
const pluginVersion: string = drizzle.meta.version;

// Rule names are recognized.
const deleteRule: EnforceDeleteWithWhereRule = drizzle.rules['enforce-delete-with-where'];
const updateRule: EnforceUpdateWithWhereRule = drizzle.rules['enforce-update-with-where'];

// @ts-expect-error - unknown rule names are rejected
drizzle.rules['enforce-insert-with-where'];

// Rule metadata is typed.
const deleteRuleType: 'problem' = deleteRule.meta.type;
const deleteRuleDescription: string = deleteRule.meta.docs.description;
const deleteRuleDocsUrl: string = deleteRule.meta.docs.url;
const deleteRuleMessage: string = deleteRule.meta.messages.enforceDeleteWithWhere;
const deleteRuleFixable: 'code' = deleteRule.meta.fixable;
const deleteRuleSchema: readonly [unknown] = deleteRule.meta.schema;

// @ts-expect-error - unknown message ids are rejected
deleteRule.meta.messages.enforceUpdateWithWhere;

// Default options are typed.
const defaultOptions: readonly [DrizzleWhereOptions] = deleteRule.defaultOptions;
const defaultDrizzleObjectName: string | string[] = deleteRule.defaultOptions[0].drizzleObjectName;

// Rule options are type-checked.
const validStringOption: DrizzleWhereOptions = { drizzleObjectName: 'db' };
const validArrayOption: DrizzleWhereOptions = { drizzleObjectName: ['db', 'database'] };

// @ts-expect-error - drizzleObjectName must be a string or an array of strings
const invalidOptionValue: DrizzleWhereOptions = { drizzleObjectName: 123 };

// @ts-expect-error - unknown option properties are rejected
const unknownOptionProperty: DrizzleWhereOptions = { drizzleObjName: 'db' };

// @ts-expect-error - a missing drizzleObjectName is rejected
const missingOptionProperty: DrizzleWhereOptions = {};

// The second rule shares the same option shape.
const updateRuleDefaultOptions: readonly [DrizzleWhereOptions] = updateRule.defaultOptions;
const updateRuleMessage: string = updateRule.meta.messages.enforceUpdateWithWhere;

export const pluginApi = {
	configs,
	defaultConfigs,
	defaultMeta,
	defaultOptions,
	defaultDrizzleObjectName,
	defaultRules,
	deleteRule,
	deleteRuleDescription,
	deleteRuleDocsUrl,
	deleteRuleFixable,
	deleteRuleMessage,
	deleteRuleSchema,
	deleteRuleType,
	drizzle,
	invalidOptionValue,
	missingOptionProperty,
	meta,
	namedConfigs,
	namedMeta,
	namedRules,
	plugin,
	pluginName,
	pluginVersion,
	rules,
	updateRule,
	updateRuleDefaultOptions,
	updateRuleMessage,
	validArrayOption,
	validStringOption,
	unknownOptionProperty,
};
