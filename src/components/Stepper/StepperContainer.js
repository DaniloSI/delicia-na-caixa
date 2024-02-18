import React from 'react';

import StepperLabel from './StepperLabel';

const StepperContainer = ({ steps, children }) => {
  return (
    <>
      <ul className="steps w-full">
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