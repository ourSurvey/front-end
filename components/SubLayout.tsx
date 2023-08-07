import { useEffect } from 'react';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import { hasNavbar } from 'utills/hasNavbar';
import Alert from './common/Alert';
import NavBar from './common/NavBar';
import Portal from './common/Portal';
interface IProps {
  children: JSX.Element;
}

const SubLayout = ({ children }: IProps) => {
  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  const router = useRouter();

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const SubLayoutContainer = styled.div`
    position: relative;
    height: calc(var(--vh) * 100);
    padding: 0;
  `;

  return (
    <SubLayoutContainer>
      {children}
      <Portal selector="#portal">
        <Alert />
      </Portal>
      {hasNavbar(router.asPath) ? <NavBar /> : ''}
    </SubLayoutContainer>
  );
};

export default SubLayout;
