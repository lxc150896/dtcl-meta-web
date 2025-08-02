'use client';

import { PRICE_BORDER_COLORS } from "@/constants";
import Image from "next/image";
import React from "react";

interface ChampionImageProps {
  champImg: string;
  price: number;
  baseUrl?: string;
  className?: string;
  style?: React.CSSProperties;
}

const ChampionImage: React.FC<ChampionImageProps> = ({
  champImg,
  price,
  baseUrl,
  className = "",
  style = {},
}) => {
  const borderColor = PRICE_BORDER_COLORS[price - 1] || "#fff";
  const imageUrl = baseUrl ? `${baseUrl}champions/${champImg}` : champImg;

  return (
    <div
      className={`cursor-pointer w-[40px] h-[40px] md:w-[50px] md:h-[50px] border-2 rounded overflow-hidden ${className}`}
      style={{ borderColor, ...style }}
    >
      <Image
        src={imageUrl}
        alt="Champion"
        width={50}
        height={50}
        className="w-full h-full object-cover"
        style={style}
      />
    </div>
  );
};

export default ChampionImage;
