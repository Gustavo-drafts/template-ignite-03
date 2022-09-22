import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { Controller, useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';

// Schema do objeto modal

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;


export function NewTransactionModal() {
  const {
    control, // Controle de dados enviados pelo formulário (explorar)
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: { type: 'income' }
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(data);
  }


  return (
    <Dialog.Portal>

      <Overlay />
      <Content>

        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })} // 'valueAsNumber' converte valor para número
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          {/* Form Controller modal */}
          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (

                /* Modal */
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}>
                  <TransactionTypeButton
                    variant='income'
                    value='income'>
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TransactionTypeButton>

                  <TransactionTypeButton
                    variant='outcome'
                    value='outcome'>
                    <ArrowCircleDown size={24} />
                    Saída
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>


      </Content>
    </Dialog.Portal>
  )
}