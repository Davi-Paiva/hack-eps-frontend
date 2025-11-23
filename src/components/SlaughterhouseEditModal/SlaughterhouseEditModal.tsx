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
import resolveId from '../../utils/idResolver'

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
    // prefer non-empty domain-specific id if present, otherwise use MongoDB _id
    const idToUse = resolveId(slaughterhouse, ['slaughterhouse_id', '_id'])
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
      <ModalContent bg="black" borderColor="gray.700" borderWidth="1px">
        <ModalHeader color="white">Edit Slaughterhouse</ModalHeader>
        <ModalCloseButton color="white" />
        <ModalBody>
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel color="gray.300">Name</FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)} bg="gray.800" color="white" borderColor="gray.600" />
            </FormControl>
            <FormControl>
              <FormLabel color="gray.300">Latitude</FormLabel>
              <NumberInput value={lat} onChange={(v) => setLat(v)}>
                <NumberInputField bg="gray.800" color="white" borderColor="gray.600" />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel color="gray.300">Longitude</FormLabel>
              <NumberInput value={lon} onChange={(v) => setLon(v)}>
                <NumberInputField bg="gray.800" color="white" borderColor="gray.600" />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel color="gray.300">Capacity/day</FormLabel>
              <NumberInput value={capacity} onChange={(v) => setCapacity(v)}>
                <NumberInputField bg="gray.800" color="white" borderColor="gray.600" />
              </NumberInput>
            </FormControl>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose} isDisabled={saving} color="white" _hover={{ bg: "gray.700" }}>
            Cancel
          </Button>
          <Button bg="linear-gradient(to right, #fbbf24, #f59e0b)" color="white" onClick={handleSave} isLoading={saving} _hover={{ bg: "linear-gradient(to right, #f59e0b, #d97706)" }}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default SlaughterhouseEditModal
