import { useState } from 'react'
import { Button, VStack, Heading, useToast } from '@chakra-ui/react'
import { FormField } from '../FormField/FormField'
import { farmService } from '../../services/farmService'
import type { FarmFormData } from '../../types/farm'

interface ImportFarmProps {
  endpoint: string
  onSuccess?: () => void
}

export default function ImportFarm({ endpoint, onSuccess }: ImportFarmProps) {
  const [form, setForm] = useState<FarmFormData>({ name: '', lat: '', lon: '', capacity: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const update = (field: keyof FarmFormData) => (value: string) => 
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const success = await farmService.create(endpoint, {
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

  return (
    <VStack as="form" spacing={5} w="full" onSubmit={handleSubmit}>
      <Heading size="lg" mb={2}>Add Farm</Heading>
      <FormField label="Farm Name" value={form.name} onChange={update('name')} placeholder="Enter farm name" />
      <FormField label="Latitude" value={form.lat} onChange={update('lat')} placeholder="41.608433" isNumber />
      <FormField label="Longitude" value={form.lon} onChange={update('lon')} placeholder="0.623446" isNumber />
      <FormField label="Capacity" value={form.capacity} onChange={update('capacity')} placeholder="1000" isNumber />
      <Button type="submit" colorScheme="blue" size="lg" w="full" isLoading={isSubmitting}>
        Add Farm
      </Button>
    </VStack>
  )
}
