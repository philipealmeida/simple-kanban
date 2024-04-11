import { ICard } from '../models/card';

export const mockCards = [
  {
    titulo: 'Welcome!',
    conteudo:
      'Please click on the edit button to start modifying this content.',
    lista: 'ToDo',
  },
  {
    id: 'e2a1c78d-501a-48c3-b4e3-6e31e0d4c8b1',
    titulo: 'User API',
    conteudo: 'Implement the API for user authentication',
    lista: 'Doing',
  },
  {
    id: '4f368b74-5c4e-4b67-adae-2d7c8a7cfd99',
    titulo: 'E2E Checkout',
    conteudo: 'Write the end-to-end tests for the checkout flow',
    lista: 'Done',
  },
] as ICard[];
