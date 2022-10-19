import { atom, selector } from 'recoil';

interface IProps {
  toastType: 'error' | 'success'; //알럿의 색깔을 표시
  text: string;
  visible: boolean;
  marginPosition: number;
  hUnit: string;
}

export const toastState = atom<IProps>({
  key: 'toastState',
  default: { toastType: 'success', text: '', visible: false, marginPosition: 0, hUnit: 'px' },
});

export const showToastState = selector({
  key: 'showToastValue',
  get: ({ get }) => {
    const visible = get(toastState);
    return visible.visible;
  },
});
