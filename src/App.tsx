import { useEffect, useState } from 'react'
import supabase from './supabase/supabase.service'
import { Producto, Modelo } from './types'
import './App.css'
import { CardProduct } from './components/CardProduct'
import { Box, Stack } from '@chakra-ui/react'
import { isValidMotionProp, motion } from "framer-motion";
import { chakra } from "@chakra-ui/react";

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
      <div className="fondo-bg" />
      <div className="contenedor">
      <MotionHeading
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  textAlign="center"
  fontSize="3xl"
  fontWeight="extrabold"
  mb={10}
  bgGradient="linear(to-r, #ffffff, #8888ff, #ffffff)"
  backgroundClip="text"
  color="transparent"
  sx={{
    animation: "shine 2s linear infinite",
    backgroundSize: "200% auto",
  }}
>
  CATÁLOGO GLOBAL TECHNOLOGY
</MotionHeading>



        <Stack direction="row" spacing={4} justify="center" mb={10}>
          <button className={`boton-filtro ${filtro === 'todos' ? 'activo' : ''}`} onClick={() => setFiltro('todos')}>
            Todos
          </button>
          <button className={`boton-filtro ${filtro === 'nuevos' ? 'activo' : ''}`} onClick={() => setFiltro('nuevos')}>
            Nuevos sellados
          </button>
          <button className={`boton-filtro ${filtro === 'usados' ? 'activo' : ''}`} onClick={() => setFiltro('usados')}>
            Usados premium
          </button>
          <button className={`boton-filtro ${filtro === 'accesorios' ? 'activo' : ''}`} onClick={() => setFiltro('accesorios')}>
            Accesorios
          </button>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="input-buscador"
          />
        </Stack>

        <Stack spacing={6}>
          {productosFiltrados.length === 0 ? (
            <Box textAlign="center" color="whiteAlpha.700" fontSize="lg">
              Producto no encontrado
            </Box>
          ) : (
            productosFiltrados.map((p: any) => (
              <CardProduct key={p.id} producto={p} modelos={modelos} />
            ))
          )}
        </Stack>

      </div>
    </>
  )
}

export default App