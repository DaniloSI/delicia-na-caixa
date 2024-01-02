import { Label } from "flowbite-react"
import TextInput from "./TextInput"
import { useFormContext } from "react-hook-form"


const AddressField = ({ name, label, placeholder }) => {
  const { setValue } = useFormContext()
  
  return (
    <>
      <Label htmlFor={name} value={label} />
      <TextInput
        id={name}
        placeholder={placeholder}
        onChange={(e) => setValue(name, e.target.value)}
      />
    </>
  )
}

export default AddressField