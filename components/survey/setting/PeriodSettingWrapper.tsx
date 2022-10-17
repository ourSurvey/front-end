import { useState, memo } from 'react';
import Portal from 'components/common/Portal';
import ModalTemplate from 'components/modal/ModalTemplate';
import DatePickerModal from 'components/modal/DatePickerModal';
import PeriodSetting from './PeriodSetting';
import styled from '@emotion/styled';
const PeriodSettingWrapper = () => {
  const [showModalState, setshowModalState] = useState(false);

  return (
    <>
      <PeriodSetting setshowModalState={setshowModalState} />
      <Portal selector="#portal">
        <ModalTemplate
          className="date-picker-modal"
          height={50}
          visibleState={showModalState}
          setVisible={setshowModalState}
        >
          <DatePickerModal setVisible={setshowModalState} />
        </ModalTemplate>
      </Portal>
    </>
  );
};

export default memo(PeriodSettingWrapper);
