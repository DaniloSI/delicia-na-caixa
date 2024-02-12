const { useSearchParams } = require("next/navigation");

const useCallbackUrl = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  
  return callbackUrl
}

export default useCallbackUrl