import { FC, ReactElement, useRef } from 'react';
import Footer from '../Footer/Footer';
import { Search, SearchPanelStyle } from '../Search/Search';
import './MainLayout.scss';
import { CSSTransition } from 'react-transition-group';

type MainLayoutProps = {
  children?: ReactElement;
  searchStyle?: SearchPanelStyle;
  background?: boolean;
};

const MainLayout: FC<MainLayoutProps> = ({ children, searchStyle, background }) => {
  const mainBackground = background
    ? { background: `url('./ZoCtEVBYKzo.jpg') no-repeat top center / cover` }
    : { backgroundColor: '#FFF' };

  const nodeRef = useRef(null);

  return (
    <CSSTransition in={true} nodeRef={nodeRef} timeout={300} classNames="opacity" unmountOnExit>
      <main className="main" style={mainBackground} ref={nodeRef}>
        <section className="main__search">
          <Search {...searchStyle} />
        </section>
        {children}
        <Footer />
      </main>
    </CSSTransition>
  );
};

export default MainLayout;
