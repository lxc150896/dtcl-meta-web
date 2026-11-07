import { CEO_META_DATA } from '@/constants';
import { Metadata } from 'next';
import ItemsPage from './components';

export const metadata: Metadata = CEO_META_DATA.items;

export default function MetaPage() {
  return <ItemsPage />;
}
