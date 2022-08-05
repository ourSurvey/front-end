import { atom, selector } from "recoil";

interface IProps {
  toastType: "error" | "success"; //알럿의 색깔을 표시
  text: string;
  visible: boolean;
}

export const toastState = atom<IProps>({
  key: "toastState",
  default: { toastType: "success", text: "", visible: false },
});

export const showToastState = selector({
  key: "showToastValue",
  get: ({ get }) => {
    const visible = get(toastState);
    return visible.visible;
  },
});
