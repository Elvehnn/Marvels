import Link from '@mui/material/Link';
import MainLayout from '../../components/MainLayout/MainLayout';
import { memo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { authSelectors } from '../../store/slices/auth/authSlice';

const Main = () => {
  const { isAuth } = useAppSelector(authSelectors.all);

  return (
    <MainLayout background isMainPage>
      <div className="container">
        {isAuth ? <Link href="/favourites">Избранное</Link> : <Link href="/signin">Войти</Link>}
        <Link href="/search">Искать</Link>
      </div>
    </MainLayout>
  );
};

export default memo(Main);
