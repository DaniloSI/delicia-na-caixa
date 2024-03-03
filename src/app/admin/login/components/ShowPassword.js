import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

function ShowPassword({ showPassword, setShowPassword }) {
  return (
    <button
      type="button"
      className="btn btn-ghost"
      onClick={(e) => {
        e.stopPropagation();
        setShowPassword((s) => !s);
      }}
    >
      {showPassword ? (
        <HiOutlineEyeOff className="size-5" />
      ) : (
        <HiOutlineEye className="size-5" />
      )}
    </button>
  );
}

export default ShowPassword;
