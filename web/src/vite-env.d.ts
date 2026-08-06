/// <reference types="vite/client" />
// ^ Pulls in Vite's own type definitions: import.meta.env.MODE, .DEV, .PROD, .BASE_URL,
//   plus the ability to import files like .svg and .css from TypeScript.
//   (tsconfig.app.json also lists "vite/client" in "types", so this line is belt-and-braces —
//   it keeps the file self-explanatory if that tsconfig setting ever changes.)

// Describes the custom variables from our .env.* files. TypeScript can't read those files,
// so listing them here is what gives `import.meta.env.VITE_API_URL` autocomplete and turns
// a typo like VITE_API_UR into a compile error instead of a silent `undefined` at runtime.
interface ImportMetaEnv {
  // Marked `readonly` because these are baked in at build time — assigning to one does nothing.
  readonly VITE_API_URL: string

  // A union type rather than plain `string`, so a typo'd environment name is caught by the
  // compiler and `switch` statements over it can be checked for completeness.
  readonly VITE_NODE_ENV: 'localhost' | 'development' | 'production'
}

// Attaches the interface above to `import.meta`, which is what makes `import.meta.env` typed.
// This is types-only: it disappears completely when the code is compiled.
interface ImportMeta {
  readonly env: ImportMetaEnv
}
