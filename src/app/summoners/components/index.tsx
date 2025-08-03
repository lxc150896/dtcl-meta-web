"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
import relativeTime from 'dayjs/plugin/relativeTime';

import GoldXpIcon from '@/assets/icons/gold-xp.svg';
import IcoDamageIcon from '@/assets/icons/ico-damage.svg';
import IcoSkillIcon from '@/assets/icons/ico-kill.svg';
import ChampionImageModal from '@/components/ui/ChampionImageModal';
import { CollapsibleButton } from '@/components/ui/CollapsibleButton';
import TraitImageModal from '@/components/ui/TraitImageModal';
import { IMAGE_RANK_VIP_MAP, NAME_RANK_MAP } from '@/constants';
import CollapsibleContent from '@/components/ui/CollapsibleContent';
import CustomTab from '@/components/CustomTab';
import StatBox from "@/components/StatBox";
import { COLOR_RANK_MAP, COLOR_RANK_NAME_MAP } from "@/constants/color";
import { ChevronDown, ChevronUp } from "lucide-react";

dayjs.extend(relativeTime);
dayjs.locale('vi');

const BASE_URL_MATCH_AND_INFO_USER = "https://tft.dakgg.io/api/v1/summoners/";
const BASE_URL_TRAITS = "https://tft.dakgg.io/api/v1/data/traits";
const BASE_URL_CHAMPIONS = "https://tft.dakgg.io/api/v1/data/champions";
const BASE_URL_ITEMS = "https://tft.dakgg.io/api/v1/data/items";

interface ChampionsRowProps {
  item: {
    key: string;
    plays: number;
    wins: number;
    tops: number;
    placements: number;
  };
}

interface CompMatchProps {
  item: MatchParticipant & { [key: string]: unknown };
}

interface Summoner {
  puuid: string;
  gameName: string;
  tagLine: string;
  profileIconUrl?: string;
  summonerLevel?: number;
  shard?: string;
}

interface MatchParticipant {
  puuid: string;
  placement: number;
  traits: unknown[];
  units: unknown[];
  goldLeft?: number;
  playersEliminated?: number;
  totalDamageToPlayers?: number;
  [key: string]: unknown;
}

interface Match {
  participants: MatchParticipant[];
  shard: string;
  matchId: string;
  gameCreatedAt: number;
  [key: string]: unknown;
}

interface SummonerSeasonOverview {
  currentLeague?: [string, string, number];
  matchStats?: {
    championStats?: unknown[];
    traitStyleStats?: unknown[];
  }[];
  placements?: number[];
  wins?: number;
  tops?: number;
  plays?: number;
}

interface InfoData {
  summonerSeasonOverviews: SummonerSeasonOverview[];
}

interface TopChampion {
  key: string;
  plays: number;
  wins: number;
  tops: number;
  placements: number;
  [key: string]: unknown;
}
interface TopTrait {
  key: string;
  plays: number;
  wins: number;
  tops: number;
  placements: number;
  [key: string]: unknown;
}

interface TraitItemProps {
  item: TopTrait;
}

