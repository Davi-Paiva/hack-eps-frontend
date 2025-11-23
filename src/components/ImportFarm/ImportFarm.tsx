import { useState } from 'react'
import { Button, VStack, Heading, useToast, Input, FormControl, FormLabel, Divider, Text } from '@chakra-ui/react'
import { FormField } from '../FormField/FormField'
import { farmService } from '../../services/farmService'
import type { FarmFormData } from '../../types/farm'

interface ImportFarmProps {
  onSuccess?: () => void
}

export default function ImportFarm({ onSuccess }: ImportFarmProps) {
  const [form, setForm] = useState<FarmFormData>({ name: '', lat: '', lon: '', capacity: '', inventory: '', avgWeight: '' })
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
      capacity: parseInt(form.capacity),
      ...(form.inventory ? { inventory_pigs: parseInt(form.inventory) } : {}),
      ...(form.avgWeight ? { avg_weight_kg: parseFloat(form.avgWeight) } : {}),
    })

    toast({
      title: success ? 'Farm added successfully!' : 'Failed to add farm',
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    })

    if (success) {
      setForm({ name: '', lat: '', lon: '', capacity: '', inventory: '', avgWeight: '' })
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
      <Heading size="lg" mb={2} color="white">Add Farm</Heading>
      
      {/* CSV Import Section */}
      <VStack spacing={3} w="full" p={4} bg="gray.800" borderRadius="md" borderWidth="1px" borderColor="gray.700">
        <Text fontWeight="bold" fontSize="md" color="gray.300">Import from CSV</Text>
        <FormControl>
          <Input
            type="file"
            accept=".csv"
            onChange={handleCSVUpload}
            disabled={isUploadingCSV}
            p={1}
            color="white"
            bg="gray.900"
            borderColor="gray.600"
            _hover={{ borderColor: "gray.500" }}
          />
        </FormControl>
        {isUploadingCSV && <Text fontSize="sm" color="orange.400">Uploading...</Text>}
      </VStack>

      <Divider borderColor="gray.700" />

      {/* Manual Entry Form */}
      <VStack as="form" spacing={5} w="full" onSubmit={handleSubmit}>
        <Text fontWeight="bold" fontSize="md" color="gray.300">Or add manually</Text>
        <FormField label="Farm Name" value={form.name} onChange={update('name')} placeholder="Enter farm name" />
        <FormField label="Latitude" value={form.lat} onChange={update('lat')} placeholder="41.608433" isNumber />
        <FormField label="Longitude" value={form.lon} onChange={update('lon')} placeholder="0.623446" isNumber />
        <FormField label="Capacity" value={form.capacity} onChange={update('capacity')} placeholder="1000" isNumber />
        <FormField label="Inventory (pigs)" value={form.inventory ?? ''} onChange={update('inventory')} placeholder="500" isNumber />
        <FormField label="Avg Weight (kg)" value={form.avgWeight ?? ''} onChange={update('avgWeight')} placeholder="60.5" isNumber />
      <Button 
        type="submit" 
        size="lg" 
        w="full" 
        isLoading={isSubmitting}
        bg="linear-gradient(to right, #fb923c, #f472b6)"
        color="white"
        _hover={{ bg: "linear-gradient(to right, #ff6b4a, #dd2a7b)" }}
      >
        Add Farm
      </Button>
      </VStack>
    </VStack>
  )
}
