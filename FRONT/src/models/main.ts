import { ICard } from './card';

export type MainStore = {
  editionMode: boolean;
  token: string;
  cardUpdated: null | ICard;
};
