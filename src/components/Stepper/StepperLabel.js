"use client";

import React, { useContext, useEffect } from "react";

import StepperContext from "@/contexts/stepper";
import useStepValidations from "@/hooks/useStepValidations";
import { toast } from "react-toastify";

const DoneIcon = () => (
  <svg
    className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
  </svg>
);

const StepperLabel = ({ name, isLast, index }) => {
  const { active, setActiveStep, stepsDone } = useContext(StepperContext);
  const { validateAll } = useStepValidations();
  const isActive = index === active;
  const isDone = stepsDone.includes(index);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [active]);

  return (
    <li
      className={`flex items-center ${
        isActive ? "text-gray-900" : ""
      } after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden after:inline-block after:mx-6`}
      onClick={() => {
        const validationsResult = validateAll();

        if (index > active && index > 0) {
          const error =
            validationsResult.at(active) || validationsResult.at(index - 1);

          if (error) {
            return toast.error(error);
          }
        }

        setActiveStep(index);
      }}
    >
      <span
        className={`flex items-center ${
          isLast ? "after:content-['/']" : ""
        } after:mx-2 after:text-gray-200 cursor-pointer`}
      >
        {isDone ? <DoneIcon /> : <span className="me-2">{index + 1}</span>}{" "}
        {name}
      </span>
    </li>
  );
};

export default StepperLabel;
