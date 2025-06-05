import { useEffect, useState } from 'react'
import supabase from './supabase/supabase.service'
import { Producto, Modelo } from './types'
import { Box, Stack, Button, Image, Flex, SimpleGrid } from '@chakra-ui/react'
import Nav from './components/Nav'
import { CardProduct } from './components/CardProduct'

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
      <Box bg="rgb(248, 248, 248)" minHeight="100vh" >
        {/* Imagen arriba de todo */}
        <Image 
          src="/images/portada2.png" 
          alt="Imagen descriptiva"
          objectFit="cover"
          w="100%"  
         
        />

       <Stack direction="column" spacing={4} p={4}>
          <Flex direction="row" justify="space-between" align="center" wrap="wrap">
            {/* Botón Todos */}
            <Button 
              fontWeight={300}
              fontSize={"15px"}
              variant={filtro === 'todos' ? 'solid' : 'outline'} // Cambia el fondo si está seleccionado
              color={'gray.600'}
              bg={filtro === 'todos' ? '#ccc' : 'transparent'}
              borderColor={filtro === 'todos' ? 'gray.100' : '#ccc'}
              onClick={() => setFiltro('todos')} 
              flex="1" 
              _hover={{ borderColor: 'white' }}
              _active={{ borderColor: 'white' }}
            >
              Todos
            </Button>

            {/* Botón Sellados */}
            <Button 
              fontWeight={300}
              fontSize={"15px"}
              variant={filtro === 'nuevos' ? 'solid' : 'outline'}
              color={'gray.600'}
              bg={filtro === 'nuevos' ? '#ccc' : 'transparent'}
              borderColor={filtro === 'nuevos' ? 'gray.100' : '#ccc'}
              onClick={() => setFiltro('nuevos')} 
              flex="1" 
              m={1}
              _hover={{ borderColor: 'white' }}
              _active={{ borderColor: 'white' }}
            >
              Sellados
            </Button>

            {/* Botón Usados */}
            <Button 
              fontWeight={300}
              fontSize={"15px"}
              variant={filtro === 'usados' ? 'solid' : 'outline'}
             color={'gray.600'}
              bg={filtro === 'usados' ? '#ccc' : 'transparent'}
              borderColor={filtro === 'usados' ? 'gray.100' : '#ccc'}
              onClick={() => setFiltro('usados')} 
              flex="1" 
              m={1}
              _hover={{ borderColor: 'white' }}
              _active={{ borderColor: 'white' }}
            >
              Usados
            </Button>

            {/* Botón Accesorios */}
            <Button 
              fontWeight={300}
              fontSize={"15px"}
              variant={filtro === 'accesorios' ? 'solid' : 'outline'}
             color={'gray.600'}
              bg={filtro === 'accesorios' ? '#ccc' : 'transparent'}
              borderColor={filtro === 'accesorios' ? 'gray.100' : '#ccc'}
              onClick={() => setFiltro('accesorios')} 
              flex="1" 
              _hover={{ borderColor: 'white' }}
              _active={{ borderColor: 'white' }}
            >
              Accesorios
            </Button>
          </Flex>
        </Stack>

        {/* Grid de productos */}
        <SimpleGrid 
          columns={{ base: 2, md: 4 }}  
          spacing={4} 
          p={4}
        >
          {productosFiltrados.length === 0 ? (
            <Box textAlign="center" color="gray.500" fontSize="lg">
              Producto no encontrado
            </Box>
          ) : (
            productosFiltrados.map((producto) => (
              <CardProduct key={producto.id} producto={producto} modelos={modelos} />
            ))
          )}
        </SimpleGrid>
      </Box>
    </>
  )
}

export default App
