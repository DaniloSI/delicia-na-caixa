function TimeInterval({ timeInterval, onChange, checked }) {
  return (
    <label htmlFor={timeInterval} className="grow">
      <div className="flex justify-between">
        {timeInterval}
        <input
          id={timeInterval}
          name="time"
          type="radio"
          className="radio radio-primary"
          checked={checked === timeInterval}
          value={timeInterval}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </label>
  );
}

export default TimeInterval;
