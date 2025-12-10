'use client';

import Image from 'next/image';
import React from 'react';

interface ItemImageProps {
  itemImg: string;
  baseUrl: string;
  className?: string;
  alt?: string;
}

const ItemImage: React.FC<ItemImageProps> = ({ itemImg, baseUrl, className = '', alt = 'Trang bị game đấu trường chân lý' }) => {
  const imageUrl = `${baseUrl}items/${itemImg}`;

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={32}
      height={32}
      className={`${className}`}
    />
  );
};

export default ItemImage;
