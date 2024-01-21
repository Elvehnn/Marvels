import SearchResults from '../../components/SearchResults/SearchResults';
import MainLayout from '../../components/MainLayout/MainLayout';

const style = {
  top: 0,
  left: 0,
  rowGap: '10px',
  alignItems: 'none',
  borderRadius: 0,
  padding: '2vh 4vh',
};

const Main = () => {
  return (
    <MainLayout searchStyle={style}>
      <SearchResults />
    </MainLayout>
  );
};

export default Main;
