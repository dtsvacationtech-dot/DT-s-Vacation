"use client";

import Image, { ImageProps } from "next/image";
import { useState } from "react";

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
  ...props
}: ImageWithSkeletonProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* Shimmer Skeleton (visible while loading) */}
      {!isLoaded && (
        <div
          className={`absolute inset-0 z-10 skeleton-shimmer ${skeletonClassName}`}
          aria-hidden="true"
        />
      )}

      {/* Actual Image (fades in once loaded) */}
      <Image
        {...props}
        className={`${className} transition-all duration-700 ease-out ${
          !isLoaded ? "!opacity-0" : ""
        }`}
        onLoad={(e) => {
          setIsLoaded(true);
          if (onLoad) onLoad(e);
        }}
      />
    </>
  );
}
