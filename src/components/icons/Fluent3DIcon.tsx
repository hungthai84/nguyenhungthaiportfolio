import React from "react";
import { fluent3DIcons, Fluent3DIconName } from "../../config/iconRegistry";
import WebsiteGradientIcon from "../WebsiteGradientIcon";

interface Fluent3DIconProps {
  name: Fluent3DIconName;
  size?: number;
  className?: string;
  alt?: string;
}

/**
 * Shared Fluent 3D Icon Component
 * Seamlessly delivers responsive, highly-polished 3D volumetric vector gradient icons
 * matching Microsoft Fluent Emoji design guidelines.
 */
export default function Fluent3DIcon({
  name,
  size,
  className = "",
  alt = ""
}: Fluent3DIconProps) {
  const mappedType = fluent3DIcons[name] || "projects";

  // If size is provided, compute style constraints
  const style = size ? { width: `${size}px`, height: `${size}px` } : undefined;

  return (
    <div 
      className={className} 
      style={style}
      aria-label={alt || `${name} Icon`}
      title={alt || undefined}
    >
      <WebsiteGradientIcon 
        type={mappedType as any} 
        extraClass="w-full h-full" 
      />
    </div>
  );
}
