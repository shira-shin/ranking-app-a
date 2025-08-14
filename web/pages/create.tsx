// pages/create.tsx
import type { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/ja/create',
      permanent: false, // 本番で恒久化したければ true に
    },
  };
};

export default function CreateRedirect() {
  // SSRで即リダイレクトされるため、ここは通常描画されません
  return null;
}
