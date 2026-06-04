import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export interface BlurImageProps extends ImageProps {
  blurDataURL?: string;
  containerClassName?: string;
  noSkeleton?: boolean;
}

export function BlurImage({
  src,
  alt,
  blurDataURL,
  className,
  containerClassName,
  noSkeleton = false,
  ...props
}: BlurImageProps) {
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* If no blurDataURL, we show a CSS shimmer skeleton behind the image */}
      {!blurDataURL && !noSkeleton && (
        <div
          aria-hidden="true"
          className="img-skeleton absolute inset-0 -z-10 bg-background-muted"
        />
      )}
      <Image
        src={src}
        alt={alt}
        className={cn(
          "transition-opacity duration-500 ease-in-out",
          className
        )}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        {...props}
      />
    </div>
  );
}
