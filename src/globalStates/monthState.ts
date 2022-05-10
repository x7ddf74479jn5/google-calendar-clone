import { atom, selector, useRecoilValue, useSetRecoilState } from "recoil";

import { dayjs } from "@/lib/dayjs";

type Month = number;

type MonthIndexState = Month;

const monthState = atom<MonthIndexState>({
  key: "monthIndexState",
  default: 0,
});

export const monthIndexSelector = selector<MonthIndexState>({
  key: "monthSelector",
  get: ({ get }) => {
    const smallCalendarMonth = get(smallCalendarMonthState);
    const monthIndex = get(monthState);

    if (smallCalendarMonth !== null) {
      return smallCalendarMonth;
    }

    return monthIndex;
  },
});

// export const useMonthIndexState = () => {
//   const setMonthIndex= useSetRecoilState(monthState);
//   const smallCalendarMonth = useSmallCalendarMonthState()

//   useEffect(() => {
//     if (smallCalendarMonth !== null) {
//       setMonthIndex(smallCalendarMonth);
//     }
//   }, [smallCalendarMonth]);

//   return useRecoilValue(monthState);
// };

export const useMonthIndexMutators = () => {
  const setMonth = useSetRecoilState(monthState);

  const goToPrevMonth = () => {
    setMonth((state) => state - 1);
  };

  const goToNextMonth = () => {
    setMonth((state) => state + 1);
  };

  const resetMonth = () => {
    setMonth((state) => (state === dayjs().month() ? state + Math.random() : dayjs().month()));
  };

  return {
    goToPrevMonth,
    goToNextMonth,
    resetMonth,
  };
};

type SmallCalendarMonthState = Month;

const smallCalendarMonthState = atom<SmallCalendarMonthState>({
  key: "smallCalendarMonthState",
  default: 0,
});

export const useSmallCalendarMonthState = () => {
  return useRecoilValue(smallCalendarMonthState);
};

export const useSmallCalendarMonthMutation = () => {
  return useSetRecoilState(smallCalendarMonthState);
};
