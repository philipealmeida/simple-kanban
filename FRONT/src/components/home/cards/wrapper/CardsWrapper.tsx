import { Typography } from '../../../ui/typography/Typography';
import { useMainStore } from '../../../../store/mainStore';
import { CardList, ICard } from '../../../../models/card';
import { mockCards } from '../../../../__mocks__/cards';
import { Button } from '../../../ui/button/Button';
import useApi from '../../../../services/useApi';
import { Card } from '../../../ui/card/Card';
import { Grid } from '../../../ui/grid/Grid';
import { useState, useEffect } from 'react';

const CardsWrapper = () => {
  const [cards, setCards] = useState<ICard[]>([mockCards[0]]);
  const { token } = useMainStore(state => state);
  const { getCards } = useApi(token);

  async function fetchCards() {
    const fetchedCards = await getCards();
    if (fetchedCards && fetchedCards.length) {
      setCards(fetchedCards);
    } else {
      setCards([mockCards[0]]);
    }
  }
  useEffect(() => {
    if (token) {
      fetchCards();
    }
  }, [token, getCards]);

  return (
    <div>
      <Grid container spacing={2} dataTestId="main-container">
        <Grid item xs={4}>
          <div className="grid__item-title">
            <Typography variant="h5" customClass="inl-block">
              To Do
            </Typography>
          </div>
          <div className="grid__content">
            {cards
              .filter(card => card.lista === CardList.ToDo)
              .map(({ id, titulo, conteudo, lista }) => (
                <Card
                  key={`${id}-${titulo}`}
                  id={id}
                  title={titulo}
                  content={conteudo}
                  lista={lista}
                  fetchCards={fetchCards}
                />
              ))}
            <Button
              onClick={() =>
                setCards([
                  {
                    titulo: 'My new task',
                    conteudo: 'Edit with your content',
                    lista: CardList.ToDo,
                  },
                  ...cards,
                ])
              }
            >
              ＋ Add new card
            </Button>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="grid__item-title">
            <Typography variant="h5" customClass="inl-block">
              Doing
            </Typography>
          </div>
          <div className="grid__content">
            {cards
              .filter(card => card.lista === CardList.Doing)
              .map(({ id, titulo, conteudo, lista }) => (
                <Card
                  key={id}
                  id={id}
                  title={titulo}
                  content={conteudo}
                  lista={lista}
                  fetchCards={fetchCards}
                />
              ))}
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className="grid__item-title">
            <Typography variant="h5" customClass="inl-block">
              Done
            </Typography>
          </div>
          <div className="grid__content">
            {cards
              .filter(card => card.lista === CardList.Done)
              .map(({ id, titulo, conteudo, lista }) => (
                <Card
                  key={id}
                  id={id}
                  title={titulo}
                  content={conteudo}
                  lista={lista}
                  fetchCards={fetchCards}
                />
              ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default CardsWrapper;
