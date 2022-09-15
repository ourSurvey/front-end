import { atom, DefaultValue, selector } from "recoil";

export const tagState = atom<string[]>({
  key: "tagState",
  default: [],
});
