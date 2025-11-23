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
import { farmService } from '../../services/farmService'
import type { Farm } from '../../types/farm'

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreateSuccess?: () => void
}

const FarmAddModal: React.FC<Props> = ({ isOpen, onClose, onCreateSuccess }) => {
  const toast = useToast()
  const [name, setName] = React.useState('')
  const [lat, setLat] = React.useState<string>('')
  const [lon, setLon] = React.useState<string>('')
  const [capacity, setCapacity] = React.useState<string>('')
  const [inventory, setInventory] = React.useState<string>('')
  const [avgWeight, setAvgWeight] = React.useState<string>('')
  const [saving, setSaving] = React.useState(false)

  const reset = () => {
    setName('')
    setLat('')
    setLon('')
    setCapacity('')
    setInventory('')
    setAvgWeight('')
  }

  const handleCreate = async () => {
    setSaving(true)
    const payload: Partial<Farm> = {
      name: name.trim(),
      lat: Number(lat),
      lon: Number(lon),
      capacity: Number(capacity),
      ...(inventory.trim() ? { inventory_pigs: Number(inventory) } : {}),
      ...(avgWeight.trim() ? { avg_weight_kg: Number(avgWeight) } : {}),
    }
    const ok = await farmService.create(payload as Farm)
    setSaving(false)
    if (ok) {
      toast({ title: 'Farm created', status: 'success', duration: 3000, isClosable: true })
      onCreateSuccess?.()
      reset()
      onClose()
    } else {
      toast({ title: 'Failed to create farm', status: 'error', duration: 4000, isClosable: true })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="black" borderColor="gray.700" borderWidth="1px">
        <ModalHeader color="white">Add Farm</ModalHeader>
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
          <Button bg="linear-gradient(to right, #fb923c, #f472b6)" color="white" onClick={handleCreate} isLoading={saving} _hover={{ bg: "linear-gradient(to right, #ff6b4a, #dd2a7b)" }}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FarmAddModal
