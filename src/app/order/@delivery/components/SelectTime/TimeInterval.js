import { Label, Radio } from "flowbite-react";

function TimeInterval({ timeInterval, onChange, checked }) {
  return (
    <Label htmlFor={timeInterval} className="grow">
      <div className="flex justify-between">
        {timeInterval}
        <Radio
          id={timeInterval}
          name="time"
          value={timeInterval}
          onChange={(e) => onChange(e.target.value)}
          checked={checked === timeInterval}
          className="text-red-700 focus:ring-orange-500"
        />
      </div>
    </Label>
  );
}

export default TimeInterval;
