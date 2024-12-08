import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  VStack,
  Text,
  Avatar,
  Stack,
  Heading,
  Container,
  InputGroup,
  InputLeftElement,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleSearch = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    setSearchResults([]);

    if (query.length >= 2) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/search?query=${query}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    }
  };

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        <Box textAlign="center" mb={8}>
          <Heading size="xl" mb={2}>
            User Search
          </Heading>
          <Text color="gray.500">
            Search for users by name, email, or username
          </Text>
        </Box>

        <InputGroup size="lg">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Start typing to search users..."
            value={searchQuery}
            onChange={handleSearch}
            borderRadius="full"
            bg={bgColor}
            borderColor={borderColor}
            _hover={{ borderColor: "blue.400" }}
            _focus={{
              borderColor: "blue.400",
              boxShadow: "0 0 0 1px blue.400",
            }}
          />
        </InputGroup>

        <VStack spacing={4}>
          {searchResults.map((user) => (
            <Box
              key={user.id}
              p={6}
              shadow="md"
              borderWidth="1px"
              borderRadius="lg"
              bg={bgColor}
              w="100%"
              cursor="pointer"
              onClick={() => handleUserClick(user.id)}
              _hover={{
                transform: "translateY(-2px)",
                shadow: "lg",
                borderColor: "blue.400",
              }}
              transition="all 0.2s"
            >
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={6}
                align="center"
              >
                <Avatar
                  size="xl"
                  name={`${user.firstName} ${user.lastName}`}
                  src={user.image}
                  border="2px solid"
                  borderColor="blue.400"
                />
                <Stack flex={1} spacing={3}>
                  <Heading size="md">{`${user.firstName} ${user.lastName}`}</Heading>
                  <Text color="gray.500">@{user.username}</Text>
                  <Text fontSize="sm">{user.email}</Text>
                  <Divider />
                  <Stack
                    direction={{ base: "column", md: "row" }}
                    spacing={4}
                    fontSize="sm"
                  >
                    <Text>
                      <strong>Company:</strong> {user.company.name}
                    </Text>
                    <Text>
                      <strong>Role:</strong> {user.role}
                    </Text>
                    <Text>
                      <strong>Location:</strong> {user.address.city},{" "}
                      {user.address.state}
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          ))}
        </VStack>

        {searchQuery && searchResults.length === 0 && (
          <Box textAlign="center" p={8}>
            <Text fontSize="lg" color="gray.500">
              No results found
            </Text>
            <Text fontSize="sm" color="gray.400">
              Try adjusting your search terms
            </Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
}

export default SearchPage;
