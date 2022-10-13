import styled from '@emotion/styled';
import ko from 'date-fns/locale/ko';
import { addDays } from 'date-fns';
import { Pretendard, Common, AlignAndJustifyCenter } from 'styles/common';
import { DateRange } from 'react-date-range';
import { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useRecoilState } from 'recoil';
import { surveyState } from 'states/survey';
export interface RangeWithKey extends Range {
  key: 'selection';
}

interface IStyle {
  width: number;
}

export type OnChangeProps = Range | { selection: RangeWithKey } | Date;

const DatePickerModal = () => {
  const [dayWidth, setdayWidth] = useState(0);
  const [survey, setSurvey] = useRecoilState(surveyState);
  const compareTime = (startDate: Date, endDate: Date) => {
    const timeMs = endDate.getTime() - startDate.getTime();
    return timeMs / 1000 / 60 / 60 / 24; //일로 변경
  };

  useEffect(() => {
    const width = document.getElementsByClassName('rdrDay rdrDayToday')[0].clientWidth;
    setdayWidth(width);

    const rdrInRangeList = document.getElementsByClassName('rdrInRange');
    // if (compareTime(startDate, endDate) === 1) {
    //   const rdrStartEdge = document.getElementsByClassName('rdrStartEdge')[0];
    //   const rdrEndEdge = document.getElementsByClassName('rdrEndEdge')[0];

    //   // rdrStartEdge.classList.toggle('rightRange');
    //   rdrEndEdge.classList.toggle('leftRange');
    // }

    if (rdrInRangeList.length > 0) {
      rdrInRangeList[0].classList.toggle('leftRange');
      rdrInRangeList[rdrInRangeList.length - 1].classList.toggle('rightRange');
    }
  }, [survey.startDate, survey.endDate]);

  const selectRagne = {
    startDate: survey.startDate,
    endDate: survey.endDate,
    key: 'Selection',
  };

  const handleSelect = (ranges: any) => {
    setSurvey({ ...survey, startDate: ranges.Selection.startDate });
    setSurvey({ ...survey, endDate: ranges.Selection.endDate });
  };

  return (
    <DatePickerContainer width={dayWidth}>
      <h1>설문 진행기간을 선택해주세요</h1>
      <DateWrapper>
        <DateRange
          minDate={addDays(new Date(), 0)}
          maxDate={addDays(new Date(), 120)}
          direction="vertical"
          ranges={[selectRagne]}
          moveRangeOnFirstSelection={false}
          onChange={handleSelect}
          color={Common.colors.GY900}
          locale={ko}
          rangeColors={[Common.colors.BL50]}
          showMonthArrow={false} //다음달로 이동하는 화살표 없애기
          showDateDisplay={false} //위 날짜 디스플레이 없애기
          scroll={{ enabled: true }}
          months={3}
          dateDisplayFormat={'yyyy.mm'}
          showMonthAndYearPickers={false}
          monthDisplayFormat={'yyyy.MM'}
        />
      </DateWrapper>
    </DatePickerContainer>
  );
};

export default DatePickerModal;

const DatePickerContainer = styled.div<IStyle>`
  & h1 {
    text-align: center;
    ${Pretendard({ font: 1.6, weight: 700, color: Common.colors.GY900 })}
  }

  & .rdrDayNumber {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })}
  }

  & .rdrDay {
    position: relative;
    ${AlignAndJustifyCenter()};
  }
  & .rdrDayNumber {
    z-index: 2;
  }

  & .rdrMonthAndYearWrapper {
    display: none;
  }

  & .rdrInfiniteMonths {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &.rdrCalendarWrapper,
  .rdrDateRangeWrapper {
    width: 100%;
  }

  & .rdrMonth {
    width: 100%;
  }

  & .rdrDayEndOfWeek .rdrInRange {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
  & .rdrDayStartOfWeek .rdrInRange {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }

  & .rdrMonthName {
    text-align: center;
    ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY900 })};
    line-height: 150%;
  }

  & .leftRange::before {
    content: '';
    width: ${(props) => props.width / 2}px;
    height: 26px;
    position: absolute;
    top: 0;
    bottom: 5px;
    left: -${(props) => props.width / 2}px;
    background-color: ${Common.colors.BL50};
    z-index: 0;
  }
  & .rightRange::after {
    content: '';
    width: ${(props) => props.width / 2}px;
    height: 26px;
    position: absolute;
    top: 0;
    bottom: 5px;
    right: -${(props) => props.width / 2}px;
    background-color: ${Common.colors.BL50};
    z-index: 0;
  }

  & .rdrStartEdge,
  .rdrEndEdge {
    background-color: ${Common.colors.GY900};
    border-radius: 50%;
    width: 26px;
    height: 26px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
  & .rdrDay:not(.rdrDayPassive) .rdrStartEdge ~ .rdrDayNumber span,
  .rdrDay:not(.rdrDayPassive) .rdrEndEdge ~ .rdrDayNumber span {
    ${Pretendard({ font: 1.2, weight: 700, color: '#fff' })};
  }
  & .rdrDay:not(.rdrDayPassive) .rdrInRange ~ .rdrDayNumber span,
  .rdrDay:not(.rdrDayPassive) .rdrSelected ~ .rdrDayNumber span {
    color: ${Common.colors.GY700};
  }
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
