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
  useColorModeValue,
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
  const evenBg = useColorModeValue('gray.50', 'gray.700')
  const hoverBg = useColorModeValue('gray.100', 'gray.600')
  const selectedBg = useColorModeValue('blue.50', 'blue.900')
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
          <Table variant="simple" size="md">
            <Thead>
              <Tr>
                {columns.map((c) => (
                  <Th key={c.header} isNumeric={c.isNumeric} fontSize="md" py={3}>
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
                    bg={isSelected ? selectedBg : idx % 2 === 0 ? evenBg : undefined}
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
                    {columns.map((c, ci) => (
                      <Td key={ci} isNumeric={c.isNumeric} py={3} fontSize="md">
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
