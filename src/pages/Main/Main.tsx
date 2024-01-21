import MainLayout from '../../components/MainLayout/MainLayout';

const style = {
  position: 'static',
  rowGap: '20px',
  padding: '2vh 4vh',
};

const Main = () => {
  return <MainLayout searchStyle={style} background />;
};

export default Main;
