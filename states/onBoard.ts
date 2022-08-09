import { atom } from "recoil";

interface IonBoard {
  gender: string | null;
  age: number | null;
  tel: string | null;
}

export const addtionState = atom<IonBoard>({
  key: "addtionState",
  default: { gender: null, age: null, tel: null },
});
