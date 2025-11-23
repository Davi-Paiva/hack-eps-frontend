import React from 'react'
import type { Farm } from '../../types/farm'
import { farmService } from '../../services/farmService'
import EntityTable from '../EntityTable/EntityTable'

type Props = {
  searchQuery?: string
  onRowSelect?: (farm: Farm | null) => void
  reloadKey?: any
}

const FarmTable: React.FC<Props> = ({ searchQuery, onRowSelect, reloadKey }) => {
  return (
    <EntityTable<Farm>
      fetcher={farmService.getAll}
      searchQuery={searchQuery}
      reloadKey={reloadKey}
      onRowSelect={onRowSelect}
      rowKey={(f: Farm) => f._id ?? f.farm_id ?? f.name}
      columns={[
        { header: 'Name', accessor: (f: Farm) => f.name },
        { header: 'Latitude', accessor: (f: Farm) => f.lat },
        { header: 'Longitude', accessor: (f: Farm) => f.lon },
        { header: 'Capacity', accessor: (f: Farm) => f.capacity, isNumeric: true },
        { header: 'Inventory', accessor: (f: Farm) => f.inventory_pigs ?? '-', isNumeric: true },
        { header: 'Avg Weight (kg)', accessor: (f: Farm) => f.avg_weight_kg ?? '-', isNumeric: true },
      ]}
    />
  )
}

export default FarmTable
