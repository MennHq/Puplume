import { readFileSync, writeFileSync } from 'node:fs';

const layoutPath = 'src/app/layout.tsx';
let layout = readFileSync(layoutPath, 'utf8');

// Add Grandstander import
layout = layout.replace(
  /import { Geist, Geist_Mono } from "next\/font\/google";/,
  `import { Geist, Geist_Mono, Grandstander } from "next/font/google";

const grandstander = Grandstander({
  variable: "--font-grandstander",
  subsets: ["latin"],
});`
);

// Add grandstander variable to html tag
layout = layout.replace(
  /className={\`\$\{geistSans\.variable\} \$\{geistMono\.variable\} h-full antialiased\`}/,
  "className={`\\${geistSans.variable} \\${geistMono.variable} \\${grandstander.variable} h-full antialiased font-grandstander`}"
);

writeFileSync(layoutPath, layout);
console.log('Updated layout.tsx');

const globalsPath = 'src/app/globals.css';
let globals = readFileSync(globalsPath, 'utf8');

// Add font-grandstander to theme
globals = globals.replace(
  /--font-mono: var\(--font-geist-mono\);/,
  "--font-mono: var(--font-geist-mono);\n  --font-grandstander: var(--font-grandstander);\n"
);

// Replace body font-family
globals = globals.replace(
  /font-family: Arial, Helvetica, sans-serif;/,
  "font-family: var(--font-grandstander), cursive, sans-serif;"
);

writeFileSync(globalsPath, globals);
console.log('Updated globals.css');
