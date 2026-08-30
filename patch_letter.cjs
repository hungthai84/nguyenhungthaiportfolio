const fs = require('fs');
let code = fs.readFileSync('src/components/WebsiteGradientIcon.tsx', 'utf8');

const letterBlock = `{type === "letter" && (
            <>
              {/* 3D Envelope */}
              <path d="M 12 42 L 50 15 L 88 42 V 82 H 12 Z" fill={\`url(#\${id}-grad-main)\`} />
              {/* Emerging white sheet */}
              <rect x="24" y="22" width="52" height="34" rx="4" fill="#ffffff" />
              {/* Red heart on the letter */}
              <path d="M 50 42 C 50 42, 44 34, 40 38 C 36 42, 40 48, 50 54 C 60 48, 64 42, 60 38 C 56 34, 50 42, 50 42 Z" fill="#ef4444" />
              {/* Front envelope folds */}
              <path d="M 12 42 L 50 68 L 88 42" fill="none" stroke={\`url(#\${id}-grad-accent)\`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M 12 82 L 40 60" fill="none" stroke={\`url(#\${id}-grad-accent)\`} strokeWidth="4" strokeLinecap="round" />
              <path d="M 88 82 L 60 60" fill="none" stroke={\`url(#\${id}-grad-accent)\`} strokeWidth="4" strokeLinecap="round" />
            </>
          )}`;

code = code.replace(/\{type === "letter" && \([\s\S]*?<\/>\s*\)\}/, letterBlock);

fs.writeFileSync('src/components/WebsiteGradientIcon.tsx', code);
console.log("Patched letter icon");
