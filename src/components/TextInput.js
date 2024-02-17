import { forwardRef } from "react";

const TextInput = ({ className, ...rest }, ref) => (
  <input ref={ref} {...rest} className={`input input-bordered text-base ${className}`} />
);

export default forwardRef(TextInput);
