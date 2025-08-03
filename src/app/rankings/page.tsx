import { CEO_META_DATA } from '@/constants';
import { Metadata } from 'next';
import LeaderboardPage from './components';

export const metadata: Metadata = CEO_META_DATA.rankings;

export default function MetaPage() {
  return <LeaderboardPage />;
}
