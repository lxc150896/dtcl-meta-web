'use client';

import React, { memo } from 'react';
import { PRICE_BORDER_COLORS } from '@/constants';
import ChampionImageModal from './ui/ChampionImageModal';
import CollapsibleContent from './ui/CollapsibleContent';
import { ChevronDown, ChevronUp } from 'lucide-react';

type Champion = {
  id?: string;
  img_url: string;
};

type ChampionsByGoldSectionProps = {
  data: {
    champions_by_gold?: Champion[][];
    base_url: string;
  };
  isOpen: boolean;
  onToggle: () => void;
};

const ChampionsByGoldSectionComponent = ({
  data,
  isOpen,
  onToggle,
}: ChampionsByGoldSectionProps) => {
  return (
    <div className="mb-2 bg-gray-900 cursor-pointer">
      {/* Header */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-3 px-2 rounded-t-md cursor-pointer"
      >
        <p className="text-white font-bold text-sm">Tướng chủ lực theo giá tiền</p>
        {isOpen ? (
          <ChevronDown className="text-white text-lg" />
        ) : (
          <ChevronUp className="text-white text-lg" />
        )}
      </button>

      {/* Nội dung collapsible */}
      <CollapsibleContent isOpen={isOpen}>
        <div className="px-2 pb-3 rounded-b-md">
          {data.champions_by_gold?.map((champions, goldIndex) => (
            <div key={goldIndex} className="mt-2">
              <div className="flex items-start gap-3">
                {/* Giá vàng */}
                <p
                  className="text-sm font-bold whitespace-nowrap"
                  style={{ color: PRICE_BORDER_COLORS[goldIndex] }}
                >
                  {goldIndex + 1} vàng
                </p>

                {/* Danh sách tướng */}
                <div className="flex flex-wrap gap-1">
                  {champions.map((champion, champIndex) => (
                    <div key={champion.id ?? champIndex} className="p-[2px] relative">
                      <ChampionImageModal
                        champImg={champion.img_url}
                        price={goldIndex + 1}
                        baseUrl={data.base_url}
                        id={champion.id}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleContent>
    </div>
  );
};

const ChampionsByGoldSection = memo(ChampionsByGoldSectionComponent);
ChampionsByGoldSection.displayName = 'ChampionsByGoldSection';

export default ChampionsByGoldSection;
