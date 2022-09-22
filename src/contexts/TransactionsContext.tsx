import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

// Interface movida de Transactions/ index.tsx
interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  price: number;
  category: string;
  createdAt: string;
}

// desacoplando NewTransactionModal
interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
}

interface TransactionContextType {
  transactions: Transaction[]; // baseado na interface 'Transaction' acima
  fetchTransactions: (query?: string) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
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

// efetuar busca de dado por meio de 'string' dentro da api
// usando axios
  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
        q: query,
      }
    })

    setTransactions(response.data);
  }

  // sintaxe de post
  async function createTransaction(data: CreateTransactionInput) { 
    const { description, category, price, type } = data;
    
    const response = await api.post('transactions', {
      description,
      price,
      category,
      type,
      createdAt: new Date(), // criado separadamente pois JSON server não oferece por padrão
    })
    
    setTransactions(state => [ response.data, ...state ]);
  }



  useEffect(() => {
    fetchTransactions();
  }, [])
  // --------------




  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, createTransaction, }} >
      {children}
    </TransactionsContext.Provider>
  )
}