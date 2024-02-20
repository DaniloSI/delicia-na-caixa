'use client'

import React, { useContext } from 'react';

import StepperContext from '@/contexts/stepper';

const StepperItem = ({ step, className = '', children }) => {
  const { active } = useContext(StepperContext);
  return (
    <div className={`mx-4 mb-6 ${step !== active ? 'hidden' : ''} ${className}`}>
      {children}
    </div>
  )
}

export default StepperItem;