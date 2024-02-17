import { twMerge } from 'tailwind-merge'

const Divider = ({ className }) => <hr className={twMerge('h-px my-4 bg-gray-200 border-0', className)} />;

export default Divider;