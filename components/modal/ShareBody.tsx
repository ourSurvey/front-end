import Close from 'public/icon/close.svg';
import Insta from 'public/icon/insta.svg';
import Kakao from 'public/icon/kakao.svg';
import styled from '@emotion/styled';
import { Pretendard, Common, SpaceBetween } from 'styles/common';
import { useRouter } from 'next/router';
import { toastState } from 'states/modal';
import { useRecoilState } from 'recoil';
import { useCallback } from 'react';
import { Button } from 'components/common/Button';

type Props = {
  setVisible: (bool: boolean) => void;
  title: string;
  content: string;
  id: any;
};

const ShareBody = ({ setVisible, title, content, id }: Props) => {
  const [ToastState, setToastState] = useRecoilState(toastState);
  const router = useRouter();
  const surveyUrl: string = `${process.env.NEXT_PUBLIC_URL}${router.asPath}`;

  const handleCopy = useCallback(() => {
    if (navigator.clipboard) {
      // (IE는 사용 못하고, 크롬은 66버전 이상일때 사용 가능합니다.)
      navigator.clipboard
        .writeText(surveyUrl)
        .then(() => {
          // alert("클립보드에 복사되었습니다.");
          console.log('클립보드에 복사되었습니다.');
          setToastState({
            ...ToastState,
            visible: true,
            text: '클립보드에 복사되었습니다.',
            toastType: 'success',
            marginPosition: 50,
            hUnit: '%',
          });
        })
        .catch(() => {
          alert('복사를 다시 시도해주세요.');
          setToastState({
            ...ToastState,
            visible: true,
            text: '복사를 다시 시도해주세요.',
            toastType: 'error',
            marginPosition: 50,
            hUnit: '%',
          });
        });
    } else {
      // 흐름 2.
      if (!document.queryCommandSupported('copy')) {
        alert('복사하기가 지원되지 않는 브라우저입니다.');
        return setToastState({
          ...ToastState,
          visible: true,
          text: '복사하기가 지원되지 않는 브라우저입니다.',
          toastType: 'error',
          marginPosition: 50,
          hUnit: '%',
        });
      }

      // 흐름 3.
      const textarea: HTMLTextAreaElement = document.createElement('textarea');
      textarea.value = surveyUrl;
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.position = 'fixed';

      // 흐름 4.
      document.body.appendChild(textarea);
      // focus() -> 사파리 브라우저 서포팅
      textarea.focus();
      // select() -> 사용자가 입력한 내용을 영역을 설정할 때 필요
      textarea.select();
      // 흐름 5.
      document.execCommand('copy');
      // 흐름 6.
      document.body.removeChild(textarea);
      alert('클립보드에 복사되었습니다.');
      setToastState({
        ...ToastState,
        visible: true,
        text: '클립보드에 복사되었습니다.',
        toastType: 'success',
        marginPosition: 50,
        hUnit: '%',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onShareButton = () => {
    window.Kakao.Share.sendCustom({
      templateId: 84445,
      templateArgs: {
        title: title,
        desc: content,
        url: `/survey/${id}`,
      },
    });
  };

  return (
    <>
      <Absolute>
        <Close width="14" height="14" fill={Common.colors.GY900} onClick={() => setVisible(false)} />
      </Absolute>
      <ShareSpan>공유하기</ShareSpan>
      <IconContainer>
        <div className="center">
          <div className="icons">
            <Kakao onClick={onShareButton} />
            <Insta />
          </div>
          <Button
            height={38}
            fontFamily="pretendard"
            fontSize={1.2}
            fontWeight={700}
            hUnit="px"
            isDisabled={false}
            textColor="#fff"
            color={Common.colors.GY700}
            btnText="URL 복사"
            onClick={handleCopy}
          />
        </div>
      </IconContainer>
    </>
  );
};

export default ShareBody;

const IconContainer = styled.div`
  margin-top: 21px;
  height: 60%;
  ${SpaceBetween()}
  flex-direction: column;
  align-items: center;

  & .center {
    width: 70%;
    ${SpaceBetween()}
    flex-direction: column;
  }
  & .icons {
    ${SpaceBetween()}
    margin-bottom:14px;
    width: 100%;
  }
  & svg {
    display: inline;
    position: static;
  }

  & button {
    outline: none;
    border: none;
    border-radius: 3px;
  }
`;

const Absolute = styled.div`
  position: relative;
  display: flex;
  & svg {
    margin-left: auto;
  }
`;

const ShareSpan = styled.span`
  ${Pretendard({ font: 1.6, weight: 700, color: Common.colors.GY900 })};
  line-height: 150%;
  display: block;
  text-align: center;
`;
