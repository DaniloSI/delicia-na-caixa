import { IMaskMixin } from 'react-imask';
import { TextInput } from 'flowbite-react';

const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
  <TextInput
    {...props}
    ref={inputRef}
  />
))

export default MaskedInput;