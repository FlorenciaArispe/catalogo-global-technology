import {
  Heading,
  Text,
  Box,
  HStack,
  Badge,
  IconButton,
  Image,
  CardBody,
  Card,
  VStack,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Modelo, Producto } from "../types";

const mockImages = ["/iphoneDefault.jpg"];

export const CardProduct = ({ producto, modelos }: { producto: any; modelos: Modelo[] }) => {
  const fotos = producto.fotos && producto.fotos.length > 0 ? producto.fotos : mockImages;
  const [current, setCurrent] = useState(0);

  const nextImage = () => setCurrent((prev) => (prev + 1) % fotos.length);
  const prevImage = () => setCurrent((prev) => (prev === 0 ? fotos.length - 1 : prev - 1));




  return (

    <>

     <Card
  direction={{ base: "column", sm: "row" }}
  overflow="hidden"
  w={"100%"}
  bg="rgba(255, 255, 255, 0.05)"
  backdropFilter="blur(10px)"
  border="1px solid"
  borderColor="whiteAlpha.200"
  boxShadow="0 8px 30px rgba(32, 32, 32, 0.3)"
  borderRadius="md"
  h="180px"
>

  <Box
    position="relative"
    w={{ base: "100%", sm: "180px" }}
    h="100%"
    overflow="hidden"
    flexShrink={0}
  >
    <Image
      src={fotos[current]}
      alt={`Imagen ${current + 1}`}
      width="100%"
      height="100%"
      objectFit="cover"
      objectPosition="center"
    />

{fotos.length > 1 && (
  <>
    <IconButton
      icon={<ChevronLeftIcon boxSize={6} />}
      position="absolute"
      top="50%"
      left="8px"
      transform="translateY(-50%)"
      size="md"
      onClick={prevImage}
      aria-label="Imagen anterior"
      bg="whiteAlpha.300"
      color="white"
      _hover={{ bg: "whiteAlpha.500" }}
      _active={{ bg: "whiteAlpha.600" }}
      borderRadius="full"
      boxShadow="md"
    />

    <IconButton
      icon={<ChevronRightIcon boxSize={6} />}
      position="absolute"
      top="50%"
      right="8px"
      transform="translateY(-50%)"
      size="md"
      onClick={nextImage}
      aria-label="Imagen siguiente"
      bg="whiteAlpha.300"
      color="white"
      _hover={{ bg: "whiteAlpha.500" }}
      _active={{ bg: "whiteAlpha.600" }}
      borderRadius="full"
      boxShadow="md"
    />
  </>
)}

  </Box>


  <Box
    h="140px"
    my="auto"
    w={"100%"}
    display="flex"
    alignItems="center"
    justifyContent={"flex-start"}
  >
    <CardBody py={0} w="100%">
  <HStack justify="space-between" align="start" w="100%">
    <Box     display="flex" flexDirection={"column"}
    alignItems="flex-start"
    justifyContent={"flex-start"}>
      <Heading color="white" size="md" mb={1}>
        {producto.categoria === 3 ? producto.nombre : producto.modeloNombre}
      </Heading>

      {producto.categoria === 1 && (
        <>
          <Text fontWeight="extrabold" fontSize="20px" color="white">
            {producto.capacidad}
          </Text>
          <Text color="white">Nuevo en caja sellada</Text>
          <Text color="white">Garantía oficial Apple</Text>
        </>
      )}

      {producto.categoria === 2 && (
        <>
          <Text fontWeight="extrabold" fontSize="20px" color="white">
            {producto.capacidad}
          </Text>
          <Text color="white">{producto.capacidad}</Text>
          <Text color="white">Usado premium categoría A</Text>
        </>
      )}
    </Box>

    <Box>
      <Badge mr={2} colorScheme="yellow" fontSize="md">
        ${producto.minorista}
      </Badge>
      {/* <Badge colorScheme="green" fontSize="md">
        {producto.categoria === 3 && (!producto.nombre.includes("Cabezal") || !producto.nombre.includes("Battery")) ? "ARG" : "USD"}
      </Badge> */}
    </Box>
  </HStack>
</CardBody>

  </Box>


</Card> 
    </>
  );
};
