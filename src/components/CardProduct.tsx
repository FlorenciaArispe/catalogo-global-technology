import { Box, Stack, Text, Image, Button, SimpleGrid } from '@chakra-ui/react';

export const CardProduct = ({ producto, modelos }) => {
  return (
    <Box
      bg="white"
      boxShadow="lg"
      borderRadius="8px"
      height="390px"
      overflow="hidden"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      p={4}
    >
      {/* Imagen */}
      <Image 
        src={producto.imagen} 
        alt={producto.nombre} 
        objectFit="cover" 
        width="100%" 
        height="45%" 
      />

      {/* Nombre y detalles */}
      <Text fontWeight="bold" mt={4} color="gray.700">{producto.nombre}</Text>
      <Text fontSize="sm" color="gray.500">
        {producto.color} - {producto.capacidad}
      </Text>

      {/* Precio */}
      <Text fontSize="xl" fontWeight="bold" color="blue.500" mt={2}>
        ${producto.precio}
      </Text>

      {/* Botón de consulta */}
      <Button 
        mt={4} 
        colorScheme="blue" 
        width="full"
        onClick={() => alert('Consulta realizada!')} 
      >
        Consultar
      </Button>
    </Box>
  );
};
