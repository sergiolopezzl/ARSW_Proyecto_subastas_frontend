import { Product } from "./product";
import { User } from "./user";

export interface ProductOffer {
    id: number;
    product: Product; // Objeto de tipo Product
    user: User; // Objeto de tipo User (comprador)
    amount: number; // Tipo correcto para BigDecimal en Java
    dateTime: string;
    status: string;
  }