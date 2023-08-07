import { atom, selector } from 'recoil';

interface IonBoard {
  gender: null | 'M' | 'F';
  age: number | null;
  tel: string | null;
}

type LooseObject = Record<string, any>;

export const addtionState = atom<IonBoard>({
  key: 'addtionState',
  default: { gender: null, age: null, tel: null },
});

export const nullDeleteAdttionState = selector({
  key: 'nullDeleteAdttionState',
  get: ({ get }) => {
    const addtionData = get(addtionState);
    const newObj: LooseObject = {};
    for (const [key, value] of Object.entries(addtionData)) {
      // 값이 null이 아닌 값만 넣어서 리턴
      if (value !== null) {
        newObj[key] = value;
      }
    }
    return newObj;
  },
});
