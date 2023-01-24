import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

interface IProps {
  id: string;
}

const useScrollHeight = ({ id }: IProps) => {
  const [sectionHeight, setSectionHeight] = useState<number | undefined>(0);

  useEffect(() => {
    const height = document.getElementById(id)?.getBoundingClientRect().top;
    console.log('height', height);

    setSectionHeight(height);
  }, []);

  const Section = styled.section`
    height: calc(100% - ${sectionHeight}px);
  `;

  return Section;
};

export default useScrollHeight;
