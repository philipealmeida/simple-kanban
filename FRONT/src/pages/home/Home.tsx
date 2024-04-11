import CardsWrapper from '../../components/home/cards/wrapper/CardsWrapper';
import HomeHeader from '../../components/home/header/HomeHeader';
import { useMainStore } from '../../store/mainStore';
import useApi from '../../services/useApi';
import { useEffect } from 'react';
import './home.css';

function Home() {
  const { token, setToken } = useMainStore(state => state);
  const { login } = useApi();

  const handleLogin = async () => {
    const token = await login();
    setToken(token);
  };

  useEffect(() => {
    if (!token) {
      handleLogin();
    }
  }, [token]);

  return (
    <main>
      <HomeHeader />
      <CardsWrapper />
    </main>
  );
}

export default Home;
