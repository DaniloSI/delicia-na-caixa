import { TextInput as TextInputFlowBite } from "flowbite-react";
import { forwardRef } from "react";

const TextInput = ({ className, ...rest }, ref) => (
  <TextInputFlowBite ref={ref} {...rest} className={`text-base ${className}`} />
);

export default forwardRef(TextInput);
