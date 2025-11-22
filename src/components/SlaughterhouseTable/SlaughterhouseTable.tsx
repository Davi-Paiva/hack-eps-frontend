import React from 'react'
import type { Slaughterhouse } from '../../types/slaughterhouse'
import { slaughterhouseService } from '../../services/slaughterhouseService'
import EntityTable from '../EntityTable/EntityTable'

type Props = {
  searchQuery?: string
}

const SlaughterhouseTable: React.FC<Props> = ({ searchQuery }) => {
  return (
    <EntityTable<Slaughterhouse>
      fetcher={slaughterhouseService.getAll}
      searchQuery={searchQuery}
      rowKey={(s: Slaughterhouse) => s._id ?? s.name}
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
