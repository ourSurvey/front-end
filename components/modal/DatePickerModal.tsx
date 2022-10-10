import styled from '@emotion/styled';
import ko from 'date-fns/locale/ko';
import { addDays } from 'date-fns';
import { Pretendard, Common, SpaceBetween } from 'styles/common';
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

export interface RangeWithKey extends Range {
  key: 'selection';
}

export type OnChangeProps = Range | { selection: RangeWithKey } | Date;

const DatePickerModal = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const selectRagne = {
    startDate: startDate,
    endDate: endDate,
    key: 'Selection',
  };

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.Selection.startDate);
    setEndDate(ranges.Selection.endDate);
  };

  return (
    <DatePickerContainer>
      <h1>설문 진행기간을 선택해주세요</h1>
      <div>
        <DateRange
          minDate={addDays(new Date(), -30)}
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
      </div>
    </DatePickerContainer>
  );
};

export default DatePickerModal;

const DatePickerContainer = styled.div`
  & h1 {
    text-align: center;
    ${Pretendard({ font: 1.6, weight: 700, color: Common.colors.GY900 })}
  }

  & .rdrDayNumber {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })}
  }

  & .rdrMonthAndYearWrapper {
    display: none;
  }

  & .rdrInfiniteMonths {
    &::-webkit-scrollbar {
      display: none;
    }
  }

  & .rdrMonthName {
    text-align: center;
    ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY900 })};
    line-height: 150%;
  }

  & .rdrStartEdge,
  .rdrEndEdge {
    background-color: ${Common.colors.GY900};
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
