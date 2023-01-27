import { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const useScrollHeight = () => {
  const [sectionHeight, setSectionHeight] = useState<number | undefined>(0);
  const targetElement = useRef<HTMLElement>(null);

  useEffect(() => {
    if (targetElement.current === null) return;
    const height = targetElement.current.getBoundingClientRect().top;

    setSectionHeight(height);
  }, [targetElement.current]);

  const Section = styled.section`
    height: calc(100% - ${sectionHeight}px);
  `;

  return { targetElement, Section };
};

export default useScrollHeight;
