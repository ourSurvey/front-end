import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
  children: React.ReactNode;
  selector: string;
}

const Portal = ({ children, selector }: IProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, [selector]);

  return mounted ? createPortal(children, document.querySelector(selector) as HTMLParagraphElement) : null;
};

export default Portal;
