import React from 'react'
import { Button, type ButtonProps } from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'

type Props = Omit<ButtonProps, 'onClick'> & {
  onClick?: () => void
  label?: string
}

const EditButton: React.FC<Props> = ({ onClick, label = 'Edit', size = 'sm', variant = 'outline', colorScheme = 'blue', ...rest }) => {
  return (
    <Button
      leftIcon={<EditIcon />}
      size={size}
      variant={variant}
      colorScheme={colorScheme}
      onClick={onClick}
      {...rest}
    >
      {label}
    </Button>
  )
}

export default EditButton