export default function SummonersDetailScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const fullName = searchParams.get('fullName');
  const name = searchParams.get('name');
  const tag = searchParams.get('tag');
  const region = searchParams.get('region');
  const season = searchParams.get('season');
  
  const tabLabels = ['Tổng quan', 'Lịch sử đấu'];
  const [activeTab, setActiveTab] = useState(0);
  const [matchs, setMatchs] = useState<Array<MatchParticipant & { shard: string; matchId: string; gameCreatedAt: number }>>([]);
  const [openStates, setOpenStates] = useState<boolean[]>(Array(matchs.length).fill(false));
  const [summoner, setSummoner] = useState<Summoner | null>(null);
  const [matchsAll, setMatchsAll] = useState<Match[]>([]);
  const [summoners, setSummoners] = useState<Summoner[] | null>(null);
  const [summonerLeagues, setSummonerLeagues] = useState<{ tier?: string; rank?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [ranks, setRanks] = useState<number[]>([]);
  const [infoUser, setInfoUser] = useState<SummonerSeasonOverview | null>(null);
  const [traits, setTraits] = useState<Array<{ ingameKey: string; [key: string]: unknown }>>([]);
  const [champions, setChampions] = useState<Array<{ ingameKey: string; [key: string]: unknown }>>([]);
  const [items, setItems] = useState<Array<{ ingameKey: string; [key: string]: unknown }>>([]);
  
  const [topChampions, setTopChampions] = useState<TopChampion[]>([]);
  const [topTraits, setTopTraits] = useState<TopTrait[]>([]);
  const [showAllChampions, setShowAllChampions] = useState(false);
  const [showAllTraits, setShowAllTraits] = useState(false);

  const displayedChampions = showAllChampions ? topChampions : topChampions.slice(0, 5);
  const displayedTraits = showAllTraits ? topTraits : topTraits.slice(0, 5);

  const fetchMatch = useCallback(async () => {
    setLoading(true);
    setActiveTab(0);
    setOpenStates([]);
    const FILE_PATH_MATCH_API = `${BASE_URL_MATCH_AND_INFO_USER}${region}/${name}-${tag}/matches?season=${season}&page=1&queueId=1100`;
    const BASE_URL_INFO_API = `${BASE_URL_MATCH_AND_INFO_USER}${region}/${name}-${tag}/overviews?season=${season}`;
    const BASE_URL_TRAITS_API = `${BASE_URL_TRAITS}?hl=vi&season=${season}`;
    const BASE_URL_CHAMPIONS_API = `${BASE_URL_CHAMPIONS}?hl=vi&season=${season}`;
    const BASE_URL_ITEMS_API = `${BASE_URL_ITEMS}?hl=vi&season=${season}`;

    try {
      const [
        matchRes,
        infoRes,
        traitsRes,
        championsRes,
        itemsRes
      ] = await Promise.all([
        fetch(FILE_PATH_MATCH_API),
        fetch(BASE_URL_INFO_API),
        fetch(BASE_URL_TRAITS_API),
        fetch(BASE_URL_CHAMPIONS_API),
        fetch(BASE_URL_ITEMS_API)
      ]);

      if (![matchRes, infoRes, traitsRes, championsRes, itemsRes].every(res => res.ok)) {
        throw new Error('Có lỗi khi gọi API');
      }

      const [
        matchData,
        infoData,
        traitsData,
        championsData,
        itemsData
      ] = await Promise.all([
        matchRes.json(),
        infoRes.json(),
        traitsRes.json(),
        championsRes.json(),
        itemsRes.json()
      ]);

      const matchedSummoner = matchData.summoners.find(
        (s: Summoner) =>
          s.gameName.toLowerCase() === (Array.isArray(name) ? name[0] : name).toLowerCase() &&
          s.tagLine.toLowerCase() === (Array.isArray(tag) ? tag[0] : tag).toLowerCase()
      );
      const matchedSummonerLeague = matchData.summonerLeagues.find(
        (s: Summoner) => s.puuid === matchedSummoner?.puuid
      );

      const matchs: Array<MatchParticipant & { shard: string; matchId: string; gameCreatedAt: number }> = matchData.matches.map((match: Match) => {
        const participant = match.participants.find(
          (p: MatchParticipant) => p.puuid === matchedSummoner?.puuid
        );
        if (participant) {
          return {
        ...participant,
        shard: match.shard,
        matchId: match.matchId,
        gameCreatedAt: match.gameCreatedAt
          };
        }
        return null;
      }).filter(Boolean) as Array<MatchParticipant & { shard: string; matchId: string; gameCreatedAt: number }>;

      const placements = matchs.map((item) => item.placement);

      const info: SummonerSeasonOverview | undefined = (infoData as InfoData).summonerSeasonOverviews.find(
        (item: SummonerSeasonOverview) => item.currentLeague !== undefined
      );

      setSummoner(matchedSummoner ?? null);
      setSummoners(matchData.summoners ?? []);
      setSummonerLeagues(matchedSummonerLeague ?? null);
      setMatchs(matchs);
      setMatchsAll(matchData.matches ?? []);
      setRanks(placements);
      setTopChampions((info?.matchStats?.at(-1)?.championStats ?? []) as TopChampion[]);
      setTopTraits((info?.matchStats?.at(-1)?.traitStyleStats ?? []) as TopTrait[]);
      setInfoUser(info ?? null);
      setTraits(traitsData.traits ?? []);
      setChampions(championsData.champions ?? []);
      setItems(itemsData.items ?? []);
      setError('');
    } catch {
      setError('Không tìm thấy người chơi hoặc lỗi kết nối');
    } finally {
      setLoading(false);
    }
  }, [region, name, tag, season]);

  useEffect(() => {
    setShowAllChampions(false);
    setShowAllTraits(false);
    fetchMatch();
  }, [fullName, fetchMatch]);

  const toggleItem = (index: number) => {
    setOpenStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };
  
  const getAveragePlacement = () => {
    const total = ranks.reduce((sum, num) => sum + num, 0);
    return (total / ranks.length).toFixed(1);
  };
  
  const getTop1Count = () => ranks.filter((num) => num === 1).length;
  
  const getTop4Count = () => ranks.filter((num) => num <= 4).length;

  const getTrait = (key: unknown) => {
    return traits.find((trait) => trait.ingameKey === key);
  };

  const getChampion = (key: unknown) => {
    return champions.find((champion) => champion.ingameKey === key);
  };

  const getItem = (key: unknown) => {
    return items.find((item) => item.ingameKey === key);
  };

  const avgRank = () => {
    if (!infoUser || !infoUser.placements) return '0.00';
    const totalGames = infoUser.placements.reduce((sum, count) => sum + count, 0);
    if (totalGames === 0) return '0.00';
    const weightedSum = infoUser.placements.reduce((sum, count, index) => sum + count * (index + 1), 0);
    return (weightedSum / totalGames).toFixed(2);
  }

  const ChampionsRow = ({ item }: ChampionsRowProps) => {
    const champion = getChampion(item.key);
    if (!champion) return null;

    return (
      <div className="flex items-center justify-between border-b border-gray-700 bg-gray-900 py-2 px-4 text-white text-sm">
        <div className="flex items-center gap-2 w-1/3">
          <Image
            src={(champion.imageUrl as string).replace(/^\/\//, 'https://')}
            alt={String(champion.name)}
            width={32}
            height={32}
            className="rounded-md"
          />
          <span className="truncate">{String(champion.name)}</span>
        </div>
        <div className="w-1/6 text-center">{item.plays}</div>
        <div className="w-1/6 text-center">{(item.wins / item.plays * 100).toFixed(2)}%</div>
        <div className="w-1/6 text-center">{(item.tops / item.plays * 100).toFixed(2)}%</div>
        <div className="w-1/6 text-center">#{(item.placements / item.plays).toFixed(2)}</div>
      </div>
    );
  };

  const TraitsRow = ({ item }: TraitItemProps) => {
    const dataApiTrait = getTrait(item.key);
    if (!dataApiTrait) return null;

    return (
      <div className="flex items-center border-b border-gray-700 py-2 px-4 text-sm text-white bg-gray-900">
        <div className="flex items-center w-1/3">
          <Image
            src={(dataApiTrait.imageUrl as string).replace(/^\/\//, 'https://')}
            alt={String(dataApiTrait.name)}
            width={32}
            height={32}
            className="rounded mr-2"
          />
          <span className="truncate max-w-[100px]">{String(dataApiTrait.name)}</span>
        </div>

        <div className="w-1/6 text-center">{item.plays}</div>
        <div className="w-1/6 text-center">
          {(item.wins / item.plays * 100).toFixed(2)}%
        </div>
        <div className="w-1/6 text-center">
          {(item.tops / item.plays * 100).toFixed(2)}%
        </div>
        <div className="w-1/6 text-center">
          #{(item.placements / item.plays).toFixed(2)}
        </div>
      </div>
    );
  };

  const getUser = (puuid: string) => {
    if (!summoners) return null;
    return summoners.find((user: unknown) => (user as { puuid: string }).puuid === puuid) ?? null;
  }

  const CompMatch = ({ item }: CompMatchProps) => {
    const participant = item;
    const user = getUser(participant.puuid);
    if (!user) return null;

    return (
      <div className="w-full bg-gray-900 p-2 rounded">
        <div className="flex items-center flex-wrap">
        {/* Placement */}
        <div className="text-white text-left w-[3%] text-xs md:text-sm">
          {participant.placement}
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-2 w-[20%]">
          {user?.profileIconUrl && (
            <Image
              src={user.profileIconUrl}
              alt={`${user.gameName} ${user.tagLine}`}
              width={32}
              height={32}
              className="rounded md:w-10 md:h-10 w-8 h-8"
            />
          )}
          <div onClick={() => router.push(`/summoners?fullName=${user.gameName}-${user.tagLine}&name=${user.gameName}&tag=${user.tagLine}&region=${user.shard}&season=${season}`)}>
            <h1 className="text-white text-sm hover:text-yellow-400 break-words cursor-pointer">{user.gameName}</h1>
          </div>
        </div>

        {/* Traits */}
        <div className="flex flex-wrap gap-1 items-center w-[20%]">
          {(participant.traits as { name: string; tier_current: number }[]).map((trait, index) => {
            if (trait.tier_current <= 0) return null;

            const traitData = getTrait(trait.name);

            return (
              <TraitImageModal
                key={index}
                traitImg={traitData?.imageUrl as string}
                className="w-4 h-4 md:w-6 md:h-6"
                id={typeof traitData?.name === 'string' ? traitData.name.replace(/\s+/g, '') : undefined}
                isGetApi={false}
                alt={trait.name}
              />
            );
          })}
        </div>

        {/* Champions */}
        <div className="flex flex-wrap items-center w-[45%]">
          {(item as { units: { character_id: string }[] }).units.map((champion: { character_id: string }, index: number) => {
            const champData = getChampion(champion.character_id);
            if (!champData?.imageUrl) return null;

            return (
              <ChampionImageModal
                key={index}
                champImg={typeof champData.imageUrl === 'string' ? champData.imageUrl.replace(/^\/\//, 'https://') : ''}
                price={Array.isArray(champData?.cost) ? champData.cost[0] : undefined}
                id={typeof champData?.name === 'string' ? champData.name.toLowerCase() : undefined}
                style={{marginRight: '8px', marginBottom: '8px'}}
                apiUrl={true}
                alt={typeof champData.name === 'string' ? champData.name : "Hướng dẫn chơi game ĐTCL"}
              />
            );
          })}
        </div>

        {/* Stats */}
        <div className="text-white text-xs space-y-1 w-[12%]">
          <div className="flex items-center">
            <GoldXpIcon className="mr-1 mt-[2px]" />
            <span>{item?.goldLeft}</span>
          </div>
          <div className="flex items-center">
            <IcoSkillIcon className="mr-1 mt-[2px]" />
            <span>{item?.playersEliminated}</span>
          </div>
          <div className="flex items-center">
            <IcoDamageIcon className="mr-1 mt-[2px]" />
            <span>{item?.totalDamageToPlayers}</span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="h-1 bg-black w-full" />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-black">
      {error ? (
        <div className="flex-1 flex justify-center items-center">
          <p className="text-white">{error}</p>
        </div>
      ) : (
        <div className="flex-1">
          <div className="flex-1">
            {/* Tab Bar cố định */}
            <div
              className="relative w-full h-[130px] bg-cover bg-center"
              style={{ backgroundImage: "url('/images/banner_user_profile.webp')" }}
            >
              <div className="absolute inset-0 bg-black/50 z-10" />
              <div className="relative z-20 flex items-center p-4">
                <div className="relative w-[65px] h-[65px]">
                  <Image
                    src={summoner?.profileIconUrl ?? "/images/default-avatar.png"}
                    alt={`${summoner?.gameName} ${summoner?.tagLine}`}
                    width={65}
                    height={65}
                    className="rounded-full"
                  />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black px-2 py-0.5 rounded-full">
                    <p className="text-white font-bold text-xs">{summoner?.summonerLevel}</p>
                  </div>
                </div>
                <div className="flex-1 ml-3">
                  <h1 className="text-white text-lg font-bold">
                    {summoner ? `${summoner.gameName}#${summoner.tagLine}` : `${name}#${tag}`}
                  </h1>
                  <p className="text-white text-sm">
                      {summonerLeagues?.tier ? NAME_RANK_MAP[summonerLeagues.tier as keyof typeof NAME_RANK_MAP] : ''} {summonerLeagues?.rank}
                  </p>
                </div>
              </div>
              {/* <div className="absolute top-3 right-4 z-20 flex items-center space-x-4">
                <button onClick={() => fetchMatch()}>
                </button>
                {summoner && (
                   <button>
                  </button>
                )}
              </div> */}
            </div>
            
            <CustomTab tabs={tabLabels} activeTab={activeTab} onChange={setActiveTab} />

            <div className="flex-1 bg-black mt-2 md:mt-4">
              <div className="flex-1">
                {activeTab === 0 && (
                  <div> {/* Điều chỉnh chiều cao nếu cần */}
                    <div className="flex-1">
                      <div className="w-full flex flex-col lg:flex-row gap-2 mb-2">
                        {/* Xếp hạng */}
                        <div className="w-full lg:w-1/2">
                          <h2 className="text-white font-bold text-lg px-4 py-3 bg-gray-800">Xếp hạng</h2>
                          <div className="flex items-center justify-center gap-2 pb-4 bg-gray-900">
                            <Image
                              src={
                                (summonerLeagues?.tier && summonerLeagues.tier in IMAGE_RANK_VIP_MAP)
                                  ? IMAGE_RANK_VIP_MAP[summonerLeagues.tier as keyof typeof IMAGE_RANK_VIP_MAP]
                                  : ""
                              }
                              alt={`${summonerLeagues?.tier} ${summonerLeagues?.rank}`}
                              width={80}
                              height={80}
                            />
                            <div>
                              {infoUser ? (
                                <div>
                                  <p className="text-[#ffb900] text-lg">
                                    {infoUser?.currentLeague?.[0] ? NAME_RANK_MAP[infoUser.currentLeague[0] as keyof typeof NAME_RANK_MAP] : ''} {infoUser?.currentLeague?.[1]}
                                  </p>
                                  <p className="text-white text-sm">{infoUser?.currentLeague?.[2]} LP</p>
                                </div>
                              ) : (
                                <p className="text-[#ffb900] text-lg">
                                  {summonerLeagues?.tier ? NAME_RANK_MAP[summonerLeagues.tier as keyof typeof NAME_RANK_MAP] : ''} {summonerLeagues?.rank}
                                </p>
                              )}
                            </div>
                          </div>
                          {infoUser && (
                            <div className="flex flex-wrap justify-between p-2 pb-4 bg-gray-900">
                              <div className="w-1/2 p-2">
                                <StatBox title="Số trận Top 1" value={infoUser?.wins ?? 0} percent={parseFloat((((infoUser?.wins ?? 0) / (infoUser?.plays ?? 1)).toFixed(2)))} barColor="#eb9c00" className="mb-4" />
                                <StatBox title="Số trận Top 4" value={infoUser?.tops ?? 0} percent={parseFloat((((infoUser?.tops ?? 0) / (infoUser?.plays ?? 1)).toFixed(2)))} barColor="#3498db" className="mb-4" />
                                <StatBox title="Tổng số trận" value={infoUser?.plays ?? 0} percent={1} barColor="#758592" />
                              </div>
                              <div className="w-1/2 p-2">
                                <StatBox title="Tỷ lệ Top 1" value={`${parseFloat((((infoUser?.wins ?? 0) / (infoUser?.plays ?? 1)) * 100).toFixed(2))}%`} percent={parseFloat((((infoUser?.wins ?? 0) / (infoUser?.plays ?? 1)).toFixed(2)))} barColor="#758592" className="mb-4" />
                                <StatBox title="Tỷ lệ Top 4" value={`${parseFloat((((infoUser?.tops ?? 0) / (infoUser?.plays ?? 1)) * 100).toFixed(2))}%`} percent={parseFloat((((infoUser?.tops ?? 0) / (infoUser?.plays ?? 1)).toFixed(2)))} barColor="#758592" className="mb-4" />
                                <StatBox title="Hạng trung bình" value={infoUser ? `#${avgRank()}` : ''} percent={1} barColor="#758592" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* 20 trận gần nhất */}
                        <div className="w-full lg:w-1/2 bg-gray-900">
                          <h2 className="text-white font-bold text-lg px-4 py-3 bg-gray-800">20 trận gần nhất</h2>
                          <div className="flex justify-between p-4 pt-2 bg-gray-900">
                            <div className="text-center">
                              <p className="text-sm text-white pb-1">Trung Bình</p>
                              <p className="text-sm font-bold text-gray-300">#{getAveragePlacement()}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-white pb-1">TOP 1</p>
                              <p className="text-sm font-bold text-gray-300">{getTop1Count()}</p>
                            </div>
                            <div className="text-center">
                              <p className="text-sm text-white pb-1">TOP 4</p>
                              <p className="text-sm font-bold text-gray-300">{getTop4Count()}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-10 gap-1 justify-center p-4 pt-0 bg-gray-900">
                            {ranks.map((rank, index) => (
                              <div
                                key={index}
                                className="aspect-square rounded flex justify-center items-center"
                                style={{ backgroundColor: COLOR_RANK_MAP[String(rank) as unknown as keyof typeof COLOR_RANK_MAP] ?? '#424254' }}
                              >
                                <span className="text-white font-bold text-xs">{rank}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      {/* Tướng hay dùng */}
                      <div className="mb-4 bg-gray-700">
                        <h2 className="text-white font-bold text-lg px-4 py-3 bg-gray-800">Tướng hay dùng</h2>
                        <div className="text-xs text-gray-400 font-bold flex text-center bg-gray-950 p-2">
                            <span className="flex-[2]">Tướng</span>
                            <span className="flex-1">Số Trận</span>
                            <span className="flex-1">TL.Top 1</span>
                            <span className="flex-1">TL.top 4</span>
                            <span className="flex-1">Hạng TB</span>
                        </div>
                        {displayedChampions?.map((item, index) => (
                          <ChampionsRow key={index} item={item} />
                        ))}
                        {topChampions.length > 5 && (
                          <button onClick={() => setShowAllChampions(!showAllChampions)} className="cursor-pointer w-full flex justify-center p-2 items-center bg-gray-800">
                            {showAllChampions ? <ChevronUp size={20} color="#ffb900" /> : <ChevronDown size={20} color="#ffb900" />}
                          </button>
                        )}
                      </div>

                      {/* Tộc hệ hay dùng */}
                      <div className="bg-black">
                        <h2 className="text-white font-bold text-lg p-4 bg-gray-800">Tộc / Hệ hay dùng</h2>
                        <div className="text-xs text-gray-400 font-bold flex text-center bg-gray-900 p-2">
                            <span className="flex-[2]">Tộc / Hệ</span>
                            <span className="flex-1">Số Trận</span>
                            <span className="flex-1">TL.Top 1</span>
                            <span className="flex-1">TL.top 4</span>
                            <span className="flex-1">Hạng TB</span>
                        </div>
                        {displayedTraits?.map((item, index) => (
                          <TraitsRow key={index} item={item} />
                        ))}
                        {topTraits.length > 5 && (
                          <button onClick={() => setShowAllTraits(!showAllTraits)} className="cursor-pointer w-full flex justify-center p-2 items-center bg-gray-800">
                            {showAllTraits ? <ChevronUp size={20} color="#ffb900" /> : <ChevronDown size={20} color="#ffb900" />}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === 1 && (
                  <div>
                      {matchs.map((comp, index) => (
                        <div key={index} className="mb-3 bg-gray-900">
                          <div className="flex items-center p-2 pr-1">
                            <div className="flex-1 flex items-center">
                              <p style={{color: COLOR_RANK_NAME_MAP[String(comp.placement) as unknown as keyof typeof COLOR_RANK_NAME_MAP] ?? '#424254'}} className="font-bold text-lg">
                                #{comp.placement}
                              </p>
                              <Image src={typeof comp.companionImageUrl === 'string' ? comp.companionImageUrl : ''} alt={`Người chơi ${comp.gameName}`} width={32} height={32} className="w-auto aspect-square object-cover object-center rounded-full ml-2 h-6 md:w-8 md:h-8"/>
                              <p className="text-white text-xs font-bold ml-2">lv.{String(comp.level)}</p>
                              <p className="text-white text-xs ml-2">{dayjs(comp.gameCreatedAt).fromNow()}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {/* <button className="flex items-center gap-2 bg-[#d7992f] px-2 py-1.5 rounded text-xs text-white">
                                {isLoadingSave && idDelete === comp.gameCreatedAt ? (
                                  <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <Download size={14} />
                                )}
                                Lưu đội hình
                              </button> */}
                              <CollapsibleButton isOpen={openStates[index]} onToggle={() => toggleItem(index)}/>
                            </div>
                          </div>

                          <div className="h-px bg-black w-full" />

                          {/* Traits */}
                          <div className="flex flex-wrap p-3 gap-1">
                            {comp.traits.map((trait, i) => {
                              // Type guard for trait
                              if (
                                typeof trait !== "object" ||
                                trait === null ||
                                !("tier_current" in trait) ||
                                typeof (trait as { tier_current: number }).tier_current !== "number" ||
                                (trait as { tier_current: number }).tier_current <= 0
                              ) return null;
                              const traitName = (trait as unknown as { name?: string })?.name;
                              const traitData = getTrait(traitName);
                              return (
                                <TraitImageModal
                                  key={i}
                                  traitImg={typeof traitData?.imageUrl === 'string' ? traitData.imageUrl : ''}
                                  id={typeof traitData?.name === 'string' ? traitData.name.replace(/\s+/g, '') : undefined}
                                  isGetApi={false}
                                  subId={traitData?.ingameKey}
                                  alt={traitName}
                                />
                              );
                            })}
                          </div>
                          
                          {/* Champs */}
                          <div className="overflow-x-auto pb-2">
                            <div className="flex px-3 gap-1">
                              {comp.units.map((champ, i) => {
                                // Type guard for champ
                                if (
                                  typeof champ !== "object" ||
                                  champ === null ||
                                  !("character_id" in champ) ||
                                  !("tier" in champ) ||
                                  !("items" in champ)
                                ) return null;
                                const champTyped = champ as { character_id: string; tier: number; items: unknown[]; [key: string]: unknown };
                                const getChamp = getChampion(champTyped.character_id);

                                if (!getChamp) return null;
                                return (
                                  <div key={i} className="relative flex-shrink-0">
                                    {/* Stars */}
                                    <div className="flex justify-center h-[11px]">
                                      {Array.from({ length: champTyped.tier }).map((_, starIndex) => (
                                        <span key={starIndex} className="text-[8px]">⭐</span>
                                      ))}
                                    </div>
                                    {/* Champion Image and Items */}
                                    <div>
                                      <ChampionImageModal
                                        champImg={typeof getChamp.imageUrl === 'string' ? getChamp.imageUrl.replace(/^\/\//, 'https://') : ''}
                                        price={Array.isArray(getChamp.cost) ? getChamp.cost[0] : getChamp.cost}
                                        id={typeof getChamp.name === 'string' ? getChamp.name.toLowerCase() : ''}
                                        apiUrl={true}
                                        alt={typeof getChamp.name === 'string' ? getChamp.name : "Hướng dẫn chơi game ĐTCL"}
                                      />
                                      {champTyped.items.length > 0 && (
                                        <div className="absolute bottom-0 left-0 w-full flex justify-center">
                                          <div className="flex gap-[2px] bg-black/40 rounded-t">
                                            {champTyped.items.map((item: unknown, iItem: number) => {
                                              // Narrow item to string or number if that's what ingameKey expects
                                              const itemObj = getItem(item);
                                              const imageUrl = typeof itemObj?.imageUrl === 'string' ? itemObj.imageUrl.replace(/^\/\//, 'https://') : '';
                                              return (
                                                <Image
                                                  key={iItem}
                                                  width={15}
                                                  height={15}
                                                  src={imageUrl}
                                                  alt="Trang bị mạnh nhất đấu trường chân lý"
                                                />
                                              );
                                            })}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          
                          {/* Collapsible Content */}
                          <CollapsibleContent isOpen={openStates[index]}>
                            <div className="overflow-x-auto">
                              <div className="min-w-[700px]"> {/* Đảm bảo đủ rộng để cuộn */}
                                <div className="flex bg-gray-950 text-gray-400 text-xs font-bold text-center p-2">
                                  <p className="text-left w-[3%]">#</p>
                                  <p className="text-left w-[20%]">Người chơi</p>
                                  <p className="text-left w-[30%]">Tộc / Hệ</p>
                                  <p className="text-left w-[35%]">Tướng</p>
                                  <p className="text-left w-[12%]">Thống kê</p>
                                </div>
                                {matchsAll[index].participants.map((item, idx) => (
                                  <CompMatch key={idx} item={item} />
                                ))}
                              </div>
                            </div>
                          </CollapsibleContent>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
