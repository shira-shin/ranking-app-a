// app/ja/create/page.tsx
import dynamic from 'next/dynamic';

const CreateClient = dynamic(() => import('./CreateClient'), { ssr: false });

export default function CreatePage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6">
      <CreateClient />
    </main>
  );
}
