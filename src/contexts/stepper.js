"use client";

import { createContext, useMemo, useState } from "react";

const StepperContext = createContext(0);

export const StepperContextProvider = ({ steps = [], children }) => {
  const [active, setActive] = useState(0);
  const [stepsDone, setStepsDone] = useState([]);

  const value = useMemo(
    () => ({
      steps,
      active,
      isLastActive: active === steps.length - 1,
      stepsDone,
      nextStep: () => {
        if (active < steps.length - 1) {
          setActive(active + 1);
        }
      },
      prevStep: () => {
        if (active > 0) {
          setActive(active - 1);
        }
      },
      setActiveStep: (s) => setActive(s),
      addStepDone: (s) => setStepsDone((old) => [...old, s]),
      removeStepDone: (s) =>
        setStepsDone((old) => old.filter((step) => step !== s)),
    }),
    [steps, active, stepsDone],
  );

  return (
    <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  );
};

export default StepperContext;
