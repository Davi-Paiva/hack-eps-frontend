// src/components/ImportFarm.tsx
import { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack, Text } from "@chakra-ui/react";
import "./ImportFarm.css";

interface ImportFarmProps {
  endpoint: string; // backend endpoint to submit to
}

export default function ImportFarm({ endpoint }: ImportFarmProps) {
  const [name, setName] = useState("");
  const [lat, setLatitude] = useState("");
  const [lon, setLongitude] = useState("");
  const [capacity, setCapacity] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name,
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      capacity: parseInt(capacity),
    };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("Farm successfully added!");
        setName("");
        setLatitude("");
        setLongitude("");
        setCapacity("");
      } else {
        setMessage("Failed to add farm. Try again.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Error connecting to server.");
    }
  };

  return (
    <Box className="import-farm-container">
      <VStack
        as="form"
        className="import-farm-form"
        spacing={6}
        onSubmit={handleSubmit}
      >
        <Text fontSize="2xl" fontWeight="bold">
          Import Farm
        </Text>

        <FormControl isRequired>
          <FormLabel>Farm Name</FormLabel>
          <Input
            placeholder="Farm Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Latitude</FormLabel>
          <Input
            type="number"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Longitude</FormLabel>
          <Input
            type="number"
            placeholder="Longitude"
            value={lon}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Capacity</FormLabel>
          <Input
            type="number"
            placeholder="Capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </FormControl>

        <Button type="submit" colorScheme="blue" size="lg">
          Submit
        </Button>

        {message && <Text color="green.400">{message}</Text>}
      </VStack>
    </Box>
  );
}
