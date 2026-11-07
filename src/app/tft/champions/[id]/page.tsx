import { CEO_META_DATA } from '@/constants';
import { Metadata } from 'next';
import ChampionDetailScreen from '../components/ChampionsDetail';

export const metadata: Metadata = CEO_META_DATA.champion;

export default function MetaPage() {
  return <ChampionDetailScreen />;
}
