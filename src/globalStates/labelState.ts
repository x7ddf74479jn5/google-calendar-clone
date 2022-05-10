import { useCallback, useEffect } from "react";
import { atom, useRecoilState} from "recoil";

import type { Event } from "@/models/event";

type Label = {
  label: string;
  isChecked: boolean;
};

type LabelState = Label[];

const labelState = atom<LabelState>({
  key: "labelState",
  default: [],
});


export const useLabelState = (savedEvents: Event[]) => {
  const [labels, setLabels] = useRecoilState(labelState);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((event) => event.label))].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return { label, isChecked: currentLabel ? currentLabel.isChecked : true };
      });
    });
  }, [savedEvents]);

  return labels;
};

export const useUpdateLabel = (label: Label) => {
  const [labels, setLabels] = useRecoilState(labelState);

  const updateLabel = useCallback(() => {
    setLabels(labels.map((lbl) => (lbl.label === label.label ? label : lbl)));
  }, [label, labels, setLabels]);

  return updateLabel;
};
