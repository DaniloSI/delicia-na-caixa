import { TextInput as TextInputFlowBite } from 'flowbite-react';
import { forwardRef } from 'react';

const TextInput = (props, ref) => (
  <TextInputFlowBite
    ref={ref}
    {...props}
    className="text-base"
  />
)

export default forwardRef(TextInput);