'use client'

import React, { useContext } from 'react';

import StepperLabel from './StepperLabel';
import StepperContext from '@/contexts/stepper';

const StepperContainer = ({ children }) => {
  const { steps } = useContext(StepperContext);

  return (
    <>
      <ul className="steps w-full px-2">
        {steps.map(({ name, done }, index) => (
          <StepperLabel
            key={name}
            name={name}
            done={done}
            isLast={index === steps.length - 1}
            index={index}
          />
        ))}
      </ul>
      {children}
    </>
  )
}

export default StepperContainer;