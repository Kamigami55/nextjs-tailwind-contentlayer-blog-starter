import Image, { ImageProps } from 'next/image';

type Props = ImageProps;

export default function CustomImage({
  src,
  height,
  width,
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
      {...otherProps}
    />
  );
}
