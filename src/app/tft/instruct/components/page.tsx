"use client";

import { SetStateAction, useRef, useState } from "react";
import CustomTab from "@/components/CustomTab";
import Image from "next/image";
import { useData } from "@/context/DataContext";
import { useTranslation } from "@/i18n";
import { PRICE_BORDER_COLORS } from "@/constants";
import { ChampionIcon, DeathIcon, FireIcon, GoldXpIcon, ImperialIcon, LevelOneIcon, RoundIcon } from "@/assets/icons";
import React from "react";
import Divider from "@/components/ui/Divider";

export type IconMapKey = keyof typeof ICON_MAP;

export const ICON_MAP = {
  death: DeathIcon,
  imperial: ImperialIcon,
  round: RoundIcon,
  gold: GoldXpIcon,
  fire: FireIcon,
  level: LevelOneIcon,
  champion: ChampionIcon,
};

export default function InstructsScreen() {
  const { data, language } = useData();
  const { t } = useTranslation(language);
  const [activeTab, setActiveTab] = useState(0);
  const scrollRef = useRef(null);

  const tabLabels = [
    t.instruct.tabs.items,
    t.instruct.tabs.rounds,
    t.instruct.tabs.portals,
    t.instruct.tabs.gold,
    t.instruct.tabs.damage,
  ];

  // useEffect(() => {
  //   scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  // }, [activeTab]);

  const handleTab = (index: SetStateAction<number>) => {
    setActiveTab(index);
  };

  const chunkArray = <T,>(arr: T[], size: number): T[][] => {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  return (
    <div className="min-h-screen text-white mb-4">
      <h1 className="text-white bg-gray-900 mb-1 md:text-base text-sm py-3 px-4">{t.instruct.title}</h1>
      <CustomTab tabs={tabLabels} activeTab={activeTab} onChange={handleTab} />

      <div ref={scrollRef} className="space-y-2">
        {activeTab === 0 && (
          <div className="md:flex items-stretch gap-2 mt-1 md:mt-2">
            <div className="flex-1 flex flex-col">
              <h2 className="text-base font-bold bg-gray-900 px-4 py-2">{t.instruct.itemsTable}</h2>
              <div className="bg-gray-900 p-2 flex-1">
                <Image
                  src={'/images/trang_bi.png'}
                  alt={t.instruct.itemsTableAlt}
                  width={800}
                  height={400}
                  className="w-full h-auto object-contain"
                  unoptimized
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <h2 className="text-base font-bold bg-gray-900 px-4 py-2">{t.instruct.rollRate}</h2>
              <div className="overflow-x-auto flex-1 bg-gray-900">
                <table className="w-full text-xs border-collapse">
                   <thead className="bg-gray-800">
                     <tr>
                       <th className="p-2">{t.instruct.level}</th>
                       {Array.isArray(data.instruct.roll[0]) &&
                        data.instruct.roll[0].map((note, index) => (
                          <th key={index} className="p-2 text-center">
                            <div style={{ color: PRICE_BORDER_COLORS[index] || "#fff" }}>
                              {index + 1} {t.instruct.gold}
                            </div>
                            <div className="text-gray-400">({note})</div>
                          </th>
                        ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.instruct.roll.slice(1).map((row, rowIndex) => (
                      <tr key={rowIndex} className="text-center border-t border-black bg-gray-900">
                        <td className="p-2 bg-[31313c]">{rowIndex + 1}</td>
                        {Array.isArray(row)
                          ? row.map((value, colIndex) => (
                              <td key={colIndex} className="p-2">{value}</td>
                            ))
                          : null}
                      </tr>
                    ))}
                  </tbody>
                 </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 1 && data.instruct.vong && Array.isArray(data.instruct.vong) && (
          data.instruct.vong.map((roundItems, roundIndex) => (
            <div key={roundIndex} className="bg-gray-900 p-2 mt-1 md:mt-2">
              <h3 className="font-bold mb-2">{t.instruct.round} {roundIndex + 1}</h3>
              <div className="grid grid-cols-7 gap-2">
                {Array.isArray(roundItems) ? roundItems.map((item, itemIndex) => (
                  <div key={itemIndex} className="text-center">
                    <div className="text-gray-400 text-xs md:text-sm mb-1">
                      {roundIndex + 1}-{itemIndex + 1}
                    </div>
                    <Image
                      src={`/images/${item.image}`}
                      alt={item.title}
                      width={32}
                      height={32}
                      className="mx-auto rounded-full"
                    />
                    <div className="text-[8px] md:text-xs mt-1 truncate">{item.title}</div>
                  </div>
                )) : null}
              </div>
            </div>
          ))
        )}

        {activeTab === 2 && data.instruct.vong_ky_ngo && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-1 md:mt-2">
            {data.instruct.vong_ky_ngo.map((section, index) => (
              <div key={index} className="mb-0 md:mb-4 bg-gray-900 p-4">
                <h3 className="text-sm md:text-base font-semibold mb-2 text-center">
                  {section.title}
                </h3>
                <Divider color="black" />
                {section.items.map((item, idx) => (
                  <div key={idx}>
                    <h2 className="font-bold text-sm">{item.name}</h2>
                    <h3 className="text-sm text-gray-300">{item.description}</h3>
                    <Divider color="black" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {activeTab === 3 && data.instruct.vang_kinh_nghiem && (
          chunkArray(Object.entries(data.instruct.vang_kinh_nghiem), 2).map((pair, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-2 gap-1 md:gap-4 mt-1 md:mt-2">
              {pair.map(([index, rows], idx) => (
                <div key={index} className="bg-gray-900 p-2">
                  <h4 className="font-semibold text-sm mb-2">
                    {data.instruct.headers?.[rowIdx * 2 + idx] || ""}
                  </h4>
                  <div className="space-y-1">
                    {rows.slice(1).map((row, rIdx) => (
                      <div
                        key={rIdx}
                        className="flex justify-between text-xs md:text-sm items-center border-b border-black py-1"
                      >
                        <span className="flex items-center gap-2">
                          {!!row.icon && ICON_MAP[row.icon as IconMapKey] &&
                          React.createElement(ICON_MAP[row.icon as IconMapKey], {
                            className: 'w-4 h-4 md:w-6 md:h-6 text-white'
                          })}
                          {row.name ?? ''}
                        </span>
                        <span className="text-right text-white">{row.value ?? ''}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}

        {activeTab === 4 && data.instruct.cong_thuc_sat_thuong && (
          <div className="grid grid-cols-2 gap-1 md:gap-4 mt-1 md:mt-2">
            <p className="col-span-2 text-sm font-semibold bg-gray-900 p-4">
              {t.instruct.damageFormula}
            </p>
            {Object.entries(data.instruct.cong_thuc_sat_thuong).map(([index, rows]) => (
              Array.isArray(rows) && rows.length > 0 ? (
                <div key={index} className="bg-gray-900 p-2">
                  <h4 className="text-xs md:text-sm font-semibold mb-2">
                    {rows[0].col_one} / {rows[0].col_tow}
                  </h4>
                  {rows.slice(1).map((row, rIdx) => (
                    <div
                      key={rIdx}
                      className="flex justify-between text-sm items-center border-b border-[#222] py-1 md:py-2"
                    >
                      <span className="flex items-center gap-2">
                        {!!row.icon && ICON_MAP[row.icon as IconMapKey] &&
                          React.createElement(ICON_MAP[row.icon as IconMapKey], {
                            className: 'w-4 h-4 md:w-6 md:h-6 text-white'
                          })}
                        {row.name}
                      </span>
                      <span className="text-right text-white">{row.value}</span>
                    </div>
                  ))}
                </div>
              ) : null
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
