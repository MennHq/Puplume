const fs = require('fs');
let code = fs.readFileSync('src/app/checkout/page.tsx', 'utf8');

code = code.replace(/id="paddle-inline-frame" className="w-full"/, 'className="paddle-inline-frame w-full"');
code = code.replace(
  'useEffect(() => {',
  'const initialized = useRef(false);\n  useEffect(() => {\n    if (initialized.current) return;\n    initialized.current = true;'
);

fs.writeFileSync('src/app/checkout/page.tsx', code);
