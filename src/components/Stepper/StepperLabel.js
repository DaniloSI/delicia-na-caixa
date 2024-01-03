'use client'

import React, { useContext } from 'react';

import StepperContext from '@/contexts/stepper';

const DoneIcon = () => (
  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
  </svg>
)

const StepperLabel = ({ name, done, isLast, index }) => {
  const { active, setActiveStep } = useContext(StepperContext);
  const isActive = index === active

  return (
    <li
      className={`flex items-center ${isActive ? 'text-gray-900': ''} after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden after:inline-block after:mx-6`}
      onClick={() => setActiveStep(index)}
    >
      <span className={`flex items-center ${isLast ? "after:content-['/']" : ''} after:mx-2 after:text-gray-200 cursor-pointer`}>
        {done ? <DoneIcon /> : <span className="me-2">{index + 1}</span>} {name}
      </span>
  </li>
  )
}

export default StepperLabel;