import { CEO_META_DATA } from '@/constants';
import { Metadata } from 'next';
import SummonersDetailScreen from './components';

export const metadata: Metadata = CEO_META_DATA.summoners;

export default function MetaPage() {
  return <SummonersDetailScreen />;
}
