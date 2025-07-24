import { Button, CloseButton, Dialog, Portal, Field, Input, Stack } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { toaster } from "../ui/toaster"
import { createSearch } from "../../services/searchesService"

const AddSearchModal = ({ onSearchCreated }) => {
  const ref = useRef(null)
  const [name, setName] = useState("")
  const [text, setText] = useState("")
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  console.log("isOpen:", isOpen)

  const handleClose = () => {
    setIsOpen(false)
    setName("")
    setText("")
    console.log("exit")
  }

  const handleSave = async () => {
    setLoading(true)
    const promise = createSearch({ name, text })
    setLoading(true)
    toaster.promise(promise, {
      loading: {
        title: "Создание поиска...",
        description: "Пожалуйста, подождите",
        duration: 3000
      },
      success: {
        title: "Поиск создан",
        duration: 3000
      },
      error: {
        title: "Ошибка при создании поиска",
        duration: 3000
      },
    })
    try {
      await promise
      handleClose()
      //if (onSearchCreated) onSearchCreated()
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog.Root
      initialFocusEl={() => ref.current}
      open={isOpen}
      onOpenChange={setIsOpen}
      onPointerDownOutside={handleClose}
      closeOnInteractOutside={false}>
      <Dialog.Trigger asChild>
        <Button colorScheme="teal" size="md" borderRadius="xl" ml={8}>
          + Создать поиск
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Создать поиск</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>Название поиска</Field.Label>
                  <Input
                    placeholder="Введите название"
                    value={name}
                    onChange={e => setName(e.target.value)}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Описание</Field.Label>
                  <Input
                    ref={ref}
                    placeholder="Введите запрос"
                    value={text}
                    onChange={e => setText(e.target.value)}
                  />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" mr={3} onClick={handleClose}>Отмена</Button>
              <Button
                colorScheme="teal"
                colorPalette="green"
                onClick={handleSave}
                isLoading={loading}
                isDisabled={!name || !text}
              >
                Сохранить</Button>
            </Dialog.Footer>
            <CloseButton
              size="sm"
              position="absolute"
              right="8px"
              top="8px"
              onClick={handleClose} />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default AddSearchModal