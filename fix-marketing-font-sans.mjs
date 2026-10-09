import { readFileSync, writeFileSync } from 'node:fs';

const globalsPath = 'src/app/globals.css';
let globals = readFileSync(globalsPath, 'utf8');

// Replace --font-sans mapping in @theme
globals = globals.replace(
  /--font-sans: var\(--font-geist-sans\);/,
  "--font-sans: var(--font-grandstander);"
);

writeFileSync(globalsPath, globals);
console.log('Fixed marketing globals.css to map font-sans to Grandstander');

// Also just completely strip font-sans from page.tsx to let the body inherit
const pagePath = 'src/app/page.tsx';
let page = readFileSync(pagePath, 'utf8');
page = page.replace(/ font-sans /g, ' ');
writeFileSync(pagePath, page);
console.log('Removed font-sans classes from marketing page.tsx');
