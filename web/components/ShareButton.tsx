import { useTranslations } from 'next-intl';

export default function ShareButton({ data }: { data: any }) {
  const t = useTranslations();

  const handleShare = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/share_image`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('failed');
      const blob = await res.blob();
      const file = new File([blob], 'ranking.png', { type: 'image/png' });
      const shareApi = navigator as any;
      if (shareApi.share && shareApi.canShare?.({ files: [file] })) {
        await shareApi.share({ files: [file], title: 'ranking' });
      } else {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'ranking.png';
        link.click();
        URL.revokeObjectURL(url);
      }
    } catch (e) {
      alert('Share failed');
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleShare}>
      {t('share')}
    </button>
  );
}
