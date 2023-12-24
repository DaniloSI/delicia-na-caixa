'use client'

import { createContext, useMemo, useState } from 'react';

const StepperContext = createContext(0);

export const StepperContextProvider = ({ steps = [], children }) => {
  const [active, setActive] = useState(0)

  const value = useMemo(() => ({
    active,
    isLastActive: active === steps.length - 1,
    nextStep: () => {
      if (active < steps.length - 1) {
        setActive(active + 1)
      }
    },
    prevStep: () => {
      if (active > 0) {
        setActive(active - 1)
      }
    },
    setActiveStep: (s) => setActive(s)
  }), [active, steps.length])

  return (
    <StepperContext.Provider value={value}>
      {children}
    </StepperContext.Provider>
  )
}

export default StepperContext;