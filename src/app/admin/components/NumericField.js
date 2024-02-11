import TextInput from "@/components/TextInput";
import FieldContainer from "./FieldContainer";
import { useFormContext } from "react-hook-form";

function NumericField({ name, label, icon }) {
  const { register } = useFormContext();

  return (
    <FieldContainer id={name} label={label}>
      <TextInput
        id={name}
        type="number"
        inputMode="decimal"
        icon={icon}
        {...register(name, {
          valueAsNumber: true,
        })}
      />
    </FieldContainer>
  );
}

export default NumericField;
