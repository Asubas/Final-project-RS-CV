import { Routes, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/homePage/homePage';
import Header from './components/header/header';
import Footer from './components/footer/footer';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
