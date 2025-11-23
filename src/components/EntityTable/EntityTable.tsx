import React, { useEffect, useState } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Box,
  Text,
} from '@chakra-ui/react'

type Column<T> = {
  header: string
  accessor: (item: T) => React.ReactNode
  isNumeric?: boolean
}

type Props<T> = {
  fetcher: () => Promise<T[]>
  columns: Column<T>[]
  rowKey?: (item: T) => string
  /** optional search query to filter displayed items */
  searchQuery?: string
  /** optional key to trigger refetch when changed */
  reloadKey?: any
  /** optional custom filter function (items, query) => filteredItems */
  filterFn?: (items: T[], query: string) => T[]
  /** allow rows to be selectable by clicking */
  rowSelectable?: boolean
  /** callback when a row is selected */
  onRowSelect?: (item: T | null) => void
}

function EntityTable<T>({ fetcher, columns, rowKey, searchQuery, reloadKey, filterFn, rowSelectable = true, onRowSelect }: Props<T>) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true
    const load = async () => {
      setLoading(true)
      const data = await fetcher()
      if (mounted) setItems(data)
      setLoading(false)
    }
    load()
    return () => {
      mounted = false
    }
  }, [fetcher, reloadKey])

  const displayedItems = React.useMemo(() => {
    if (!searchQuery || searchQuery.trim() === '') return items
    const q = searchQuery.toLowerCase()
    if (filterFn) return filterFn(items, searchQuery)
    try {
      return items.filter((it) => JSON.stringify(it).toLowerCase().includes(q))
    } catch (e) {
      return items
    }
  }, [items, searchQuery, filterFn])

  const handleContainerClick = (e: React.MouseEvent) => {
    // e.target can be a Text node (nodeType === 3) which doesn't implement Element.closest.
    // Walk up to the nearest Element ancestor, then check for a containing <tr>.
    let node: Node | null = e.target as Node | null
    while (node && node.nodeType !== 1) {
      node = node.parentNode
    }
    const el = node as Element | null
    if (!el || !el.closest('tr')) {
      setSelectedKey(null)
      onRowSelect?.(null as any)
    }
  }

  return (
    <Box 
      bg="transparent"
      borderRadius="0.5rem"
      overflow="hidden"
      border="1px solid"
      borderColor="#252525"
      h="100%"
      display="flex"
      flexDirection="column"
    >
      <TableContainer 
        flex="1"
        overflowY="auto" 
        onClick={handleContainerClick}
        sx={{
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#ff6b4a',
            borderRadius: '3px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#ff4d93',
          },
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" py={12}>
            <Spinner 
              color="#ff6b4a" 
              size="xl"
              thickness="4px"
              speed="0.65s"
            />
          </Box>
        ) : items.length === 0 ? (
          <Box display="flex" justifyContent="center" alignItems="center" py={12}>
            <Text color="#a0a0a0" fontSize="lg">No items found</Text>
          </Box>
        ) : (
          <Table variant="unstyled" size="sm">
            <Thead position="sticky" top={0} bg="#2d2d2d" zIndex={1}>
              <Tr>
                {columns.map((c) => (
                  <Th 
                    key={c.header} 
                    isNumeric={c.isNumeric} 
                    fontSize="xs" 
                    py={4}
                    px={4}
                    color="#a0a0a0"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    fontWeight="600"
                    borderBottom="2px solid"
                    borderColor="#3a3a3a"
                  >
                    {c.header}
                  </Th>
                ))}
              </Tr>
            </Thead>
            <Tbody>
              {displayedItems.map((it, idx) => {
                const key = rowKey ? rowKey(it) : String(idx)
                const isSelected = key !== undefined && key === selectedKey
                return (
                  <Tr
                    key={key}
                    bg={isSelected ? 'rgba(255, 107, 74, 0.12)' : 'transparent'}
                    _hover={{ 
                      bg: isSelected ? 'rgba(255, 107, 74, 0.18)' : 'rgba(58, 58, 58, 0.3)',
                    }}
                    cursor={rowSelectable && rowKey ? 'pointer' : undefined}
                    transition="background 0.2s ease"
                    borderBottom="1px solid"
                    borderColor="#252525"
                    onClick={() => {
                      if (rowSelectable && rowKey) {
                        setSelectedKey((prev) => {
                          const newKey = prev === key ? null : key
                          onRowSelect?.(newKey === null ? null : it)
                          return newKey
                        })
                      }
                    }}
                  >
                    {columns.map((c, ci) => (
                      <Td 
                        key={ci} 
                        isNumeric={c.isNumeric} 
                        py={4}
                        px={4}
                        fontSize="sm" 
                        color={isSelected ? "#ffffff" : "#d4d4d4"}
                        fontWeight={isSelected ? "500" : "normal"}
                        borderBottom="none"
                      >
                        {c.accessor(it)}
                      </Td>
                    ))}
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        )}
      </TableContainer>
    </Box>
  )
}

export default EntityTable
