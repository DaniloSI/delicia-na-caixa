"use client";

import React, { useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";

import StepperContext from "@/contexts/stepper";
import useStepValidation from "@/hooks/useStepValidation";

const StepperLabel = ({ name, isLast, index }) => {
  const { active, setActiveStep, stepsDone } = useContext(StepperContext);
  const { validateStep } = useStepValidation();
  const isActive = index === active;
  const isBeforeDone = stepsDone.includes(index - 1);
  const isDone = stepsDone.includes(index);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [active]);

  const handleClick = async () => {
    const stepsToValidate = Array.from({ length: index }, (_, i) => i);

    for (const step of stepsToValidate) {
      const isValid = await validateStep(step);
      if (!isValid) return;
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
