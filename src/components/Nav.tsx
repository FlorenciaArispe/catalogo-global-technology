import { Box, Flex, Button, Image, IconButton, useBreakpointValue } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Nav = () => {
  // Usamos useBreakpointValue para determinar el tamaño del logo y la disposición
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box
      as="nav"
      boxShadow="0px 4px 6px rgba(0, 0, 0, 0.1)"
      position="sticky"
      top={0}
      zIndex={10}
     bg="rgba(0, 0, 0, 0.2)"
    >
      <Flex justify="space-between" align="center" p={4}>
        {isMobile && (
          <IconButton
            aria-label="Abrir menú"
            icon={<HamburgerIcon />}
            variant="ghost"
            color="white"
            fontSize="24px"
            
            _hover={{
              backgroundColor: "transparent",
              border: "1px solid white",
            }}
          />
        )}

        <Image
          mt={1}
          ml={isMobile ? 0 : 10} 
          w={isMobile ? "110px" : "150px"}
          src="/images/logo-blanco.svg"
          alt="Global Technology"
          mx={isMobile ? "auto" : "unset"} 
        />
        {!isMobile && (
          <Flex>
            <Button
              variant="ghost"
              color="white"
              mr={4}
              _hover={{
                outline: "1px solid white", 
                backgroundColor: "transparent",
              }}
            >
              Inicio
            </Button>
            <Button
              variant="ghost"
              color="white"
              mr={4}
              _hover={{
                outline: "1px solid white",
                backgroundColor: "transparent",
              }}
            >
              Quiénes somos
            </Button>
            <Button
              variant="ghost"
              color="white"
              mr={4}
              _hover={{
                outline: "1px solid white",
                backgroundColor: "transparent",
              }}
            >
              Contacto
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Nav;
