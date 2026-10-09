import { readFileSync, writeFileSync } from 'node:fs';

const layoutPath = 'src/app/layout.tsx';
let layout = readFileSync(layoutPath, 'utf8');

// Fix the escaped interpolation!
layout = layout.replace(
  /className={\`\\\$\{geistSans\.variable\} \\\$\{geistMono\.variable\} \\\$\{grandstander\.variable\} h-full antialiased font-grandstander\`}/,
  'className={`${geistSans.variable} ${geistMono.variable} ${grandstander.variable} h-full antialiased font-grandstander`}'
);

writeFileSync(layoutPath, layout);
console.log('Fixed Next.js layout.tsx interpolation');

// Just to be absolutely certain, let's inject it into body too
layout = layout.replace(
  /<body className="min-h-full flex flex-col"/,
  '<body className={`${grandstander.className} min-h-full flex flex-col`}'
);
writeFileSync(layoutPath, layout);

