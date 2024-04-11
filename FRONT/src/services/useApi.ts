import { useCallback } from 'react';
import { ICard } from '../models/card';
import { useMainStore } from '../store/mainStore';

const useApi = (token?: string) => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  const { clearAll } = useMainStore(state => state);
  const fetchWithAuth = useCallback(
    async (url: string, options: RequestInit) => {
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      };

      const response = await fetch(`${baseURL}${url}`, {
        ...options,
        headers,
      });

      if (!response.ok) {
        if (response.status === 401) {
          clearAll();
        }
        throw new Error(`Network response for ${url} was not ok`);
      }

      return response.json();
    },
    [token]
  );

  const login = useCallback(async (): Promise<string> => {
    const username = import.meta.env.VITE_USER;
    const password = import.meta.env.VITE_PASSWORD;
    const response = await fetchWithAuth('/login', {
      method: 'POST',
      body: JSON.stringify({ login: username, senha: password }),
    });
    return response;
  }, [fetchWithAuth]);

  const getCards = useCallback(() => {
    return fetchWithAuth('/cards', { method: 'GET' });
  }, [fetchWithAuth]);

  const addCard = useCallback(
    (card: ICard) => {
      return fetchWithAuth('/cards', {
        method: 'POST',
        body: JSON.stringify(card),
      });
    },
    [fetchWithAuth]
  );

  const updateCard = useCallback(
    (card: ICard) => {
      return fetchWithAuth(`/cards/${card.id}`, {
        method: 'PUT',
        body: JSON.stringify(card),
      });
    },
    [fetchWithAuth]
  );

  const deleteCard = useCallback(
    (card: ICard) => {
      return fetchWithAuth(`/cards/${card.id}`, {
        method: 'DELETE',
        body: JSON.stringify(card),
      });
    },
    [fetchWithAuth]
  );

  return { login, getCards, addCard, updateCard, deleteCard };
};

export default useApi;
