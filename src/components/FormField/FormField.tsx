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
      <FormLabel color="gray.300">{label}</FormLabel>
      {isNumber ? (
        <NumberInput value={value} onChange={onChange}>
          <NumberInputField 
            placeholder={placeholder} 
            bg="gray.800" 
            color="white" 
            borderColor="gray.600"
            _hover={{ borderColor: "gray.500" }}
            _focus={{ borderColor: "orange.400", boxShadow: "0 0 0 1px #fb923c" }}
          />
        </NumberInput>
      ) : (
        <Input 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder={placeholder}
          bg="gray.800" 
          color="white" 
          borderColor="gray.600"
          _hover={{ borderColor: "gray.500" }}
          _focus={{ borderColor: "orange.400", boxShadow: "0 0 0 1px #fb923c" }}
        />
      )}
    </FormControl>
  )
}
