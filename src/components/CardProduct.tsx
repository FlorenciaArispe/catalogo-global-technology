import { Box, Stack, Text, Image, Divider, HStack, Icon } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiMessageCircle } from 'react-icons/fi';

export const CardProduct = ({ producto } : any) => {
  return (
    <Box
      bg="white"
      borderRadius="xl"
      boxShadow="md"
      overflow="hidden"
      transition="transform 0.2s"
      _hover={{ transform: 'scale(1.02)', boxShadow: 'lg' }}
    >
      {/* Imagen principal */}
      <Image
        src={producto.fotos ? producto.fotos[0] : null}
        alt={producto.nombre}
        objectFit="cover"
        width="100%"
        height="200px"
        borderBottom="1px solid #eee"
      />

      {/* Contenido */}
      <Stack spacing={2} p={4} align="center">
        <Text fontWeight="bold" fontSize="lg" textAlign="center">
          {producto.modelo ?? producto.nombre}
        </Text>

        <Text fontSize="sm" color="gray.500">
          {producto.color} · {producto.capacidad}
        </Text>

        <Text fontSize="xl" fontWeight="bold" color="blue.500">
          ${producto.minorista}
        </Text>
      </Stack>

      {/* Divider y texto de consultar */}
      <Divider my={2} />

      <HStack
      justifyContent={"center"}
        spacing={2}
        alignItems={"center"}
        color="gray.700"
        px={4}
        pb={3}
        cursor="pointer"
        _hover={{ color: "gray.900" }}
        onClick={() => alert('Consulta realizada!')}
      >
        <Icon as={FaWhatsapp} />
        <Text fontWeight="medium">Consultar</Text>
      </HStack>
    </Box>
  );
};
