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
  const [inventory, setInventory] = React.useState<string>('')
  const [avgWeight, setAvgWeight] = React.useState<string>('')
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    if (farm) {
      setName(farm.name ?? '')
      setLat(String(farm.lat ?? ''))
      setLon(String(farm.lon ?? ''))
      setCapacity(String(farm.capacity ?? ''))
      setInventory(String(farm.inventory_pigs ?? ''))
      setAvgWeight(String(farm.avg_weight_kg ?? ''))
    }
  }, [farm])

  const handleSave = async () => {
    console.log("farm:", farm)
    if (!farm) return
    // prefer non-empty domain id `farm_id`, otherwise fall back to Mongo `_id`
    const rawId = (farm as any).farm_id
    const idToUse = rawId && String(rawId).trim().length > 0 ? String(rawId).trim() : farm._id
    if (!idToUse) return
    setSaving(true)
    const payload: Partial<Farm> = {
      name: name.trim(),
      lat: Number(lat),
      lon: Number(lon),
      capacity: Number(capacity),
      ...(inventory.trim() ? { inventory_pigs: Number(inventory) } : {}),
      ...(avgWeight.trim() ? { avg_weight_kg: Number(avgWeight) } : {}),
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
      <ModalContent bg="black" borderColor="gray.700" borderWidth="1px">
        <ModalHeader color="white">Edit Farm</ModalHeader>
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
              <FormLabel color="gray.300">Capacity</FormLabel>
              <NumberInput value={capacity} onChange={(v) => setCapacity(v)}>
                <NumberInputField bg="gray.800" color="white" borderColor="gray.600" />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel color="gray.300">Inventory (pigs)</FormLabel>
              <NumberInput value={inventory} onChange={(v) => setInventory(v)}>
                <NumberInputField bg="gray.800" color="white" borderColor="gray.600" />
              </NumberInput>
            </FormControl>
            <FormControl>
              <FormLabel color="gray.300">Avg Weight (kg)</FormLabel>
              <NumberInput value={avgWeight} onChange={(v) => setAvgWeight(v)}>
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

export default FarmEditModal
