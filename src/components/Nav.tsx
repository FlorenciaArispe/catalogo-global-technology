import { Box, Flex, Button, Image, IconButton, Input, useBreakpointValue } from '@chakra-ui/react';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const Nav = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [searchVisible, setSearchVisible] = useState(false); 

  const toggleSearch = () => {
    setSearchVisible((prev) => !prev);
  };

  return (
    <Box
      as="nav"
      boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
      position="sticky"
      top={0}
      zIndex={10}
      bg="white"
      p={2}
    >
      <Flex justify="space-between" align="center">
        {isMobile && (
          <IconButton
            aria-label="Abrir menú"
            icon={<HamburgerIcon />}
            variant="ghost"
            color="black"
            fontSize="24px"
            _hover={{
              backgroundColor: "transparent",
              border: "1px solid white",
            }}
          />
        )}

        <Image
          ml={isMobile ? 0 : 10}
          w={isMobile ? "50px" : "100px"}
          src="/images/solo-logo.png"
          alt="Global Technology"
          mx={isMobile ? "auto" : "unset"}
        />

        {!isMobile && (
          <Flex>
            <Button
              variant="ghost"
              color="black"
              mr={4}
              _hover={{
                outline: "1px solid black", 
                backgroundColor: "transparent",
              }}
            >
              Inicio
            </Button>
            <Button
              variant="ghost"
              color="black"
              mr={4}
              _hover={{
                outline: "1px solid black",
                backgroundColor: "transparent",
              }}
            >
              Quiénes somos
            </Button>
            <Button
              variant="ghost"
              color="black"
              mr={4}
              _hover={{
                outline: "1px solid black",
                backgroundColor: "transparent",
              }}
            >
              Contacto
            </Button>
          </Flex>
        )}

        {/* Lupa para abrir el campo de búsqueda */}
        <IconButton
          aria-label="Buscar"
          icon={<SearchIcon />}
          variant="ghost"
          color="black.800"
          fontSize="23px"
          onClick={toggleSearch}
          _hover={{
            backgroundColor: "transparent",
            border: "1px solid white",
          }}
        />

        {/* Campo de búsqueda, solo visible cuando searchVisible es true */}
        {searchVisible && (
          <Input
            placeholder="Buscar productos..."
            size="sm"
            variant="flushed"
            focusBorderColor="blue.400"
            w="full" // Hace que ocupe todo el ancho
            ml={4} // Espacio a la izquierda
          />
        )}
      </Flex>
    </Box>
  );
};

export default Nav;
