import { FaAngleRight } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

import FormControl from "@/components/FormControl";
import TextInputCustom from "@/components/TextInputCustom";

function AddAddress({ onClick }) {
  return (
    <FormControl>
      <TextInputCustom
        className="text-sm"
        id="address"
        placeholder="Clique aqui e adicione um endereço"
        leftIcon={FaLocationDot}
        rightIcon={FaAngleRight}
        onClick={onClick}
        readOnly
      />
    </FormControl>
  );
}

export default AddAddress;
