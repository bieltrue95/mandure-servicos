'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  blur?: boolean;
}

/**
 * Componente de imagem otimizado com placeholder blur e lazy loading
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  blur = true,
}: OptimizedImageProps) {
  const [blurDataURL, setBlurDataURL] = useState<string | undefined>();

  useEffect(() => {
    if (!blur || priority) return;

    // Gera um placeholder SVG leve ao invés de blur dataset
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect fill="#f3f4f6" width="${width}" height="${height}"/></svg>`;
    const encoded = Buffer.from(svg).toString('base64');
    setBlurDataURL(`data:image/svg+xml;base64,${encoded}`);
  }, [blur, priority, width, height]);

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      className={className}
      placeholder={blurDataURL ? 'blur' : 'empty'}
      blurDataURL={blurDataURL}
      quality={priority ? 90 : 75}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 75vw, 50vw"
    />
  );
}
