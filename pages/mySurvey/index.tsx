import { useState, useRef } from 'react';
import styled from '@emotion/styled';
import { Common, Pretendard, SpaceBetween } from 'styles/common';
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { motion } from 'framer-motion';
import Participated from 'components/mySurvey/Participated';
import Written from 'components/mySurvey/Written';
import SearchHeader from 'components/common/SearchHeader';

const Index = () => {
  const [navigationIdx, setnavigationIdx] = useState(0);
  const [swiper, setSwiper] = useState<SwiperCore>();
  const menu = ['작성한 설문', '참여한 설문'];

  const onClickPage = (idx: number) => {
    if (swiper) {
      swiper.slideTo(idx, 500);
    }
  };

  const handlePage = (activeIndex: number) => {
    setnavigationIdx(activeIndex);
  };

  return (
    <MySurveyLayout>
      <SearchHeader name="나의 서베이" hasBack={false} hasSearch={false} marginBottom={21.5} />
      <div className="nav">
        {menu.map((item, idx) => {
          return (
            <div
              className={'nav-list ' + (idx === navigationIdx ? 'active' : '')}
              key={item}
              onClick={() => onClickPage(idx)}
            >
              {item}
              {idx === navigationIdx ? <UnderLine layoutId="underline" /> : null}
            </div>
          );
        })}
      </div>
      <TempAlert>
        <span className="alim">임시 저장한 설문이 2개 있어요!</span>{' '}
        <span className="write-next" role="button">
          이어서 작성하기
        </span>
      </TempAlert>
      <Swiper
        onSwiper={setSwiper}
        navigation={false}
        modules={[Navigation]}
        className="mySwiper"
        onSlideChange={(swiper) => handlePage(swiper.activeIndex)}
      >
        <SwiperSlide>
          <Written />
        </SwiperSlide>
        <SwiperSlide>
          <Participated />
        </SwiperSlide>
      </Swiper>
    </MySurveyLayout>
  );
};

export default Index;

const MySurveyLayout = styled(motion.div)`
  height: 100%;
  & .nav {
    ${SpaceBetween()};
    border-bottom: 1px solid ${Common.colors.GY300};
    border-top: 1px solid ${Common.colors.GY100};
    margin: 0 -20px 12px -20px;
    width: 100vw;
    height: 40px;
    ${Pretendard({ weight: 400, font: 1.4, color: Common.colors.GY700 })};
    & .nav-list {
      transition: 0.5s;
      position: relative;
      width: 50%;
      text-align: center;
      list-style-type: none;
      padding: 8px 0px;
      line-height: 150%;
    }
  }

  & .active {
    ${Pretendard({ weight: 700, font: 1.4, color: Common.colors.GY900 })};
  }
  & .swiper {
    height: 100%;
  }
  & .swiper-slide {
    height: 100%;
  }
`;

const UnderLine = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background-color: ${Common.colors.BL500};
`;

const TempAlert = styled.div`
  ${SpaceBetween()};
  background-color: ${Common.colors.GY50};
  border-radius: 90px;
  padding: 10px 20px;
  margin-bottom: 1rem;

  & .alim {
    ${Pretendard({ font: 1.2, color: '#000', weight: 700 })};
    line-height: 150%;
  }

  & .write-next {
    ${Pretendard({ font: 1.2, color: '#000', weight: 400 })};
    line-height: 150%;
  }
`;
