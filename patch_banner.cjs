const fs = require('fs');
let code = fs.readFileSync('src/components/PageBanner.tsx', 'utf8');

const targetStr = '{/* Text content side-by-side with system icon */}';
const targetIndex = code.indexOf(targetStr);

if (targetIndex !== -1) {
    code = code.substring(0, targetIndex) + 
      `
            <div className="shrink-0 flex items-center justify-center">
              <WebsiteGradientIcon type={iconType as any} extraClass="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg transform transition-transform group-hover:scale-105 group-hover:-rotate-3" />
            </div>
            
            ` + code.substring(targetIndex);
    fs.writeFileSync('src/components/PageBanner.tsx', code);
    console.log("Patched successfully");
} else {
    console.log("Not found");
}
