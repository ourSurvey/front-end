import { type ReactNode } from 'react';
import styled from '@emotion/styled';
import Link from 'next/link';
import { Common, Pretendard } from 'styles/common';

interface IStyle {
  hashtagList: [] | null;
}

interface IChildren {
  children?: ReactNode;
}
interface ILink extends IChildren {
  url: string;
}

interface IHashTags {
  hashtagList: null | [];
}

interface ISurveyItemMain extends IChildren {
  ref?: React.RefObject<HTMLDivElement>;
}

export const Labels = ({ children }: IChildren) => <UlContainer>{children}</UlContainer>;
export const Subject = ({ children }: IChildren) => <SubjectStyle>{children}</SubjectStyle>;
export const Contents = ({ children }: IChildren) => <Content>{children}</Content>;
export const Periods = ({ children }: IChildren) => <DateContainer>{children}</DateContainer>;
export const LinkButton = ({ children, url }: ILink) => (
  <Link href={url}>
    <a>{children}</a>
  </Link>
);
export const HashTags = ({ hashtagList }: IHashTags) => (
  <>
    {hashtagList != null && hashtagList.length > 0 ? (
      <Hashtag hashtagList={hashtagList}>{hashtagList?.map((item) => `#${item}`)}</Hashtag>
    ) : null}
  </>
);

const SurveyItemMain = ({ children }: ISurveyItemMain) => {
  return <ItemContainer>{children}</ItemContainer>;
};

export const SurveyItem = Object.assign(SurveyItemMain, {
  Labels,
  Subject,
  Contents,
  Periods,
  LinkButton,
  HashTags,
});

const ItemContainer = styled.div`
  padding: 15px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.16);
  border-radius: 14px;
  margin-bottom: 24px;

  width: 100%;
  z-index: 20;
  &:last-child {
    margin-bottom: 0;
  }
`;
const SubjectStyle = styled.h1`
  ${Pretendard({ font: 1.6, weight: 700, color: Common.colors.GY900 })}
  line-height: 150%;
  overflow: hidden;
  white-space: normal;
  display: -webkit-box;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const UlContainer = styled.ul`
  display: flex;
  margin-bottom: 10px;
  list-style-type: none;
  margin-top: 0px;
  padding: 0;
`;

const Content = styled.p`
  ${Pretendard({ font: 1.2, weight: 400, color: Common.colors.GY700 })}
  line-height: 150%;

  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
`;

const DateContainer = styled.span`
  margin-bottom: 10px;
  display: block;
  & span {
    ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY500 })}
  }
  ${Pretendard({ font: 1, weight: 400, color: Common.colors.GY500 })}
`;

const Hashtag = styled.span<IStyle>`
  width: 100%;
  display: -webkit-box;
  ${Pretendard({ font: 1, weight: 700, color: Common.colors.GY500 })};
  line-height: 150%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-top: ${({ hashtagList }) => (hashtagList != null && hashtagList.length > 0 ? '10px' : '0')};
`;
