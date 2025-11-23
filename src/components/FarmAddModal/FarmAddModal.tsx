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
  const [saving, setSaving] = React.useState(false)

  const reset = () => {
    setName('')
    setLat('')
    setLon('')
    setCapacity('')
  }

  const handleCreate = async () => {
    setSaving(true)
    const payload: Partial<Farm> = {
      name: name.trim(),
      lat: Number(lat),
      lon: Number(lon),
      capacity: Number(capacity),
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
      <ModalContent>
        <ModalHeader>Add Farm</ModalHeader>
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
          <Button colorScheme="blue" onClick={handleCreate} isLoading={saving}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default FarmAddModal
