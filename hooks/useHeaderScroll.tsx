import { useRef, useState, useCallback, useLayoutEffect } from "react";
import useThrottle from "hooks/useThrottle";
import { debounce } from "lodash";

export const useHeaderScroll = () => {
  //scroll이 일어나는 container. 현재 scroll 내린 만큼의 값을 구하기 위해
  const scrollContainerRef = useRef<any>(null);
  //과거 스크롤 값 저장
  const [prevY, setPrevY] = useState(0);
  const [hide, setHide] = useState(false);

  const handleScroll = useCallback(
    (e: any) => {
      // 현재위치와 이전 위치의 차를 계산한다.
      const diff = e.target.scrollTop - prevY;
      if (diff > 0) {
        //내려가는 중
        // 헤더를 보여줄지 말지 set
        setHide(false);
      } else if (diff < 0) {
        //올라가는 중
        setHide(true);
      }
      setPrevY(e.target.scrollTop);
    },
    [prevY]
  );

  // 스크롤이 멈췄는지 확인해주는 핸들러
  const stopScroll = useCallback((e: any) => {
    // console.log("🥎🥎🥎멈춤", e.target.scrollTop);
    setHide(true);
    // 스크롤이 가장 끝까지 올라가면 헤더보임.
    if (e.target.scrollTop === 0) {
      setHide(true);
    }
  }, []);

  const throttleScroll: any = useThrottle(handleScroll, 300);
  const debounceScroll: any = debounce(stopScroll, 1500);

  const scrollDetectHandler = useCallback(
    (...e: any) => {
      throttleScroll(...e);
      debounceScroll(...e);
    },
    [prevY]
  );

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.addEventListener("scroll", scrollDetectHandler);
    }
    return () => {
      if (!scrollContainerRef.current) return;
      scrollContainerRef.current.removeEventListener("scroll", scrollDetectHandler);
    };
  }, [prevY]);

  return { hide, scrollDetectHandler };
};
