export interface User {
    id: number;
    username: string;
    password: string; // Opcional si no es necesario
    walletAmount: number; // Tipo correcto para BigDecimal en tu backend
    // Agrega cualquier otro campo necesario
  }
  