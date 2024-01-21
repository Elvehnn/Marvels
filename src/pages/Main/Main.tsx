import Link from '@mui/material/Link';
import MainLayout from '../../components/MainLayout/MainLayout';

const Main = () => {
  return (
    <MainLayout background isMainPage>
      <>
        <Link href="#">Войти</Link>
        <Link href="/search">Искать</Link>
      </>
    </MainLayout>
  );
};

export default Main;
