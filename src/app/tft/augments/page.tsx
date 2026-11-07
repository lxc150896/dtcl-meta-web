import { CEO_META_DATA } from '@/constants';
import { Metadata } from 'next';
import TechnologiesPage from './components';

export const metadata: Metadata = CEO_META_DATA.augments;

export default function MetaPage() {
  return <TechnologiesPage />;
}
