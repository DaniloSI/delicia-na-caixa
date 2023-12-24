import React from 'react';

import { StepperContextProvider } from '@/contexts/stepper';
import StepperLabel from './StepperLabel';

const StepperContainer = ({ steps, children }) => {
  return (
    <StepperContextProvider steps={steps}>
      <ol className="flex justify-center text-base font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
        {steps.map(({ name, done }, index) => (
          <StepperLabel
            key={name}
            name={name}
            done={done}
            isLast={index < steps.length - 1}
            index={index}
          />
        ))}
      </ol>
      {children}
    </StepperContextProvider>
  )
}

export default StepperContainer;