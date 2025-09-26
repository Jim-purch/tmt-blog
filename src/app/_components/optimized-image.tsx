"use client";

import { IMAGE_CONFIG } from "@/lib/constants";
import { getValidImageUrl } from "@/lib/imageUtils";
import Image from "next/image";
import { useState, useEffect } from "react";

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  priority?: boolean;
  loading?: "lazy" | "eager";
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
  checkExists?: boolean; // 是否检查图片存在性
}

export function OptimizedImage({
  src,
  alt,
  fill = false,
  className = "",
  style,
  priority = false,
  loading = "lazy",
  onError,
  placeholder = "blur",
  blurDataURL = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
  checkExists = true
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(IMAGE_CONFIG.enabled ? src : IMAGE_CONFIG.defaultImage);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 预检查图片存在性
  useEffect(() => {
    if (!IMAGE_CONFIG.enabled || !checkExists || priority) {
      // 如果图片服务未启用、不需要检查存在性或是优先级图片，直接使用原始逻辑
      setImageSrc(IMAGE_CONFIG.enabled ? src : IMAGE_CONFIG.defaultImage);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);

    getValidImageUrl(src, IMAGE_CONFIG.defaultImage).then((validUrl) => {
      if (isMounted) {
        setImageSrc(validUrl);
        setIsLoading(false);
        setHasError(false);
      }
    }).catch(() => {
      if (isMounted) {
        setImageSrc(IMAGE_CONFIG.defaultImage);
        setIsLoading(false);
        setHasError(true);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [src, checkExists, priority]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && imageSrc !== IMAGE_CONFIG.defaultImage) {
      setHasError(true);
      setImageSrc(IMAGE_CONFIG.defaultImage);
    }
    onError?.(e);
  };

  // 如果正在检查图片存在性且不是优先级图片，显示占位符
  if (isLoading && !priority && checkExists) {
    return (
      <div 
        className={`bg-gray-200 dark:bg-gray-700 animate-pulse flex items-center justify-center ${className}`}
        style={style}
      >
        <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      </div>
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      fill={fill}
      className={className}
      style={style}
      priority={priority}
      loading={priority ? "eager" : loading}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      onError={handleError}
    />
  );
}