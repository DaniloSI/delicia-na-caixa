"use client";

import React, { useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { twMerge } from "tailwind-merge";

import StepperContext from "@/contexts/stepper";
import useStepValidations from "@/hooks/useStepValidations";

const StepperLabel = ({ name, isLast, index }) => {
  const { active, setActiveStep, stepsDone, addStepDone, removeStepDone } =
    useContext(StepperContext);
  const { validateStep } = useStepValidations();
  const isActive = index === active;
  const isBeforeDone = stepsDone.includes(index - 1);
  const isDone = stepsDone.includes(index);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [active]);

  const handleClick = () => {
    const validationsResult = Array.from({ length: index }, (_, i) =>
      validateStep(i),
    );

    validationsResult.forEach((r, i) => {
      if (r?.length > 0) {
        removeStepDone(i);
      } else {
        addStepDone(i);
      }
    });

    const errorIndex = validationsResult.findIndex(
      (r, i) => r?.length > 0 && i < index,
    );

    if (errorIndex >= 0) {
      return toast.error(validationsResult[errorIndex]);
    }

    setActiveStep(index);
  };

  return (
    <li
      key={`step-${index}-${isDone}-${isActive}`}
      className={twMerge(
        "step cursor-pointer text-sm",
        isDone || isActive || isBeforeDone ? "step-primary" : "",
      )}
      data-content={isDone || (isLast && isActive) ? "✓" : index + 1}
      onClick={handleClick}
    >
      <span className="text-xs">{name}</span>
    </li>
  );
};

export default StepperLabel;
