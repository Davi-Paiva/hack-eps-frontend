import React from 'react'
import type { Slaughterhouse } from '../../types/slaughterhouse'
import { slaughterhouseService } from '../../services/slaughterhouseService'
import resolveId from '../../utils/idResolver'
import EntityTable from '../EntityTable/EntityTable'

type Props = {
  searchQuery?: string
  onRowSelect?: (s: Slaughterhouse | null) => void
  reloadKey?: any
}

const SlaughterhouseTable: React.FC<Props> = ({ searchQuery, onRowSelect, reloadKey }) => {
  return (
    <EntityTable<Slaughterhouse>
      fetcher={slaughterhouseService.getAll}
      searchQuery={searchQuery}
      reloadKey={reloadKey}
      onRowSelect={onRowSelect}
      rowKey={(s: Slaughterhouse) => resolveId(s, ['slaughterhouse_id', '_id']) ?? s.name}
      columns={[
        { header: 'Name', accessor: (s: Slaughterhouse) => s.name },
        { header: 'Latitude', accessor: (s: Slaughterhouse) => s.lat },
        { header: 'Longitude', accessor: (s: Slaughterhouse) => s.lon },
        { header: 'Capacity/day', accessor: (s: Slaughterhouse) => s.capacity_per_day, isNumeric: true },
      ]}
    />
  )
}

export default SlaughterhouseTable
