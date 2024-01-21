import Link from '@mui/material/Link';
import MainLayout from '../../components/MainLayout/MainLayout';
import { memo } from 'react';

const Main = () => {
  return (
    <MainLayout background isMainPage>
      <div className="container">
        <Link href="/signin">Войти</Link>
        <Link href="/search">Искать</Link>
      </div>
    </MainLayout>
  );
};

export default memo(Main);
