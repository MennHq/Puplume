const fs = require('fs');
let code = fs.readFileSync('src/app/checkout/page.tsx', 'utf8');

code = code.replace(
  'const paddleRef = useRef<Paddle>();',
  'const paddleRef = useRef<Paddle>();\n  const checkoutContainer = useRef<HTMLDivElement>(null);'
);

code = code.replace(
  /frameTarget: 'paddle-inline-frame',/,
  "frameTarget: checkoutContainer.current || 'paddle-inline-frame',"
);

code = code.replace(
  /<div className="paddle-inline-frame w-full"><\/div>/,
  '<div ref={checkoutContainer} className="paddle-inline-frame w-full"></div>'
);

fs.writeFileSync('src/app/checkout/page.tsx', code);
