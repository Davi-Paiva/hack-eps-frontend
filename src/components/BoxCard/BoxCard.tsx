import React from 'react'
import { Box, Heading, useColorModeValue, Divider } from '@chakra-ui/react'

type Props = {
  title?: string
  children: React.ReactNode
  maxW?: string | number
  titleSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  p?: number | string
}

const BoxCard: React.FC<Props> = ({ title, children, maxW = '1400px', titleSize = '2xl', p = 8 }) => {
  const bg = useColorModeValue('white', 'gray.800')
  const dividerColor = useColorModeValue('gray.200', 'gray.700')
  return (
    <Box
      maxW={maxW}
      w="100%"
      mx="auto"
      bg={bg}
      p={p}
      borderRadius="md"
      boxShadow="sm"
    >
      {title ? (
        <>
          <Heading
            size={titleSize}
            mb={4}
            fontWeight="700"
            letterSpacing="wide"
            fontFamily={`"Inter", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`}
          >
            {title}
          </Heading>
          <Divider borderColor={dividerColor} mb={4} />
        </>
      ) : null}
      {children}
    </Box>
  )
}

export default BoxCard
