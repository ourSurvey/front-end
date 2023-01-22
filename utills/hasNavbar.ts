export const hasNavbar = (url: string): boolean => {
  if (url === '/' || url === '/survey' || url === '/mySurvey') return true;
  else return false;
};
