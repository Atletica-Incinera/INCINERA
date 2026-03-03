"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

const DEFAULT_PLACEHOLDER = "https://res.cloudinary.com/dckupej8j/image/upload/v1772278580/placeholders/default.png";

interface AppImageProps extends Omit<ImageProps, "src"> {
  src?: string | null;
  fallbackSrc?: string;
  containerClassName?: string;
}

export function AppImage({
  src,
  alt,
  fallbackSrc = DEFAULT_PLACEHOLDER,
  className,
  containerClassName,
  ...props
}: AppImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc);
  const [hasError, setHasError] = useState(false);
  const [prevSrc, setPrevSrc] = useState(src);

  if (src !== prevSrc) {
    setPrevSrc(src);
    setImgSrc(src || fallbackSrc);
    setHasError(false);
  }

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(fallbackSrc);
    }
  };

  // Handle non-string or malformed src inputs defensively
  let finalSrcStr: string = DEFAULT_PLACEHOLDER;
  
  try {
    if (typeof imgSrc === "string" && imgSrc.trim() !== "") {
      // Basic check for valid-looking URL or relative path
      if (imgSrc.startsWith("/") || imgSrc.startsWith("http") || imgSrc.startsWith("blob:") || imgSrc.startsWith("data:")) {
        finalSrcStr = imgSrc;
      } else {
        console.warn(`[AppImage] Suspicious src detected: "${imgSrc}". Falling back to placeholder.`);
      }
    } else if (typeof fallbackSrc === "string" && fallbackSrc !== "") {
      finalSrcStr = fallbackSrc;
    }
  } catch (e) {
    console.error(`[AppImage] Error normalizing src:`, e);
  }

  // If it's a Cloudinary URL, we can use unoptimized=true to serve directly from their CDN
  // because we are already handling the optimization via URL params in cloudinary.ts
  const isCloudinary = finalSrcStr.includes("res.cloudinary.com");

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <Image
        {...props}
        src={finalSrcStr}
        alt={alt || "Image"}
        unoptimized={isCloudinary || props.unoptimized}
        className={cn(
          "transition-opacity duration-300",
          hasError ? "opacity-30 grayscale blur-[2px]" : "opacity-100",
          className
        )}
        onError={(e) => {
          console.error(`[AppImage] Load error for: ${finalSrcStr}`, e);
          handleError();
        }}
      />
    </div>
  );
}
