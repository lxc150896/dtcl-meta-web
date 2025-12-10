'use client';

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
    <img
      src={imageUrl}
      alt={alt}
      width={32}
      height={32}
      className={`${className}`}
    />
  );
};

export default ItemImage;
