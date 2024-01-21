import { FC, memo, useRef } from 'react';
import Footer from '../Footer/Footer';
import './MainLayout.scss';
import { CSSTransition } from 'react-transition-group';
import { SearchPanelStyle } from '../Search/Search';
import AppBar from '@mui/material/AppBar';
import Link from '@mui/material/Link';
import { useAppSelector } from '../../store/hooks';
import { authSelectors } from '../../store/slices/auth/authSlice';

type MainLayoutProps = {
  children?: React.ReactNode;
  isMainPage?: boolean;
  headerStyle?: SearchPanelStyle;
  background?: boolean;
};

const style = {
  top: 0,
  left: 0,
  rowGap: '10px',
  alignItems: 'none',
  borderRadius: 0,
  padding: '2vh 4vh',
};

const MainLayout: FC<MainLayoutProps> = ({
  children,
  headerStyle,
  background,
  isMainPage = false,
}: MainLayoutProps) => {
  const mainBackground = background
    ? {
        background: `url('./marvel-cinematic-poster.jpg') no-repeat top center / cover`,
        height: '100%',
      }
    : { backgroundColor: '#000000' };

  const nodeRef = useRef(null);
  const { isAuth } = useAppSelector(authSelectors.all);

  return (
    <CSSTransition in={true} nodeRef={nodeRef} timeout={300} classNames="opacity" unmountOnExit>
      <>
        <main className="main" style={mainBackground} ref={nodeRef}>
          {!isMainPage && (
            <AppBar className="header" data-testid="header" sx={{ ...style, ...headerStyle }}>
              {isAuth ? (
                <div className="container">
                  <Link href="/" variant="body2" color="#fff" underline="hover">
                    На главную
                  </Link>
                  <Link href="/favourites" variant="body2" color="#fff" underline="hover">
                    Избранное
                  </Link>
                  <Link href="/purchased" variant="body2" color="#fff" underline="hover">
                    Приобретения
                  </Link>
                </div>
              ) : (
                <div className="container">
                  <Link href="/signin" variant="body2" color="#fff" underline="hover">
                    Войти
                  </Link>
                  <Link href="/" variant="body2" color="#fff" underline="hover">
                    На главную
                  </Link>
                </div>
              )}
            </AppBar>
          )}
          {children}
        </main>
        <Footer />
      </>
    </CSSTransition>
  );
};

export default memo(MainLayout);
