export enum CardList {
  ToDo = 'ToDo',
  Doing = 'Doing',
  Done = 'Done',
}

export interface ICard {
  id?: string;
  titulo: string;
  conteudo: string;
  lista: CardList;
}
