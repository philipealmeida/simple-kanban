import { CardList, ICard } from '../../../../models/card';
import { useState, useRef } from 'react';

export const useEditableCard = (
  initialTitle: string,
  initialContent: string,
  id: string | undefined,
  lista: CardList,
  updateCard: Function,
  addCard: Function,
  fetchCards: Function
) => {
  const [isEditable, setIsEditable] = useState(false);
  const editTitleRef = useRef<HTMLDivElement>(null);
  const editContentRef = useRef<HTMLDivElement>(null);

  const toggleEdit = () => {
    if (isEditable) {
      editTitleRef.current && (editTitleRef.current.innerText = initialTitle);
      editContentRef.current &&
        (editContentRef.current.innerText = initialContent);
    }
    setIsEditable(prev => !prev);
  };

  const saveChanges = async () => {
    setIsEditable(false);
    const newTitle = editTitleRef.current
      ? editTitleRef.current.innerText
      : initialTitle;
    const newContent = editContentRef.current
      ? editContentRef.current.innerText
      : initialContent;

    if (newTitle !== initialTitle || newContent !== initialContent) {
      if (id) {
        await updateCard({
          id,
          titulo: newTitle,
          conteudo: newContent,
          lista,
        } as ICard);
        return await fetchCards();
      }

      await addCard({
        titulo: newTitle,
        conteudo: newContent,
        lista: CardList.ToDo,
      } as ICard);
      return await fetchCards();
    }
  };

  return { isEditable, toggleEdit, saveChanges, editTitleRef, editContentRef };
};
