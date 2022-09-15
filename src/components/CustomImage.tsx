import Image, { ImageProps } from 'next/image';

type Props = ImageProps & { base64?: string };

export default function CustomImage({
  src,
  height,
  width,
  base64,
  alt,
  ...otherProps
}: Props) {
  if (!src) return null;
  if (typeof src === 'string' && (!height || !width)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} height={height} width={width} alt={alt} {...otherProps} />
    );
  }
  return (
    <Image
      layout="responsive"
      src={src}
      alt={alt}
      height={height}
      width={width}
      sizes="(min-width: 40em) 40em, 100vw"
      placeholder={base64 ? 'blur' : 'empty'}
      blurDataURL={base64}
      {...otherProps}
    />
  );
}
