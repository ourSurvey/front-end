import dynamic from 'next/dynamic';

const DynamicSearchPage = dynamic(() => import('../../components/survey/Search'), {
  ssr: false,
});

export default DynamicSearchPage;
