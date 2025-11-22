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
  /** optional custom filter function (items, query) => filteredItems */
  filterFn?: (items: T[], query: string) => T[]
}

function EntityTable<T>({ fetcher, columns, rowKey, tableMaxH = '420px', searchQuery, filterFn }: Props<T>) {
  const [items, setItems] = useState<T[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const evenBg = useColorModeValue('gray.50', 'gray.700')
  const hoverBg = useColorModeValue('gray.100', 'gray.600')

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
  }, [fetcher])

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

  return (
    <Box>
      <TableContainer maxH={tableMaxH} overflowY="auto">
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
              {displayedItems.map((it, idx) => (
                <Tr
                  key={rowKey ? rowKey(it) : String(idx)}
                  bg={idx % 2 === 0 ? evenBg : undefined}
                  _hover={{ bg: hoverBg }}
                >
                  {columns.map((c, ci) => (
                    <Td key={ci} isNumeric={c.isNumeric} py={3} fontSize="md">
                      {c.accessor(it)}
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </TableContainer>
    </Box>
  )
}

export default EntityTable
