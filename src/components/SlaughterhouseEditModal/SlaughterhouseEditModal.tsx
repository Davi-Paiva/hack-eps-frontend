import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  useToast,
  VStack,
} from '@chakra-ui/react'
import type { Slaughterhouse } from '../../types/slaughterhouse'
import { slaughterhouseService } from '../../services/slaughterhouseService'

type Props = {
  isOpen: boolean
  onClose: () => void
  slaughterhouse: Slaughterhouse | null
  onSaveSuccess?: () => void
}

const SlaughterhouseEditModal: React.FC<Props> = ({ isOpen, onClose, slaughterhouse, onSaveSuccess }) => {
  const toast = useToast()
  const [name, setName] = React.useState('')
  const [lat, setLat] = React.useState<string>('')
  const [lon, setLon] = React.useState<string>('')
  const [capacity, setCapacity] = React.useState<string>('')
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (slaughterhouse) {
      setName(slaughterhouse.name ?? '')
      setLat(String(slaughterhouse.lat ?? ''))
      setLon(String(slaughterhouse.lon ?? ''))
      setCapacity(String(slaughterhouse.capacity_per_day ?? ''))
    }
  }, [slaughterhouse])

  const handleSave = async () => {
    if (!slaughterhouse) return
    // prefer domain-specific id if present, otherwise use MongoDB _id
    const idToUse = (slaughterhouse as any).slaughterhouse_id ?? slaughterhouse._id
    if (!idToUse) return
    setSaving(true)
    const payload: Partial<Slaughterhouse> = {
      name: name.trim(),
      lat: Number(lat),
      lon: Number(lon),
      capacity_per_day: Number(capacity),
    }
    const ok = await slaughterhouseService.update(String(idToUse), payload)
    setSaving(false)
    if (ok) {
      toast({ title: 'Slaughterhouse updated', status: 'success', duration: 3000, isClosable: true })
      onSaveSuccess?.()
      onClose()
    } else {
      toast({ title: 'Failed to update slaughterhouse', status: 'error', duration: 4000, isClosable: true })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Slaughterhouse</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl>
              <FormLabel>Latitude</FormLabel>
              <NumberInput value={lat} onChange={(v) => setLat(v)}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Longitude</FormLabel>
              <NumberInput value={lon} onChange={(v) => setLon(v)}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel>Capacity/day</FormLabel>
              <NumberInput value={capacity} onChange={(v) => setCapacity(v)}>
                <NumberInputField />
              </NumberInput>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} isDisabled={saving}>
            Cancel
          </Button>
          <Button colorScheme="blue" onClick={handleSave} isLoading={saving}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SlaughterhouseEditModal
