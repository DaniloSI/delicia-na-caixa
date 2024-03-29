import { useFormContext } from "react-hook-form";
import { FaLocationDot } from "react-icons/fa6";

function EditAddress({ onClick }) {
  const { watch } = useFormContext();
  const address = watch("address");

  return (
    <div className="flex items-center gap-4 rounded-lg border border-gray-300 px-4 py-2 text-sm">
      <FaLocationDot className="size-4 text-gray-400" />
      <div className="grow">
        <p className="font-medium text-gray-700">
          {address.street}, {address.number}
        </p>
        <p className="text-gray-500">
          {address.neighborhood}, {address.city}
        </p>
      </div>
      <button
        className="btn btn-ghost px-0 text-primary hover:bg-transparent"
        type="button"
        onClick={onClick}
      >
        Editar
      </button>
    </div>
  );
}

export default EditAddress;
