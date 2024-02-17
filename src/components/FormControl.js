import { twMerge } from "tailwind-merge";

function FormControl({
  labelTop,
  labelAltTop,
  labelBottom,
  labelAltBottom,
  children,
  className = ''
}) {
  return (
    <label className={twMerge("form-control w-full", className)}>
      <div className="label">
        <span className="label-text">{labelTop}</span>
        {labelAltTop && <span className="label-text-alt">{labelAltTop}</span>}
      </div>
      {children}
      {(labelBottom || labelAltBottom) && (
        <div className="label">
          {labelBottom && <span className="label-text-alt">{labelBottom}</span>}
          {labelAltBottom && (
            <span className="label-text-alt">{labelAltBottom}</span>
          )}
        </div>
      )}
    </label>
  );
}

export default FormControl;
