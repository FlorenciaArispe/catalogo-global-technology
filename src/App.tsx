import { useEffect, useState } from 'react'
import supabase from './supabase/supabase.service'
import { Producto, Modelo } from './types'
import './App.css'
import { Box, Stack, Button, Input, Text, Image, Flex, SimpleGrid } from '@chakra-ui/react'
import { isValidMotionProp, motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";
import Nav from './components/Nav'
import { CardProduct } from './components/CardProduct'

const MotionHeading = chakra(motion.h1, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === "children",
});

function App() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [nuevos, setNuevos] = useState<Producto[]>([]);
  const [usados, setUsados] = useState<Producto[]>([]);
  const [accesorios, setAccesorios] = useState<Producto[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([])
  const [filtro, setFiltro] = useState<'todos' | 'nuevos' | 'usados' | 'accesorios'>('nuevos');
  const [busqueda, setBusqueda] = useState('');

  useEffect(() => {
    const fetchModelosYProductos = async () => {
      const { data: modelosData, error: errorModelos } = await supabase
        .from("Modelo_celular")
        .select();
         console.log(modelosData)

      if (errorModelos) {
        console.error('Error al cargar modelos:', errorModelos);
        return;
      }

      setModelos(modelosData);

      const obtenerNombreModelo = (id: number) => {
        const modelo = modelosData.find((m) => m.id === id);
        return modelo ? modelo.nombre : '';
      };

      const { data: productosData, error: errorProductos } = await supabase
        .from('productos')
        .select('*');
        console.log(productosData)

      if (errorProductos) {
        console.error('Error al cargar productos:', errorProductos);
        return;
      }

      const productosConModelo = productosData.map((p: Producto) => ({
        ...p,
        modeloNombre: obtenerNombreModelo(p.modeloId),
      }));

      setProductos(productosConModelo);
      setNuevos(productosConModelo.filter((p) => p.categoria === 1));
      setUsados(productosConModelo.filter((p) => p.categoria === 2));
      setAccesorios(productosConModelo.filter((p) => p.categoria === 3));
    };

    fetchModelosYProductos();
  }, []);


  const productosFiltrados = (filtro === 'todos' ? productos :
    filtro === 'nuevos' ? nuevos :
      filtro === 'usados' ? usados :
        accesorios
  ).filter((p: any) => {
    const texto = busqueda.toLowerCase();
    return (
      p.nombre.toLowerCase().includes(texto) ||
      p.capacidad?.toLowerCase().includes(texto) ||
      p.color?.toLowerCase().includes(texto) ||
      p.modeloNombre?.toLowerCase().includes(texto)
    );
  });


  return (
    <>
      <Nav />
      <div className="fondo-bg" />
      <div className="contenedor">
        
        {/* Imagen arriba de todo */}
        <Image 
          src="/images/portada.jpeg" 
          alt="Imagen descriptiva"
         
          objectFit="cover" // Hace que la imagen cubra el área
          w="100%"  // Asegura que la imagen tenga un ancho completo en móvil
        />

        <Stack direction="column" spacing={4} p={4}>
          <Flex direction="row" justify="space-between" align="center" wrap="wrap">
            <Button 
              fontWeight={300}
              fontSize={"15px"}
              variant="outline" 
              color="white" 
              bg="transparent"
              borderColor="#ccc"
              onClick={() => setFiltro('todos')} 
              flex="1" 
              
              _hover={{ borderColor: 'white' }}
              _active={{ borderColor: 'white' }}
              className={filtro === 'todos' ? 'activo' : ''}
            >
              Todos
            </Button>
            <Button 
             fontWeight={300}
                 fontSize={"15px"}
              variant="outline" 
              color="white" 
              bg="transparent"
              borderColor="#ccc"
              onClick={() => setFiltro('nuevos')} 
              flex="1" 
              m={1}
              _hover={{ borderColor: 'white' }}
              _active={{ borderColor: 'white' }}
              className={filtro === 'nuevos' ? 'activo' : ''}
            >
              Sellados
            </Button>
            <Button 
             fontWeight={300}
                 fontSize={"15px"}
              variant="outline" 
              color="white" 
              bg="transparent"
              borderColor="#ccc"
              onClick={() => setFiltro('usados')} 
              flex="1" 
              m={1}
              _hover={{ borderColor: 'white' }}
              _active={{ borderColor: 'white' }}
              className={filtro === 'usados' ? 'activo' : ''}
            >
              Usados
            </Button>
            <Button 
             fontWeight={300}
                 fontSize={"15px"}
              variant="outline" 
              color="white" 
              bg="transparent"
              borderColor="#ccc"
              onClick={() => setFiltro('accesorios')} 
              flex="1" 
            
              _hover={{ borderColor: 'white' }}
              _active={{ borderColor: 'white' }}
              className={filtro === 'accesorios' ? 'activo' : ''}
            >
              Accesorios
            </Button>
          </Flex>
          
          {/* <Input 
            value={busqueda} 
            onChange={(e) => setBusqueda(e.target.value)} 
            placeholder="Buscar producto..." 
            variant="outline" 
            _focus={{ borderColor: 'blue.500' }}
            width="full"
            color="white"
            borderColor="#ccc"
            className="input-buscador"
          /> */}
        </Stack>


        <SimpleGrid 
        columns={{ base: 2, md: 4 }}  // 2 columnas en dispositivos móviles, 4 en pantallas grandes
        spacing={6} 
        p={4}
      >
        {productosFiltrados.length === 0 ? (
          <Box textAlign="center" color="gray.500" fontSize="lg">
            Producto no encontrado
          </Box>
        ) : (
          productosFiltrados.map((producto) => (
            <CardProduct key={producto.id} producto={producto} modelos={[]} />
          ))
        )}
      </SimpleGrid>


      </div>
    </>
  )
}

export default App
