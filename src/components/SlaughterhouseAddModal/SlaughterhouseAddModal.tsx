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
import { slaughterhouseService } from '../../services/slaughterhouseService'
import type { Slaughterhouse } from '../../types/slaughterhouse'

type Props = {
  isOpen: boolean
  onClose: () => void
  onCreateSuccess?: () => void
}

const SlaughterhouseAddModal: React.FC<Props> = ({ isOpen, onClose, onCreateSuccess }) => {
  const toast = useToast()
  const [name, setName] = React.useState('')
  const [lat, setLat] = React.useState<string>('')
  const [lon, setLon] = React.useState<string>('')
  const [capacity_per_day, setCapacity_per_day] = React.useState<string>('')
  const [saving, setSaving] = React.useState(false)

  const reset = () => {
    setName('')
    setLat('')
    setLon('')
    setCapacity_per_day('')
  }

  const handleCreate = async () => {
    setSaving(true)
    const payload: Partial<Slaughterhouse> = {
      name: name.trim(),
      lat: Number(lat),
      lon: Number(lon),
      capacity_per_day: Number(capacity_per_day),
    }
    const ok = await slaughterhouseService.create(payload as Slaughterhouse)
    setSaving(false)
    if (ok) {
      toast({ title: 'Slaughterhouse created', status: 'success', duration: 3000, isClosable: true })
      onCreateSuccess?.()
      reset()
      onClose()
    } else {
      toast({ title: 'Failed to create slaughterhouse', status: 'error', duration: 4000, isClosable: true })
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg="black" borderColor="gray.700" borderWidth="1px">
        <ModalHeader color="white">Add Slaughterhouse</ModalHeader>
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
              <NumberInput value={capacity_per_day} onChange={(v) => setCapacity_per_day(v)}>
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

export default SlaughterhouseAddModal
