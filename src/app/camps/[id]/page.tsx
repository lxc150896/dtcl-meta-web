import { CEO_META_DATA } from '@/constants';
import { Metadata } from 'next';
import CampDetailPage from '../components';

export const metadata: Metadata = CEO_META_DATA.comp;

export default function MetaPage() {
  return <CampDetailPage />;
}
