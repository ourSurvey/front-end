import { useState, memo } from 'react';
import Portal from 'components/common/Portal';
import DatePickerModal from 'components/modal/DatePickerModal';
import ModalTemplate from 'components/modal/ModalTemplate';
import PeriodSetting from './PeriodSetting';
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
