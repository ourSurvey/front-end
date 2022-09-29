import { useState, useEffect } from 'react';

type Props = {
  minute: number;
  second: number;
};

const Timmer = (props: Props) => {
  const { minute, second } = props;
  const [minutes, setMinutes] = useState(minute);
  const [seconds, setSeconds] = useState(second);
  useEffect(() => {
    const countdown = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(countdown);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => clearInterval(countdown);
  }, [minutes, seconds]);

  return (
    <span>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </span>
  );
};

export default Timmer;
