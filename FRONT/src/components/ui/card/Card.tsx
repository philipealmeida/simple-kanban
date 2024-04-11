import { useEditableCard } from './hook/useEditableCard';
import { useMainStore } from '../../../store/mainStore';
import { CardList, ICard } from '../../../models/card';
import { ArrowLeftIcon } from '../icon/ArrowLeftIcon';
import useApi from '../../../services/useApi';
import { Button } from '../button/Button';
import './card.css';

export type CardProps = {
  id?: string;
  title: string;
  content: string;
  lista: CardList;
  fetchCards: () => void;
};

export const Card = ({ id, title, content, lista, fetchCards }: CardProps) => {
  const { token } = useMainStore(state => state);
  const { addCard, updateCard, deleteCard } = useApi(token);
  const { isEditable, toggleEdit, saveChanges, editTitleRef, editContentRef } =
    useEditableCard(title, content, id, lista, updateCard, addCard, fetchCards);

  const handleUpdateStatusForward = async () => {
    const statusMap: { [key in CardList]?: CardList } = {
      [CardList.ToDo]: CardList.Doing,
      [CardList.Doing]: CardList.Done,
    };
    const nextStatus = statusMap[lista];

    if (nextStatus) {
      await updateCard({
        id,
        titulo: title,
        conteudo: content,
        lista: nextStatus,
      } as ICard);
      await fetchCards();
    }
  };

  const handleUpdateStatusBackward = async () => {
    const statusMap: { [key in CardList]?: CardList } = {
      [CardList.Done]: CardList.Doing,
      [CardList.Doing]: CardList.ToDo,
    };
    const previousStatus = statusMap[lista];

    if (previousStatus) {
      await updateCard({
        id,
        titulo: title,
        conteudo: content,
        lista: previousStatus,
      } as ICard);
      await fetchCards();
    }
  };

  const handleDelete = async () => {
    await deleteCard({
      id,
      titulo: title,
      conteudo: content,
      lista,
    } as ICard);
    await fetchCards();
  };

  return (
    <div className="card-container">
      <h3
        className={`card-title ${isEditable && 'card-title--editable'}`}
        contentEditable={isEditable}
        ref={editTitleRef}
        suppressContentEditableWarning={true}
      >
        {title}
      </h3>
      <div
        className={`card-content ${isEditable && 'card-content--editable'}`}
        contentEditable={isEditable}
        ref={editContentRef}
        suppressContentEditableWarning={true}
      >
        {content}
      </div>
      <div className="card-actions">
        {isEditable ? (
          <>
            <Button
              onClick={saveChanges}
              data-testid="save-button"
              outlined={false}
            >
              Save
            </Button>
            <Button
              onClick={toggleEdit}
              data-testid="cancel-button"
              outlined={false}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={toggleEdit}
              data-testid="edit-button"
              outlined={false}
            >
              Edit
            </Button>

            {id && (
              <>
                <Button
                  onClick={handleDelete}
                  data-testid="delete-button"
                  outlined={false}
                >
                  Delete
                </Button>
                <div className="move-card-wrapper">
                  {lista !== CardList.ToDo && (
                    <Button
                      onClick={handleUpdateStatusBackward}
                      data-testid="move-left-button"
                      outlined={false}
                    >
                      <i className="arrow-left-icon" title="move card backward">
                        <ArrowLeftIcon />
                      </i>
                    </Button>
                  )}
                  {lista !== CardList.Done && (
                    <Button
                      onClick={handleUpdateStatusForward}
                      data-testid="move-right-button"
                      outlined={false}
                    >
                      <i className="arrow-right-icon" title="move card forward">
                        <ArrowLeftIcon />
                      </i>
                    </Button>
                  )}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
