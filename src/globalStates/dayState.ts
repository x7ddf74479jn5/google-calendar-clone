import { atom, useRecoilValue, useSetRecoilState } from "recoil";

import type { Dayjs } from "@/lib/dayjs";
import { dayjs } from "@/lib/dayjs";

type DayState = Dayjs;

const dayState = atom<DayState>({
  key: "dayState",
  default: dayjs(),
});

export const useDayState = () => {
  return useRecoilValue(dayState);
};

export const useDayMutation = () => {
  return useSetRecoilState(dayState);
};
