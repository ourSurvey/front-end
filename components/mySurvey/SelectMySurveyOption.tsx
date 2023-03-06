import { SelectOption } from 'components/survey/template/SelectOptionContainer';

interface IProps {
  willCount: number; //예정 설문 수,
  ingCount: number; //진행 설문 수,
  finCount: number; //종료 설문 수,
  status: null | -1 | 0 | 1;
  setStatus: (status: null | -1 | 0 | 1) => void;
}

const SelectMySurveyOption = ({ willCount, ingCount, finCount, status, setStatus }: IProps) => {
  const viewCountNotZero = (count: number): string => {
    return `${count === 0 ? '' : count}`;
  };

  return (
    <SelectOption color="blue">
      <li onClick={() => setStatus(null)} className={status === null ? 'active' : ''}>
        전체
      </li>
      <li onClick={() => setStatus(-1)} className={status === -1 ? 'active' : ''}>
        예정 {viewCountNotZero(willCount)}
      </li>
      <li onClick={() => setStatus(0)} className={status === 0 ? 'active' : ''}>
        진행 중 {viewCountNotZero(ingCount)}
      </li>
      <li onClick={() => setStatus(1)} className={status === 1 ? 'active' : ''}>
        종료 {viewCountNotZero(finCount)}
      </li>
    </SelectOption>
  );
};

export default SelectMySurveyOption;
