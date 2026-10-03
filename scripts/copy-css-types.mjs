import { copyFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The stylesheet is copied by Vite as an opaque asset, so tsc never emits a
// declaration for it. Without this, `import "centplayer/style.css"` fails to
// resolve for consumers running TypeScript.
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

await copyFile(
    join(root, "src", "centplayer.css.d.ts"),
    join(root, "dist-lib", "centplayer.css.d.ts"),
);

// tsc emits extensionless relative imports, which are illegal in an ESM file.
// The package itself is "type": "module", so consumers resolving types with
// node16/nodenext would hit TS2834 on every declaration file. skipLibCheck
// swallows those errors and silently degrades every export to `any`, costing
// consumers all type checking on props. Marking the declaration tree as CJS
// makes those relative imports legal again.
await writeFile(
    join(root, "dist-lib", "types", "package.json"),
    `${JSON.stringify({ type: "commonjs" }, null, 2)}\n`,
);
