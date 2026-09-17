"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

type ImageWithSkeletonProps = ImageProps & {
  skeletonClassName?: string;
};

/**
 * Premium Image component with iOS-style shimmer skeleton loading.
 * Shows a smooth shimmer animation while the image loads,
 * then fades the image in gracefully.
 */
export default function ImageWithSkeleton({
  skeletonClassName = "",
  className = "",
  onLoad,
  src,
  alt = "",
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-900/40">
      {/* Shimmer Skeleton (visible while loading) */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 z-10 skeleton-shimmer bg-slate-800/60 ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}

      {/* Actual Image */}
      <Image
        {...props}
        src={currentSrc || "/images/hero_hotels.webp"}
        alt={alt || "DT's Vacation Special Offer"}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-90"
        }`}
        onLoad={(e) => {
          setIsLoaded(true);
          if (onLoad) onLoad(e);
        }}
        onError={() => {
          setIsLoaded(true);
          setCurrentSrc("/images/hero_hotels.webp");
        }}
      />
    </div>
  );
}
