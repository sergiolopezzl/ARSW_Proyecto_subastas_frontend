import { ProductOffer } from "./productOffer";
import { User } from "./user";

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number; // Tipo correcto para BigDecimal en Java
    status: string;
    createdDate: string; // Fecha en formato de cadena en Java
    endDate: string; // Fecha en formato de cadena en Java
    seller: User; // Objeto de tipo User
    buyer: User; // Objeto de tipo User
    sellerId: number; // ID del vendedor (transitorio)
    buyerId: number; // ID del comprador (transitorio)
    offers: ProductOffer[]; // Lista de ofertas
    // Agrega cualquier otro campo necesario
  }