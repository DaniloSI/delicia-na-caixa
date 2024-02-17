function FormControl({
  labelTop,
  labelAltTop,
  labelBottom,
  labelAltBottom,
  children,
}) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{labelTop}</span>
        {labelAltTop && <span className="label-text-alt">{labelAltTop}</span>}
      </div>
      {children}
      <div className="label">
        {labelBottom && <span className="label-text-alt">{labelBottom}</span>}
        {labelAltBottom && (
          <span className="label-text-alt">{labelAltBottom}</span>
        )}
      </div>
    </label>
  );
}

export default FormControl;
