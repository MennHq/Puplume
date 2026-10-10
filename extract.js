const fs = require('fs');

function extractSection(filePath, keepSection) {
    let content = fs.readFileSync(filePath, 'utf-8');
    
    const sections = [
        '{/* Hero Section */}',
        '{/* Features Section */}',
        '{/* Health Center Section */}',
        '{/* Academy Section */}',
        '{/* FAQ Section */}',
        '{/* Footer */}'
    ];
    
    let result = content;
    
    for (let i = 0; i < sections.length - 1; i++) {
        const secName = sections[i];
        if (secName !== keepSection) {
            const start = result.indexOf(secName);
            const end = result.indexOf(sections[i + 1]);
            if (start !== -1 && end !== -1) {
                result = result.substring(0, start) + result.substring(end);
            }
        }
    }
    
    fs.writeFileSync(filePath, result);
}

extractSection('src/app/features/page.tsx', '{/* Features Section */}');
extractSection('src/app/academy/page.tsx', '{/* Academy Section */}');
extractSection('src/app/health/page.tsx', '{/* Health Center Section */}');
