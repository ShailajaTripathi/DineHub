import { cn } from '@/lib/utils';

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className,
  fallback = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
}: ImageWithFallbackProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn('object-cover', className)}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = fallback;
      }}
      loading="lazy"
    />
  );
}
