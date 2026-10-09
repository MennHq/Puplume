import { readFileSync, writeFileSync } from 'node:fs';

const logoPath = 'src/components/common/PupLumeLogo.tsx';
let logo = readFileSync(logoPath, 'utf8');

// Ensure the typography div uses the right font family explicitly
logo = logo.replace(
  /<div className={\`font-extrabold tracking-tight text-\[#2C211B\] \$\{textSize\}\`}>/,
  '<div className={`font-extrabold tracking-tight text-[#2C211B] ${textSize}`} style={{ fontFamily: "var(--font-grandstander), cursive" }}>'
);
logo = logo.replace(
  /<span className={\`font-semibold uppercase text-\[#766A63\] \$\{subSize\}\`}>/,
  '<span className={`font-semibold uppercase text-[#766A63] ${subSize}`} style={{ fontFamily: "var(--font-grandstander), cursive" }}>'
);

writeFileSync(logoPath, logo);
console.log('Forced Grandstander in Marketing PupLumeLogo');
