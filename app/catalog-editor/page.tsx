'use client';

import dynamic from 'next/dynamic';

const CatalogBuilder = dynamic(
  () => import('./components/CatalogBuilder'),
  { ssr: false }
);

export default function CatalogEditorPage() {
  return <CatalogBuilder />;
} 