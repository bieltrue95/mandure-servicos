import Image from 'next/image';

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LOGO_SIZES = {
  sm: { size: 40, src: '/images/logo/logo_128.avif' },
  md: { size: 48, src: '/images/logo/logo_256.avif' },
  lg: { size: 64, src: '/images/logo/logo_512.avif' },
} as const;

export function Logo({ size = 'md', className = '' }: LogoProps) {
  const { size: dimensions, src } = LOGO_SIZES[size];

  return (
    <Image
      src={src}
      alt="Mandure Serviços - Logo"
      width={dimensions}
      height={dimensions}
      priority
      className={className}
      style={{ width: 'auto', height: 'auto' }}
    />
  );
}
