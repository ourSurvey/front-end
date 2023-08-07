import React from 'react';
import { type GetServerSideProps } from 'next';
import SubLayout from 'components/SubLayout';
import SettingWrapper from 'components/survey/setting/SettingWrapper';
import { withAuth } from 'utills/isLoggedIn';

export const getServerSideProps: GetServerSideProps = withAuth(() => {
  return {
    props: {},
  };
});

export default function Setting() {
  return (
    <>
      <SettingWrapper />
    </>
  );
}

Setting.getLayout = function getLayout(page: React.ReactElement) {
  return <SubLayout>{page}</SubLayout>;
};
