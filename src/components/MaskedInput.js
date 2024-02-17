import { IMaskMixin } from 'react-imask';
import TextInputCustom from './TextInputCustom';

const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
  <TextInputCustom
    {...props}
    ref={inputRef}
  />
))

export default MaskedInput;