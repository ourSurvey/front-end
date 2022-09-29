import { NextPage } from 'next';
import Prev from 'public/icon/prevArrow.svg';
import { Common, Pretendard, SpaceBetween } from 'styles/common';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import CloseCircle from 'public/icon/close-circle.svg';
import { useRef, useState } from 'react';
import SearchTagList from 'components/survey/setting/SearchTagList';
import ShowTagList from 'components/survey/setting/ShowTagList';
import { tagState } from 'states/tag';
import { toastState } from 'states/modal';
import { useRecoilState } from 'recoil';
import Portal from 'components/common/Portal';
import ModalTemplate from 'components/modal/ModalTemplate';
import LeavePageAlert from 'components/survey/setting/LeavePageAlert';
import { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { withAuth } from 'utills/isLoggedIn';

export const getServerSideProps: GetServerSideProps = withAuth(() => {
  return {
    props: {},
  };
});
interface IStyle {
  inputFocus?: boolean;
  tag: string;
}

const AddTag: NextPage = () => {
  const router = useRouter();
  const [tag, setTag] = useState('');
  const [visibleAlertState, setVisibleAlertState] = useState(false);
  const [ToastState, setToastState] = useRecoilState(toastState);
  const [destination, setDestination] = useState('');
  const [leave, setLeave] = useState(false);
  const [inputFocus, setinputFocus] = useState(false);
  const refs = useRef<HTMLInputElement>(null);
  const [tagList, setTagList] = useRecoilState(tagState);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTag(e.target.value);
  };

  const onReset = () => {
    setTag('');
    refs.current && refs.current.focus();
  };

  const addTagHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setTagList([...new Set([...tagList, tag])]);
      onReset();
    }
  };
  const addTagClick = () => {
    setTagList([...new Set([...tagList, tag])]);
    onReset();
  };

  const handleRouteChange = (url: string) => {
    console.log('얘가 실행되나');

    setLeave(true);
    setDestination(url);
    throw `Route change to "${url}" was aborted (this error can be safely ignored).`;
  };
  const leavePage = () => {
    setLeave(false);
    setVisibleAlertState(true);
  };

  const onSave = () => {
    setToastState({
      ...ToastState,
      text: '태그가 저장되었습니다.',
      toastType: 'success',
    });
    setVisibleAlertState(true);
    // setTimeout(() => {
    //   leavePage();
    // }, 500);
  };

  //뒤로가기 이벤트 감지
  useEffect(() => {
    //if (tagList.length === 0) return;  파일이 업로드되지 않은 상태에선 자유롭게 뒤로가도됨
    router.events.on('routeChangeStart', handleRouteChange);
    if (visibleAlertState) {
      setVisibleAlertState(false);
      router.replace('/write/setting');
      router.events.off('routeChangeStart', handleRouteChange);
    }

    return () => {
      console.log('종료');

      router.events.off('routeChangeStart', handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destination, visibleAlertState]);

  return (
    <Container tag={tag}>
      <Header>
        <SvgPosition>
          <Prev width="20" height="16" onClick={() => router.back()} />
        </SvgPosition>
        <PageTitle>태그 추가</PageTitle>
        <Save onClick={onSave}>저장</Save>
      </Header>

      <InputContainer inputFocus={inputFocus} tag={tag}>
        <span className="shapp" />
        <input
          onKeyUp={addTagHandler}
          ref={refs}
          id="tag-input"
          type="text"
          placeholder="태그를 입력해주세요."
          onChange={(e) => onChangeHandler(e)}
          onBlur={() => setinputFocus(false)}
          onFocus={() => setinputFocus(true)}
          value={tag}
        />
        <button onClick={addTagClick}>추가</button>
        <CloseCircle onClick={onReset} />
      </InputContainer>

      <CountContainer>
        <span className="current">{tagList.length}&nbsp;</span>
        <span className="maximun">
          |{' '}
          {tagList.length === 30 && tag !== '' ? (
            <ErrorMessage>최대 30개까지 추가할 수 있습니다.</ErrorMessage>
          ) : (
            '최대 30개'
          )}
        </span>
      </CountContainer>

      {tag !== '' ? <SearchTagList inputValue={tag} onReset={onReset} /> : <ShowTagList />}

      {leave && (
        <Portal selector="#portal">
          <ModalTemplate height={25} visibleState={leave} setVisible={setLeave}>
            <LeavePageAlert setLeavePage={leavePage} setVisible={setLeave} />
          </ModalTemplate>
        </Portal>
      )}
    </Container>
  );
};

export default AddTag;

const Container = styled.main<IStyle>`
  height: 100%;
  & input {
    padding: 14.5px 15px 14.5px 24px;
    border: 1px solid ${Common.colors.GY300};
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    border-top-right-radius: ${(props) => (props.tag !== '' ? 0 : 10)}px;
    border-bottom-right-radius: ${(props) => (props.tag !== '' ? 0 : 10)}px;
    height: 46px;
    width: 100%;
    ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY900 })}
    line-height: 150%;
  }
  & input::placeholder {
    ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY500 })}
    line-height: 150%;
  }
`;

const Header = styled.header`
  ${SpaceBetween()};
  align-items: center;
  padding: 0 20px 20px 14px;
  border-bottom: 1px solid ${Common.colors.GY100};
  width: calc(100% + 40px);
  margin: 0 -20px 24px -20px;
`;

const PageTitle = styled.span`
  ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.GY900 })};
  line-height: 150%;
`;
const Save = styled.span`
  ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY900 })};
  line-height: 150%;
`;

const SvgPosition = styled.div`
  position: relative;
  top: 25%;
  -webkit-transform: translateY(25%);
  -ms-transform: translateY(25%);
  transform: translateY(25%);
`;

const CountContainer = styled.div`
  margin-top: 14px;
  margin-bottom: 24px;
  & .current {
    ${Pretendard({ font: 1.2, weight: 700, color: Common.colors.GY900 })}
  }
  & .maximun {
    ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY500 })}
  }
`;

const InputContainer = styled.div<IStyle>`
  position: relative;
  width: 100%;
  display: flex;

  & input {
    border-top-right-radius: ${(props) => (props.tag !== '' ? 0 : 10)}px;
    border-bottom-right-radius: ${(props) => (props.tag !== '' ? 0 : 10)}px;
  }
  & .shapp {
    position: absolute;
    top: 11px;
    left: 16px;

    &::before {
      content: '#';
      ${Pretendard({ font: 1.4, weight: 400, color: Common.colors.GY500 })};
      line-height: 150%;
    }
  }

  & svg {
    display: ${(props) => (props.tag !== '' ? 'block' : 'none')};
    position: absolute;
    right: 64px;
    top: 13px;
  }
  & button {
    display: ${(props) => (props.tag !== '' ? 'block' : 'none')};
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

    border: 1px solid ${Common.colors.GY700};

    background-color: ${Common.colors.GY50};
    width: 50px;
    ${Pretendard({ font: 1.4, weight: 700, color: Common.colors.BL500 })};
    line-height: 150%;
  }
`;

const ErrorMessage = styled.span`
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.alert500 })}
`;
