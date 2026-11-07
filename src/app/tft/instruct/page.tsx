import { CEO_META_DATA } from '@/constants';
import { Metadata } from 'next';
import InstructsScreen from './components/page';

export const metadata: Metadata = CEO_META_DATA.instruct;

export default function MetaPage() {
  return <InstructsScreen />;
}
