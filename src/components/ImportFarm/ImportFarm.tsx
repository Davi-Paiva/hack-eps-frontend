import { useState } from 'react'
import { Button, VStack, Heading, useToast, Input, FormControl, FormLabel, Divider, Text } from '@chakra-ui/react'
import { FormField } from '../FormField/FormField'
import { farmService } from '../../services/farmService'
import type { FarmFormData } from '../../types/farm'

interface ImportFarmProps {
  onSuccess?: () => void
}

export default function ImportFarm({ onSuccess }: ImportFarmProps) {
  const [form, setForm] = useState<FarmFormData>({ name: '', lat: '', lon: '', capacity: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingCSV, setIsUploadingCSV] = useState(false)
  const toast = useToast()

  const update = (field: keyof FarmFormData) => (value: string) => 
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const success = await farmService.create({
      name: form.name,
      lat: parseFloat(form.lat),
      lon: parseFloat(form.lon),
      capacity: parseInt(form.capacity)
    })

    toast({
      title: success ? 'Farm added successfully!' : 'Failed to add farm',
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    })

    if (success) {
      setForm({ name: '', lat: '', lon: '', capacity: '' })
      onSuccess?.()
    }

    setIsSubmitting(false)
  }

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingCSV(true)

    const success = await farmService.importCSV(file)

    toast({
      title: success ? 'CSV imported successfully!' : 'Failed to import CSV',
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    })

    if (success) {
      onSuccess?.()
      e.target.value = ''
    }

    setIsUploadingCSV(false)
  }

  return (
    <VStack spacing={5} w="full">
      <Heading size="lg" mb={2}>Add Farm</Heading>
      
      {/* CSV Import Section */}
      <VStack spacing={3} w="full" p={4} bg="gray.50" borderRadius="md">
        <Text fontWeight="bold" fontSize="md">Import from CSV</Text>
        <FormControl>
          <Input
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            disabled={isUploadingCSV}
            p={1}
          />
        </FormControl>
        {isUploadingCSV && <Text fontSize="sm" color="blue.500">Uploading...</Text>}
      </VStack>

      <Divider />

      {/* Manual Entry Form */}
      <VStack as="form" spacing={5} w="full" onSubmit={handleSubmit}>
        <Text fontWeight="bold" fontSize="md">Or add manually</Text>
      <FormField label="Farm Name" value={form.name} onChange={update('name')} placeholder="Enter farm name" />
      <FormField label="Latitude" value={form.lat} onChange={update('lat')} placeholder="41.608433" isNumber />
      <FormField label="Longitude" value={form.lon} onChange={update('lon')} placeholder="0.623446" isNumber />
      <FormField label="Capacity" value={form.capacity} onChange={update('capacity')} placeholder="1000" isNumber />
      <Button type="submit" colorScheme="blue" size="lg" w="full" isLoading={isSubmitting}>
        Add Farm
      </Button>
      </VStack>
    </VStack>
  )
}
