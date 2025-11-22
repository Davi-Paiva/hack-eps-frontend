import React, { useState, useEffect, type KeyboardEvent } from 'react'
import {
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Input,
  IconButton,
  useColorModeValue,
  Box,
} from '@chakra-ui/react'
import { FiSearch } from 'react-icons/fi'
import { CloseIcon } from '@chakra-ui/icons'

type Props = {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onSearch?: (value: string) => void
  size?: 'sm' | 'md' | 'lg'
  /** optional aria-label for accessibility */
  'aria-label'?: string
}

const SearchInput: React.FC<Props> = ({
  placeholder = 'Search...',
  value,
  onChange,
  onSearch,
  size = 'md',
  'aria-label': ariaLabel = 'search-input',
}) => {
  const [internal, setInternal] = useState<string>(value ?? '')
  const bg = useColorModeValue('gray.50', 'gray.700')

  useEffect(() => {
    if (typeof value === 'string') setInternal(value)
  }, [value])

  const handleChange = (v: string) => {
    setInternal(v)
    onChange?.(v)
  }

  const handleClear = () => {
    setInternal('')
    onChange?.('')
    onSearch?.('')
  }

  const triggerSearch = () => {
    onSearch?.(internal)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      triggerSearch()
    }
  }

  return (
    <Box>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FiSearch />
        </InputLeftElement>
        <Input
          aria-label={ariaLabel}
          placeholder={placeholder}
          value={internal}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          bg={bg}
          size={size}
        />
        <InputRightElement>
          {internal ? (
            <IconButton
              aria-label="clear"
              icon={<CloseIcon />}
              size={size}
              variant="ghost"
              onClick={handleClear}
            />
          ) : (
            <IconButton
              aria-label="search"
              icon={<FiSearch />}
              size={size}
              variant="ghost"
              onClick={triggerSearch}
            />
          )}
        </InputRightElement>
      </InputGroup>
    </Box>
  )
}

export default SearchInput
