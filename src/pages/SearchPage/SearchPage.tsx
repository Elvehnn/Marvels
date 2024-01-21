import SearchResults from '../../components/SearchResults/SearchResults';
import MainLayout from '../../components/MainLayout/MainLayout';
import Search from '../../components/Search/Search';

const Main = () => {
  return (
    <MainLayout>
      <Search />
      <SearchResults />
    </MainLayout>
  );
};

export default Main;
