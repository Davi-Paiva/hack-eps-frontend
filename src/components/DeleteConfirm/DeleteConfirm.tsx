import React from 'react'
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from '@chakra-ui/react'

type Props = {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  isLoading?: boolean
  title?: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
}

const DeleteConfirm: React.FC<Props> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = 'Confirm Delete',
  description = 'Are you sure you want to delete this item? This action cannot be undone.',
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
}) => {
  const cancelRef = React.useRef<HTMLButtonElement | null>(null)

  return (
    <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent bg="black" borderColor="gray.700" borderWidth="1px">
          <AlertDialogHeader fontSize="lg" fontWeight="bold" color="white">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody color="gray.300">{description}</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose} mr={3} isDisabled={isLoading} variant="ghost" color="white" _hover={{ bg: "gray.700" }}>
              {cancelLabel}
            </Button>
            <Button bg="linear-gradient(to right, #ef4444, #dc2626)" color="white" onClick={onConfirm} isLoading={isLoading} _hover={{ bg: "linear-gradient(to right, #dc2626, #b91c1c)" }}>
              {confirmLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}

export default DeleteConfirm
