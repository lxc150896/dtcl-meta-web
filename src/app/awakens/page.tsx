import { CEO_META_DATA } from '@/constants';
import { Metadata } from 'next';
import AwakensPage from './components';

export const metadata: Metadata = CEO_META_DATA.awakens;

export default function MetaPage() {
  return <AwakensPage />;
}
