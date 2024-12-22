import { Box, Heading, HStack, Button } from "@chakra-ui/react";
import Link from "next/link"; // Import Link dari Next.js

export default function Header() {
  return (
    <Box as="header" bg="teal.500" color="white" py="4" px="8" shadow="md">
      <HStack justify="space-between">
        <Heading size="lg">My Notes</Heading>
        <HStack spacing="4">
          {/* Menggunakan Link untuk navigasi */}
          <Link href="/" passHref>
            <Button variant="ghost" color="white" colorScheme="teal" size="sm">
              Home
            </Button>
          </Link>
          <Link href="/notes" passHref>
            <Button variant="ghost" color="white" colorScheme="teal" size="sm">
              Note
            </Button>
          </Link>
        </HStack>
      </HStack>
    </Box>
  );
}
