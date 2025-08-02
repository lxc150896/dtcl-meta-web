import Image from 'next/image';
import React from 'react';

interface TechnologieImageProps {
  techImg: string;
  baseUrl?: string;
  className?: string;
}

const TechnologieImage: React.FC<TechnologieImageProps> = ({ techImg, baseUrl, className = '' }) => {
  const imageUrl = baseUrl ? `${baseUrl}technologies/${techImg}` : techImg;

  return (
    <div className={`relative w-8 h-8 md:w-10 md:h-10 border border-white rounded ${className}`}>
      <Image
        src={imageUrl}
        alt="technology"
        fill
        className="object-cover rounded"
        sizes="34px"
      />
    </div>
  );
};

export default TechnologieImage;
