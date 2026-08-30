const fs = require('fs');
let code = fs.readFileSync('src/components/PageBanner.tsx', 'utf8');
code = code.replace(
  '{/* 3D System Card Graphic Badge */}                        {/* Text content side-by-side with system icon */}            <div className="flex-1 w-full space-y-1 sm:space-y-1.5 flex flex-col justify-center items-start text-left py-1">',
  `{/* 3D System Card Graphic Badge */}
            <div className="shrink-0 flex items-center justify-center">
              <WebsiteGradientIcon type={iconType as any} extraClass="w-16 h-16 md:w-20 md:h-20 drop-shadow-lg transform transition-transform group-hover:scale-105 group-hover:-rotate-3" />
            </div>
            
            {/* Text content side-by-side with system icon */}
            <div className="flex-1 w-full space-y-1 sm:space-y-1.5 flex flex-col justify-center items-start text-left py-1">`
);
fs.writeFileSync('src/components/PageBanner.tsx', code);
