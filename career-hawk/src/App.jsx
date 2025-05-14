import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import Header from './components/header/Header'
import background from './assets/eagle.jpg';

const App = () => {
  return (
    <>
      <Box
        minHeight="100vh"
        bgImage={`url(${background})`}
        bgSize="contain"
        backgroundPositionX="center"
        backgroundPositionY="100px"
        bgRepeat="no-repeat"
      >
        <Header />
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="*" element={<h2>Страница не найдена</h2>} />
        </Routes>
      </Box>
    </>

  )
}

export default App
