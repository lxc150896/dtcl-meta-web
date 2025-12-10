'use client';

import { PRICE_BORDER_COLORS } from "@/constants";
import React from "react";
import { LockOpen } from "lucide-react";

interface ChampionImageProps {
  champImg: string;
  price: number;
  baseUrl?: string;
  className?: string;
  style?: React.CSSProperties;
  alt?: string;
  unlock?: {
    type: boolean;
    description: string;
  };
}

const ChampionImage: React.FC<ChampionImageProps> = ({
  champImg,
  price,
  baseUrl,
  className = "",
  style = {},
  alt = "Champion Image",
  unlock,
}) => {
  const borderColor = PRICE_BORDER_COLORS[price - 1] || "#fff";
  const imageUrl = baseUrl ? `${baseUrl}champions/${champImg}` : champImg;

  return (
    <div
      className={`cursor-pointer w-[40px] h-[40px] md:w-[50px] md:h-[50px] border-2 rounded overflow-hidden relative ${className}`}
      style={{ borderColor, ...style }}
    >
      <img
        src={imageUrl}
        alt={alt}
        width={50}
        height={50}
        className="w-full h-full object-cover"
        style={style}
      />
      {unlock?.type && (
        <div className="absolute top-0 right-0 bg-black/70 rounded-bl p-0.5">
          <LockOpen size={12} className="text-yellow-400" />
        </div>
      )}
    </div>
  );
};

export default ChampionImage;
