const fs = require('fs');
let code = fs.readFileSync('src/components/WebsiteGradientIcon.tsx', 'utf8');

const aboutBlock = `{type === "about" && (
            <>
              {/* 3D Horizontal Profile ID Card */}
              <rect x="15" y="25" width="70" height="50" rx="12" fill={\`url(#\${id}-grad-main)\`} />
              
              {/* White User Silhouette on the left */}
              <circle cx="36" cy="42" r="8" fill="#ffffff" />
              <path d="M 22 62 Q 22 52 36 52 Q 50 52 50 62 Z" fill="#ffffff" />
              
              {/* Lines on the right */}
              <rect x="56" y="40" width="20" height="4" rx="2" fill="#ffffff" opacity="0.8" />
              <rect x="56" y="50" width="20" height="4" rx="2" fill="#ffffff" opacity="0.8" />
            </>
          )}`;

code = code.replace(/\{type === "about" && \([\s\S]*?<\/>\s*\)\}/, aboutBlock);
fs.writeFileSync('src/components/WebsiteGradientIcon.tsx', code);
console.log("Patched about");
