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
  /** optional max height for table body (enables scrolling) */
  tableMaxH?: string | number
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

function EntityTable<T>({ fetcher, columns, rowKey, tableMaxH = '420px', searchQuery, reloadKey, filterFn, rowSelectable = true, onRowSelect }: Props<T>) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const evenBg = 'gray.800'
  const hoverBg = 'gray.700'
  const selectedBg = 'blue.900'
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
    <Box>
      <TableContainer maxH={tableMaxH} overflowY="auto" onClick={handleContainerClick}>
        {loading ? (
          <Spinner />
        ) : items.length === 0 ? (
          <Text>No items</Text>
        ) : (
          <Table variant="unstyled" size="md">
            <Thead>
              <Tr>
                <Th w="40px" borderBottom="none"></Th>
                {columns.map((c) => (
                  <Th key={c.header} isNumeric={c.isNumeric} fontSize="md" py={3} borderBottom="none">
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
                    bg={isSelected ? selectedBg : idx % 2 === 0 ? 'black' : evenBg}
                    _hover={{ bg: hoverBg }}
                      cursor={rowSelectable && rowKey ? 'pointer' : undefined}
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
                    <Td w="40px" borderBottom="none">
                      <Box
                        w="16px"
                        h="16px"
                        borderRadius="50%"
                        border="2px solid"
                        borderColor={isSelected ? "blue.400" : "gray.500"}
                        bg={isSelected ? "blue.400" : "transparent"}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        transition="all 0.2s"
                      >
                        {isSelected && (
                          <Box w="6px" h="6px" borderRadius="50%" bg="white" />
                        )}
                      </Box>
                    </Td>
                    {columns.map((c, ci) => (
                      <Td key={ci} isNumeric={c.isNumeric} py={3} fontSize="md" borderBottom="none">
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
