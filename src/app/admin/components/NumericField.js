import { useFormContext } from "react-hook-form";

import FormControl from "@/components/FormControl";
import TextInputCustom from "@/components/TextInputCustom";

function NumericField({ name, label, leftIcon, rightIcon }) {
  const { register } = useFormContext();

  return (
    <FormControl labelTop={label}>
      <TextInputCustom
        id={name}
        type="number"
        inputMode="decimal"
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        {...register(name, {
          valueAsNumber: true,
        })}
        className="w-8"
      />
    </FormControl>
  );
}

export default NumericField;
