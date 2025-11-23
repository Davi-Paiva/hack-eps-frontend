import React from 'react'
import { Button } from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'

type Props = {
  onClick: () => void
  isDisabled?: boolean
  size?: 'sm' | 'md' | 'lg'
  colorScheme?: string
  variant?: 'solid' | 'ghost' | 'outline' | 'link'
  ariaLabel?: string
}

const DeleteButton: React.FC<Props> = ({ onClick, isDisabled = false, size = 'sm', colorScheme = 'red', variant = 'solid', ariaLabel = 'Delete' }) => {
  return (
    <Button
      size={size}
      colorScheme={colorScheme}
      variant={variant}
      leftIcon={<DeleteIcon />}
      onClick={onClick}
      isDisabled={isDisabled}
      aria-label={ariaLabel}
    >
      Delete
    </Button>
  )
}

export default DeleteButton
