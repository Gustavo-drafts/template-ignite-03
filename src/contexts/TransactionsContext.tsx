import { createContext, ReactNode, useEffect, useState } from "react";

// Interface movida de Transactions/ index.tsx
interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}
// -------------

interface TransactionContextType {
  transactions: Transaction[]; // baseado na interface 'Transaction' acima 
}

interface TransactionsProviderProps {
  children: ReactNode; // ReactNode = qualquer elemento válido no react
}

// tipando contexto com typescript 'as Typagem'
export const TransactionsContext = createContext({} as TransactionContextType)

export function TransactionsProvider({ children }: TransactionsProviderProps) {


// Código de chamada para API 
// Movido de Transactions/ index.tsx
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch('http://localhost:3000/transactions')
    const data = await response.json();

    setTransactions(data);
  }
  useEffect(() => {
    loadTransactions();
  }, [])
// --------------




  return (
    <TransactionsContext.Provider value={{ transactions }} >
      {children}
    </TransactionsContext.Provider>
  )
}