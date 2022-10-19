import React from 'react';
import SubLayout from 'components/SubLayout';
import { GetServerSideProps } from 'next';
import { withAuth } from 'utills/isLoggedIn';
import SettingWrapper from 'components/survey/setting/SettingWrapper';

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
