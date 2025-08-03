import Image from 'next/image';
import React from 'react';

interface SynergyImageProps {
  synergyImg: string;
  baseUrl: string;
  style?: React.CSSProperties;
  isPadding?: boolean;
  className?: string;
  alt?: string;
}

const SynergyImage: React.FC<SynergyImageProps> = ({
  synergyImg,
  baseUrl,
  style,
  isPadding = true,
  className,
  alt="Tộc hệ game đấu trường chân lý",
}) => {
  return (
    <div
      style={{
        overflow: 'hidden',
        backgroundColor: '#000',
        ...(isPadding
          ? { padding: 6, borderRadius: 20 }
          : {}),
      }}
    >
      <Image
        src={`${baseUrl}synergys/${synergyImg}`}
        alt={alt}
        width={22}
        height={22}
        style={{
          backgroundColor: '#000',
          ...style,
        }}
        className={`${className && className}`}
      />
    </div>
  );
};

export default SynergyImage;
