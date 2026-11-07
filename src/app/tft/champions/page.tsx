import { CEO_META_DATA } from '@/constants';
import { Metadata } from 'next';
import ChampionsPage from './components/Champions';

export const metadata: Metadata = CEO_META_DATA.champions;

export default function MetaPage() {
  return <ChampionsPage />;
}
