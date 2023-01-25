import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

interface IProps {
  id: string;
}

const useScrollHeight = ({ id }: IProps) => {
  const [sectionHeight, setSectionHeight] = useState<number | undefined>(0);
  const targetElement = useRef<HTMLElement>(null);

  useEffect(() => {
    if (targetElement.current === null) return;
    const height = targetElement.current.getBoundingClientRect().top;
    console.log('height', height);

    setSectionHeight(height);
  }, [targetElement.current]);

  const Section = styled.section`
    height: calc(100% - ${sectionHeight}px);
  `;

  return [targetElement, Section];
};

export default useScrollHeight;
