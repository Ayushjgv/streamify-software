import { Route,Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Landing from '../pages/Landing';
import FramerMotion from '../pages/FramerMotion';
import Player from '../pages/Player';
import SearchResultList from '../pages/SearchResultList';

const App = () => {
  return (
    <Routes >
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/framer-motion" element={<FramerMotion />} />
      <Route path="/player/:id" element={<Player />} />
      <Route path="/search" element={<SearchResultList />} />
    </Routes>
  )
}

export default App;
