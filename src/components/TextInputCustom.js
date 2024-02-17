import { forwardRef } from "react";

const TextInput = (
  { className, leftIcon: LeftIcon, rightIcon: RightIcon, disabled, ...rest },
  ref
) => (
  <div className="input input-bordered flex items-center gap-2" disabled={disabled}>
    {LeftIcon && <LeftIcon className="min-h-5 h-5 min-w-5 w-5 text-gray-500" />}
    <input ref={ref} {...rest} className={`grow text-base ${className}`} />
    {RightIcon && <RightIcon className="min-h-5 h-5 min-w-5 w-5 text-gray-500" />}
  </div>
);

export default forwardRef(TextInput);
