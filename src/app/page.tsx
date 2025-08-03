import Comps from '@/components/Comps';
import { CEO_META_DATA } from '@/constants';
import { Metadata } from 'next';

export const metadata: Metadata = CEO_META_DATA.comps;

export default function MetaPage() {
  return <Comps />;
}
