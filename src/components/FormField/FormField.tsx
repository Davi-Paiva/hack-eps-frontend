import { FormControl, FormLabel, Input, NumberInput, NumberInputField } from '@chakra-ui/react'

interface FormFieldProps {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  isNumber?: boolean
  isRequired?: boolean
}

export function FormField({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  isNumber = false,
  isRequired = true 
}: FormFieldProps) {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      {isNumber ? (
        <NumberInput value={value} onChange={onChange}>
          <NumberInputField placeholder={placeholder} />
        </NumberInput>
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </FormControl>
  )
}
