import { cpSync, writeFileSync } from 'node:fs';

// Keep relative declaration imports intact while giving require consumers a CJS module scope.
cpSync(new URL('../dist/types/', import.meta.url), new URL('../dist/types-cjs/', import.meta.url), { recursive: true });
writeFileSync(new URL('../dist/types-cjs/package.json', import.meta.url), '{"type":"commonjs"}\n');
