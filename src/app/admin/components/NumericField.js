import { useFormContext } from "react-hook-form";
import FormControl from "@/components/FormControl";
import TextInputCustom from "@/components/TextInputCustom";

function NumericField({ name, label, icon }) {
  const { register } = useFormContext();

  return (
    <FormControl labelTop={label}>
      <TextInputCustom
        id={name}
        type="number"
        inputMode="decimal"
        leftIcon={icon}
        {...register(name, {
          valueAsNumber: true,
        })}
        className="w-8"
      />
    </FormControl>
  );
}

export default NumericField;
