import { CEO_META_DATA } from '@/constants';
import { Metadata } from 'next';
import SynergysScreen from './components';

export const metadata: Metadata = CEO_META_DATA.synergies;

export default function MetaPage() {
  return <SynergysScreen />;
}
