import { atom, useRecoilValue, useSetRecoilState } from "recoil";

type ModalState = boolean;

const modalState = atom<ModalState>({
  key: "modalState",
  default: false,
});

export const useModalState = () => {
  return useRecoilValue(modalState);
};

export const useModalMutator = () => {
  return useSetRecoilState(modalState);
};
