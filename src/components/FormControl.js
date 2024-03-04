import { twMerge } from "tailwind-merge";

function FormControl({
  labelTop,
  labelAltTop,
  labelBottom,
  labelAltBottom,
  children,
  className = "",
  required = false,
  isInvalid = false,
}) {
  return (
    <label className={twMerge("form-control w-full", className)}>
      {(labelTop || labelAltTop) && (
        <div className="label">
          {labelTop && (
            <span className="label-text">
              {labelTop} {required && <span className="text-red-500">*</span>}
            </span>
          )}
          {labelAltTop && <span className="label-text-alt">{labelAltTop}</span>}
        </div>
      )}
      {children}
      {(labelBottom || labelAltBottom) && (
        <div className="label">
          {labelBottom && (
            <span
              className={twMerge(
                "label-text-alt",
                isInvalid ? "text-error" : "",
              )}
            >
              {labelBottom}
            </span>
          )}
          {labelAltBottom && (
            <span className="label-text-alt">{labelAltBottom}</span>
          )}
        </div>
      )}
    </label>
  );
}

export default FormControl;
