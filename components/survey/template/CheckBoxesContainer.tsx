import { type ReactElement, useEffect, useState } from 'react';
import CheckBox from 'components/common/CheckBox';

interface IProps {
  values: string[];
  dupFl: boolean;
  onChange: (selectedValues: string[]) => void;
}

const CheckBoxesContainer = ({ values, dupFl, onChange }: IProps): ReactElement => {
  const [checkedValues, setCheckedValues] = useState<IProps['values']>([]);

  useEffect(() => {
    onChange(checkedValues);
  }, [checkedValues, onChange]);

  const handleCheck = (value: string, isChecked: boolean): void => {
    console.log('value', value, 'isChecked', isChecked, checkedValues);
    if (dupFl) {
      setCheckedValues((prev) =>
        prev.includes(value) ? prev.filter((prevValue) => prevValue !== value) : [...prev, value]
      );
    } else {
      setCheckedValues([value]);
    }
  };

  return (
    <>
      {values.map((value) => {
        return (
          <CheckBox
            key={value}
            checked={false}
            data={value}
            checkItems={checkedValues}
            checkedItemHandler={handleCheck}
          >
            <span>{value}</span>
          </CheckBox>
        );
      })}
    </>
  );
};

export default CheckBoxesContainer;
