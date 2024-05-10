import { Routes, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/homePage/homePage';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import AboutUs from './pages/aboutUs/aboutUs';
import Collection from './pages/collections/collection';
import RegistrationForm from './pages/registrationPage/registrationPage';
import MyBag from './pages/myBag/myBag';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="collection" element={<Collection />} />
        <Route path="account" element={<RegistrationForm />} />
        <Route path="bag" element={<MyBag />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
