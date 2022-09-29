import { atom } from 'recoil';

export const stepState = atom<1 | 2 | 3>({
  key: 'stepState',
  default: 1,
});
