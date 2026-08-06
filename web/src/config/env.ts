// Central place for reading environment variables.
//
// Why bother instead of using `import.meta.env.VITE_API_URL` directly in components?
// Because if a variable is missing, a direct read gives you an empty string and your fetch
// silently hits the wrong URL. Funnelling every read through this file means a missing value
// blows up immediately, once, with a message that tells you which file to fix.

// Checks that a variable actually has a value, and throws a helpful error if it doesn't.
// Note the type is `string | undefined`: Vite replaces `import.meta.env.VITE_API_URL` with a
// literal string when it builds, so a variable that was blank at build time arrives here as ''.
// The `!value` check catches both cases — empty string and undefined are each falsy.
function required(name: string, value: string | undefined): string {
  if (!value) {
    // import.meta.env.MODE is the value of the --mode flag, so this error names the exact
    // file to open, e.g. "Check web/.env.production".
    throw new Error(
      `Missing env var ${name}. Check web/.env.${import.meta.env.MODE} — ` +
        `copy .env.example if that file doesn't exist yet.`,
    )
  }
  return value
}

// The app's config. Import this (`import { env } from './config/env'`) instead of ever
// touching import.meta.env elsewhere in the codebase.
export const env = {
  // Base URL of the backend API. Validated because a blank one breaks every network request,
  // so we want to hear about it at startup rather than on the first failed fetch.
  apiUrl: required('VITE_API_URL', import.meta.env.VITE_API_URL),

  // The environment name from the .env file. Deliberately NOT validated — a missing label is
  // harmless, so there's no reason to crash the whole app over it.
  nodeEnv: import.meta.env.VITE_NODE_ENV,

  // These two come free from Vite, no .env file needed:
  //   DEV  is true whenever the dev server is running (`vite`), in any mode.
  //   MODE is the raw --mode string: 'localhost' | 'development' | 'production'.
  // Re-exported here so components only ever import from one place.
  isDev: import.meta.env.DEV,
  mode: import.meta.env.MODE,
} as const
// `as const` marks the object deeply readonly, so nothing can reassign env.apiUrl at runtime.
