import MainLayout from '../../components/MainLayout/MainLayout';
import { memo } from 'react';
import { useAppSelector } from '../../store/hooks';
import { authSelectors } from '../../store/slices/auth/authSlice';
import { Link } from 'react-router-dom';

const Main = () => {
  const { isAuth } = useAppSelector(authSelectors.all);

  return (
    <MainLayout background isMainPage>
      <div className="container">
        {isAuth ? (
          <Link to="/purchased" className="main_button">
            <div className="main_button_text">Приобретенное</div>
          </Link>
        ) : (
          <Link to="/signin" className="main_button">
            <div className="main_button_text">Войти</div>
          </Link>
        )}
        <Link to="/search" className="main_button">
          <div className="main_button_text">Искать</div>
        </Link>
      </div>
    </MainLayout>
  );
};

export default memo(Main);
