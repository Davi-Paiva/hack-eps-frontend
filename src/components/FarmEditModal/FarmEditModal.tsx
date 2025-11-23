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
import type { Farm } from '../../types/farm'
import { farmService } from '../../services/farmService'

type Props = {
  isOpen: boolean
  onClose: () => void
  farm: Farm | null
  onSaveSuccess?: (updated?: Farm | null) => void
}

const FarmEditModal: React.FC<Props> = ({ isOpen, onClose, farm, onSaveSuccess }) => {
  const toast = useToast()
  const [name, setName] = React.useState('')
  const [lat, setLat] = React.useState<string>('')
  const [lon, setLon] = React.useState<string>('')
  const [capacity, setCapacity] = React.useState<string>('')
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (farm) {
      setName(farm.name ?? '')
      setLat(String(farm.lat ?? ''))
      setLon(String(farm.lon ?? ''))
      setCapacity(String(farm.capacity ?? ''))
    }
  }, [farm])

  const handleSave = async () => {
    console.log("farm:", farm)
    if (!farm) return
    // prefer domain-specific id if present, otherwise use MongoDB _id
    const idToUse = (farm as any)._id ?? farm._id
    if (!idToUse) return
    setSaving(true)
    const payload: Partial<Farm> = {
      name: name.trim(),
      lat: Number(lat),
      lon: Number(lon),
      capacity: Number(capacity),
    }
    const ok = await farmService.update(String(idToUse), payload)
    setSaving(false)
    if (ok) {
      toast({ title: 'Farm updated', status: 'success', duration: 3000, isClosable: true })
      onSaveSuccess?.()
      onClose()
    } else {
      toast({ title: 'Failed to update farm', status: 'error', duration: 4000, isClosable: true })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Farm</ModalHeader>
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
              <FormLabel>Capacity</FormLabel>
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

export default FarmEditModal
