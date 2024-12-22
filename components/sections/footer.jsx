import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" bg="teal.500" color="white" py="4" px="8" mt="8" textAlign="center" shadow="md">
      <Text fontSize="sm">© {new Date().getFullYear()} My Notes. All rights reserved.</Text>
    </Box>
  );
}
