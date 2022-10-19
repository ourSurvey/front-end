import { useRef } from 'react';

const useScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollPoint = <div ref={scrollRef} />;
  const moveScrollPoint = () => scrollRef.current?.scrollIntoView({ behavior: 'smooth' });

  return { scrollPoint, moveScrollPoint };
};

export default useScroll;
