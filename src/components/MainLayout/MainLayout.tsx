import { FC, memo, useRef } from 'react';
import Footer from '../Footer/Footer';
import { Search, SearchPanelStyle } from '../Search/Search';
import './MainLayout.scss';
import { CSSTransition } from 'react-transition-group';

type MainLayoutProps = {
  children?: React.ReactNode;
  isMainPage?: boolean;
  searchStyle?: SearchPanelStyle;
  background?: boolean;
};

const MainLayout: FC<MainLayoutProps> = ({
  children,
  searchStyle,
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

  return (
    <CSSTransition in={true} nodeRef={nodeRef} timeout={300} classNames="opacity" unmountOnExit>
      <>
        <main className="main" style={mainBackground} ref={nodeRef}>
          {!isMainPage && (
            <section className="main__search">
              <Search {...searchStyle} />
            </section>
          )}
          {children}
        </main>
        <Footer />
      </>
    </CSSTransition>
  );
};

export default memo(MainLayout);
