import SearchResults from '../../components/SearchResults/SearchResults';
import MainLayout from '../../components/MainLayout/MainLayout';
import Search from '../../components/Search/Search';
import { memo } from 'react';

const SearchPage = () => {
  return (
    <MainLayout>
      <Search />
      <SearchResults />
    </MainLayout>
  );
};

export default memo(SearchPage);
