import { useEffect, useState } from 'react'
import supabase from './supabase/supabase.service'
import { Producto } from './types'
import './App.css'
import { CardProduct } from './components/CardProduct'
import { Stack } from '@chakra-ui/react'

function App() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProductos = async () => {
      const { data, error } = await supabase
        .from('productos')
        .select('*')

      if (error) console.error('Error al cargar productos:', error)
      else setProductos(data)

      setLoading(false)
    }

    fetchProductos()
  }, [])

  return (
    <>
      <div className="fondo-bg" />
      <div className="contenedor">
        {/* <h1 className="titulo">Productos en Stock</h1> */}
        {loading ? (
          <p>Cargando productos...</p>
        ) : (
          <Stack spacing={6}>
          {productos.map((p: Producto) => (
            <CardProduct key={p.id} producto={p} />
          ))}
        </Stack>
        )}
      </div>
    </>
  )
  

}

export default App