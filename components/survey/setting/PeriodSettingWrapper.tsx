import { useState, memo } from 'react';
import Portal from 'components/common/Portal';
import ModalTemplate from 'components/modal/ModalTemplate';
import DatePickerModal from 'components/modal/DatePickerModal';
import PeriodSetting from './PeriodSetting';
const PeriodSettingWrapper = () => {
  const [showModalState, setshowModalState] = useState(false);

  return (
    <>
      <PeriodSetting setshowModalState={setshowModalState} />
      <Portal selector="#portal">
        <ModalTemplate height={50} visibleState={showModalState} setVisible={setshowModalState}>
          <DatePickerModal />
        </ModalTemplate>
      </Portal>
    </>
  );
};

export default memo(PeriodSettingWrapper);
