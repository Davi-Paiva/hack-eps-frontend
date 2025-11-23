import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  variant?: string
  colorScheme?: string
  children?: React.ReactNode
}

const GoToFarmsButton: React.FC<Props> = ({ 
  size = 'md', 
  variant = 'solid', 
  colorScheme = 'blue',
  children = 'Go to Farms'
}) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/farms')
  }

  return (
    <Button 
      size={size} 
      variant={variant} 
      colorScheme={colorScheme} 
      onClick={handleClick}
    >
      {children}
    </Button>
  )
}

export default GoToFarmsButton
