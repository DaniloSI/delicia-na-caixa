import { twMerge } from "tailwind-merge";

const Divider = ({ className }) => (
  <div className={twMerge("divider h-0", className)} />
);

export default Divider;
