import { Label } from "flowbite-react";

function FieldContainer({ id, label, className = "", children }) {
  return (
    <div className={`text-start flex flex-col gap-2 ${className}`}>
      <Label htmlFor={id} value={label} />
      {children}
    </div>
  );
}

export default FieldContainer;
