import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  Avatar,
  Grid,
  GridItem,
  Button,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

function UserDetailsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/users/${userId}`);
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to load user details');
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) return <Container centerContent p={8}><Text>Loading...</Text></Container>;
  if (error) return <Container centerContent p={8}><Text color="red.500">{error}</Text></Container>;
  if (!user) return <Container centerContent p={8}><Text>User not found</Text></Container>;

  return (
    <Container maxW="container.lg" py={8}>
      <Button
        leftIcon={<ArrowBackIcon />}
        mb={8}
        onClick={() => navigate(-1)}
        variant="ghost"
      >
        Back to Search
      </Button>

      <Box
        bg={bgColor}
        p={8}
        borderRadius="lg"
        shadow="md"
        borderWidth="1px"
        borderColor={borderColor}
      >
        <Stack spacing={8}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={8} align="center">
            <Avatar
              size="2xl"
              name={`${user.firstName} ${user.lastName}`}
              src={user.image}
              border="4px solid"
              borderColor="blue.400"
            />
            <Stack flex={1}>
              <Heading size="xl">{`${user.firstName} ${user.lastName}`}</Heading>
              <Text fontSize="xl" color="gray.500">@{user.username}</Text>
              <Text fontSize="lg">{user.email}</Text>
            </Stack>
          </Stack>

          <Divider />

          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            <GridItem>
              <Stack spacing={4}>
                <Box>
                  <Text fontWeight="bold">Company</Text>
                  <Text>{user.company.name}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Role</Text>
                  <Text>{user.role}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Location</Text>
                  <Text>{user.address.city}, {user.address.state}</Text>
                </Box>
              </Stack>
            </GridItem>
            <GridItem>
              <Stack spacing={4}>
                <Box>
                  <Text fontWeight="bold">Age</Text>
                  <Text>{user.age}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Gender</Text>
                  <Text>{user.gender}</Text>
                </Box>
                <Box>
                  <Text fontWeight="bold">Address</Text>
                  <Text>{user.address.street}</Text>
                  <Text>{user.address.city}, {user.address.state} {user.address.zipCode}</Text>
                </Box>
              </Stack>
            </GridItem>
          </Grid>
        </Stack>
      </Box>
    </Container>
  );
}

export default UserDetailsPage; 