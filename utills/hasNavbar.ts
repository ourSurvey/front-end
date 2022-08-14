export const hasNavbar = (url: string): boolean => {
  if (url === "/" || url === "/survey") return true;
  else return false;
};
