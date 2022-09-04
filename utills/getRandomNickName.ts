import { noun, determiner } from "utills/nickNameList";

const randomNickName = () => {
  const firstNickName = determiner[Math.floor(Math.random() * determiner.length)];
  const lastNickName = noun[Math.floor(Math.random() * noun.length)];

  return `${firstNickName} ${lastNickName}`;
};

export default randomNickName;
