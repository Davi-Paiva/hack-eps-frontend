import { useState } from 'react'
import { Button, VStack, Heading, useToast, Input, FormControl, Divider, Text } from '@chakra-ui/react'
import { FormField } from '../FormField/FormField'
import { slaughterhouseService } from '../../services/slaughterhouseService'
import type { SlaughterhouseFormData } from '../../types/slaughterhouse'

interface ImportSlaughterhouseProps {
  onSuccess?: () => void
}

export default function ImportSlaughterhouse({ onSuccess }: ImportSlaughterhouseProps) {
  const [form, setForm] = useState<SlaughterhouseFormData>({ 
    name: '', 
    lat: '', 
    lon: '', 
    capacity_per_day: '' 
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingCSV, setIsUploadingCSV] = useState(false)
  const toast = useToast()

  const update = (field: keyof SlaughterhouseFormData) => (value: string) => 
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const success = await slaughterhouseService.create({
      name: form.name,
      lat: parseFloat(form.lat),
      lon: parseFloat(form.lon),
      capacity_per_day: parseInt(form.capacity_per_day)
    })

    toast({
      title: success ? 'Slaughterhouse added successfully!' : 'Failed to add slaughterhouse',
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    })

    if (success) {
      setForm({ name: '', lat: '', lon: '', capacity_per_day: '' })
      onSuccess?.()
    }

    setIsSubmitting(false)
  }

  const handleCSVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploadingCSV(true)

    const success = await slaughterhouseService.importCSV(file)

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
      <Heading size="lg" mb={2}>Add Slaughterhouse</Heading>
      
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
      <FormField label="Slaughterhouse Name" value={form.name} onChange={update('name')} placeholder="Enter name" />
      <FormField label="Latitude" value={form.lat} onChange={update('lat')} placeholder="41.608433" isNumber />
      <FormField label="Longitude" value={form.lon} onChange={update('lon')} placeholder="0.623446" isNumber />
      <FormField label="Daily Capacity" value={form.capacity_per_day} onChange={update('capacity_per_day')} placeholder="1000" isNumber />
      <Button type="submit" colorScheme="blue" size="lg" w="full" isLoading={isSubmitting}>
        Add Slaughterhouse
      </Button>
      </VStack>
    </VStack>
  )
}
