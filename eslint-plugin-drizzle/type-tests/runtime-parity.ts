/**
 * Guards against drift between the runtime implementation in `src/` and the
 * published declarations in `index.d.ts`: every rule, config, and option
 * exposed at runtime must be represented in the declarations.
 */
import type { DrizzleConfigs, DrizzlePluginMeta, DrizzleRules, DrizzleWhereOptions } from 'eslint-plugin-drizzle';
import type { configs as runtimeConfigs, meta as runtimeMeta, rules as runtimeRules } from '../src/index';
import type { Options } from '../src/utils/options';

type AssertSame<TActual, TExpected> = TActual extends TExpected ? TExpected extends TActual ? true
	: never
	: never;

// Every rule registered at runtime is declared.
const rulesMatch: AssertSame<keyof typeof runtimeRules, keyof DrizzleRules> = true;

// Every config registered at runtime is declared.
const configsMatch: AssertSame<keyof typeof runtimeConfigs, keyof DrizzleConfigs> = true;

// The plugin meta shape matches the runtime shape.
const metaMatch: AssertSame<typeof runtimeMeta, DrizzlePluginMeta> = true;

// The declared rule options match the options consumed at runtime.
type RuntimeFirstOption = Options extends readonly [infer TOptions] ? TOptions : never;
const optionsMatch: AssertSame<RuntimeFirstOption['drizzleObjectName'], DrizzleWhereOptions['drizzleObjectName']> =
	true;

export const declarationsMatchRuntime = { configsMatch, metaMatch, optionsMatch, rulesMatch };
