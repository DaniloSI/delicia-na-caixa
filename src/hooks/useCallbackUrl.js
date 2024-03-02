const { useSearchParams } = require("next/navigation");

const useCallbackUrl = () => {
  const searchParams = useSearchParams();
  return searchParams.get("callbackUrl") || "/admin";
};

export default useCallbackUrl;
