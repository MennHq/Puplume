import { readFileSync, writeFileSync } from 'node:fs';

const pagePath = 'src/app/page.tsx';
let page = readFileSync(pagePath, 'utf8');

// Replace the headline
page = page.replace(
  /<motion\.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-tight leading-\[1\.1\] text-\[#2C211B\]">[\s\S]*?<\/motion\.h1>/,
  `<motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-[#2C211B]">
                Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5E3C] to-[#E9B89C]">puppy's</span> digital home.<br />Raise them without the stress.
              </motion.h1>`
);

// Replace the sub-headline
page = page.replace(
  /<motion\.p variants={fadeUp} className="text-lg md:text-xl text-\[#766A63\] max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">[\s\S]*?<\/motion\.p>/,
  `<motion.p variants={fadeUp} className="text-lg md:text-xl text-[#766A63] max-w-xl mx-auto md:mx-0 leading-relaxed font-medium">
                The ultimate puppy management app. Track routines, predict potty breaks, and get AI training advice instantly.
              </motion.p>`
);

writeFileSync(pagePath, page);
console.log('Updated hero headline and sub-headline to Option 2');
