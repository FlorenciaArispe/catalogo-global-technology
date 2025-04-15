import {
    Avatar,
    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Heading,
    Text,
    Stack,
    Image,
    Box,
    HStack,
    Badge,
    IconButton,
  } from "@chakra-ui/react";
  import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
  import { useState } from "react";
import { Producto } from "../types";
  
  const mockImages = [
    "https://picsum.photos/id/102/600/400",
    "https://picsum.photos/id/103/600/400",
    "https://picsum.photos/id/104/600/400",
  ];
  
  export const CardProduct = ({producto} : Producto) => {
    const [current, setCurrent] = useState(0);
  
    const nextImage = () =>
      setCurrent((prev) => (prev + 1) % mockImages.length);
    const prevImage = () =>
      setCurrent((prev) =>
        prev === 0 ? mockImages.length - 1 : prev - 1
      );
  
    return (
      <Card
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        maxW="xl"
        bg="rgba(255, 255, 255, 0.05)"
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="whiteAlpha.200"
        boxShadow="0 8px 30px rgba(32, 32, 32, 0.3)"
        borderRadius="md"
      >
        <Box position="relative" maxW={{ base: "100%", sm: "200px" }}>
          <Image
            objectFit="cover"
            src={mockImages[current]}
            alt={`Imagen ${current + 1}`}
            height="100%"
            width="100%"
          />
        <IconButton
  icon={<ChevronLeftIcon boxSize={6} />} // aumenta el tamaño del ícono
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

        </Box>
  
        <Box flex="1">
          <CardBody>
            <Heading color="white" size="md" mb={2}>
             {producto.categoria === 3 ? producto.nombre : producto.capacidad + producto.color}
            </Heading>
            <Text color="white">
              Nuevo en caja sellado
       
            </Text>
            <Text color="white">
             Garantía oficial Apple   
            </Text>
            
            <HStack mt="4">
            <Badge colorScheme="yellow">${producto.minorista} </Badge>
              <Badge colorScheme="green">USD</Badge>
              
            </HStack>
          </CardBody>
  
          {/* <CardFooter>
            <Button colorScheme="blue">Buy Latte</Button>
          </CardFooter> */}
        </Box>
      </Card>
    );
  };
  