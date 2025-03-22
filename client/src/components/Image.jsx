import { IKImage } from "imagekitio-react";

export default function Image({ src, className, alt, width, height }) {
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      path={src}
      alt={alt}
      lqip={{ active: true, quality: 20 }}
      className={className}
      width={width}
      height={height}
      transformation={[
        {
          width: width,
          height: height,
        },
      ]}
    />
  );
}
