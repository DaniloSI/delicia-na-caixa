import { forwardRef } from "react";

const TextInputCustom = (
  {
    className,
    leftIcon: LeftIcon,
    before,
    rightIcon: RightIcon,
    after,
    disabled,
    ...rest
  },
  ref,
) => (
  <div
    className="input input-bordered flex items-center gap-2"
    disabled={disabled}
  >
    {before}
    {LeftIcon && <LeftIcon className="min-h-5 h-5 min-w-5 w-5 text-gray-400" />}
    <input ref={ref} {...rest} className={`grow text-base ${className}`} />
    {RightIcon && (
      <RightIcon className="min-h-5 h-5 min-w-5 w-5 text-gray-400" />
    )}
    {after}
  </div>
);

export default forwardRef(TextInputCustom);
