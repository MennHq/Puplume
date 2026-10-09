import { readFileSync, writeFileSync } from 'node:fs';

const pagePath = 'src/app/page.tsx';
let page = readFileSync(pagePath, 'utf8');

page = page.replace(
  /Raise the <span className="text-transparent bg-clip-text bg-gradient-to-r from-\[#8B5E3C\] to-\[#E9B89C\]">perfect<\/span> puppy,<br \/>without the stress\./,
  'Raise the <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5E3C] to-[#E9B89C]">perfect</span> puppy,<br />without the stress. To your puppy digital home.'
);

writeFileSync(pagePath, page);
console.log('Updated hero headline');
