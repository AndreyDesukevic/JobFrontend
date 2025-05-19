import { Button, CloseButton, Dialog, Portal, Field, Input, Stack } from "@chakra-ui/react"
import { useRef } from "react"

const AddSearchModal = () => {
  const ref = useRef(null)
  return (
    <Dialog.Root initialFocusEl={() => ref.current}>
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
                  <Input placeholder="Введите название" />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Описание</Field.Label>
                  <Input ref={ref} placeholder="Введите описание" />
                </Field.Root>
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline" mr={3}>Отмена</Button>
              </Dialog.ActionTrigger>
              <Button colorScheme="teal" colorPalette="green">Сохранить</Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" position="absolute" right="8px" top="8px" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

export default AddSearchModal