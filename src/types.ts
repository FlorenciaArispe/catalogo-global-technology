export interface Producto {
    id: number;
    nombre: string;
    capacidad: string;
    categoria: number;
    color: string;
    valorNeto: number;
    minorista: number;
    mayorista: number;
    modeloId: number;
    stock: number;
    fotos: string[];
  }

  export interface Modelo {
    id: number;
    nombre: string;
  }
  