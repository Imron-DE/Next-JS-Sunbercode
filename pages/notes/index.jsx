import {
  Box,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Text,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

const Layout = dynamic(() => import("@/components/layout/index"), { ssr: false });

export async function getStaticProps() {
  try {
    const res = await fetch("https://service.pace-unv.cloud/api/notes");
    const listnotes = await res.json();

    return {
      props: {
        notes: listnotes || [],
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Failed to fetch notes:", error);
    return {
      props: {
        notes: [],
      },
    };
  }
}

export default function Notes({ notes }) {
  const router = useRouter();
  const { isOpen: isNoteModalOpen, onOpen: onOpenNoteModal, onClose: onCloseNoteModal } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onOpenDeleteModal, onClose: onCloseDeleteModal } = useDisclosure();
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const toast = useToast();

  const handleTitleChange = (e) => {
    setFormData({
      ...formData,
      title: e.target.value,
    });
  };

  const handleDescriptionChange = (e) => {
    setFormData({
      ...formData,
      description: e.target.value,
    });
  };

  const createNote = async () => {
    try {
      const res = await fetch("api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await res.json();

      if (result?.success) {
        router.reload();
        onCloseNoteModal();
        toast({
          title: "Note created.",
          description: "The note has been successfully created.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error.",
          description: "Failed to create the note.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Failed to create note:", error);
      toast({
        title: "Error.",
        description: "An error occurred while creating the note.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const updateNote = async () => {
    if (!selectedNoteId) {
      toast({
        title: "Error",
        description: "ID catatan tidak ditemukan.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`/api/notes/${selectedNoteId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal memperbarui catatan.");
      }

      const result = await response.json();

      if (result.success) {
        router.reload();
        onCloseNoteModal();
        toast({
          title: "Berhasil",
          description: "Catatan berhasil diperbarui.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Gagal memperbarui catatan.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error saat memperbarui catatan:", error);
      toast({
        title: "Error",
        description: error.message || "Terjadi kesalahan saat memperbarui catatan.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleOpenNoteModal = (note = null) => {
    if (note) {
      setSelectedNoteId(note.id);
      setFormData({ title: note.title, description: note.description });
    } else {
      setSelectedNoteId(null);
      setFormData({ title: "", description: "" });
    }
    onOpenNoteModal();
  };

  // Fungsi untuk membuka modal konfirmasi penghapusan
  const handleOpenDeleteModal = (noteId) => {
    setSelectedNoteId(noteId);
    onOpenDeleteModal();
  };

  const handleDelete = async () => {
    if (!selectedNoteId) {
      toast({
        title: "Error",
        description: "ID catatan tidak ditemukan.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch(`/api/notes/${selectedNoteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal menghapus catatan.");
      }

      const result = await response.json();

      if (result.success) {
        router.reload();
        onCloseDeleteModal();
        toast({
          title: "Berhasil",
          description: "Catatan berhasil dihapus.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          description: "Gagal menghapus catatan.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error saat menghapus catatan:", error);
      toast({
        title: "Error",
        description: error.message || "Terjadi kesalahan saat menghapus catatan.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Layout metaTitle="Notes" metaDescription="Ini adalah halaman notes">
      <Box padding="5">
        <Flex justifyContent="end">
          <Button colorScheme="blue" onClick={() => handleOpenNoteModal()}>
            Add Notes
          </Button>
        </Flex>
        <h1 className="flex text-4xl font-bold mb-4 justify-center">List Data Notes</h1>
        <Flex justifyContent="center" mt="5">
          <Grid templateColumns="repeat(3, 1fr)" gap={6}>
            {notes?.data?.map((item) => (
              <GridItem key={item.id}>
                <Card>
                  <CardHeader>
                    <Heading>{item.title}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>{item.description}</Text>
                  </CardBody>
                  <CardFooter>
                    <Button onClick={() => handleOpenNoteModal(item)} flex="1" variant="ghost" color="black">
                      Edit
                    </Button>
                    <Button onClick={() => handleOpenDeleteModal(item.id)} flex="1" variant="solid" colorScheme="red" bg="red.500" color="white">
                      Delete
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </Flex>
      </Box>

      {/* Modal untuk Create / Update */}
      <Modal isOpen={isNoteModalOpen} onClose={onCloseNoteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedNoteId ? "Edit Note" : "Create Note"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel>Title</FormLabel>
              <Input name="title" value={formData.title} onChange={handleTitleChange} placeholder="Enter note title" />
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Description</FormLabel>
              <Input name="description" value={formData.description} onChange={handleDescriptionChange} placeholder="Enter note description" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCloseNoteModal}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={selectedNoteId ? updateNote : createNote}>
              {selectedNoteId ? "Update" : "Create"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal Konfirmasi Hapus */}
      <Modal isOpen={isDeleteModalOpen} onClose={onCloseDeleteModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this note?</ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCloseDeleteModal}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Layout>
  );
}
