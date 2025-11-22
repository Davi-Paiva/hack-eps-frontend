import { useState } from 'react'
import { Button, VStack, Heading, useToast } from '@chakra-ui/react'
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

  return (
    <VStack as="form" spacing={5} w="full" onSubmit={handleSubmit}>
      <Heading size="lg" mb={2}>Add Slaughterhouse</Heading>
      <FormField label="Slaughterhouse Name" value={form.name} onChange={update('name')} placeholder="Enter name" />
      <FormField label="Latitude" value={form.lat} onChange={update('lat')} placeholder="41.608433" isNumber />
      <FormField label="Longitude" value={form.lon} onChange={update('lon')} placeholder="0.623446" isNumber />
      <FormField label="Daily Capacity" value={form.capacity_per_day} onChange={update('capacity_per_day')} placeholder="1000" isNumber />
      <Button type="submit" colorScheme="blue" size="lg" w="full" isLoading={isSubmitting}>
        Add Slaughterhouse
      </Button>
    </VStack>
  )
}
