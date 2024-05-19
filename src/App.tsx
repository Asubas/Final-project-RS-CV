import { Routes, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/homePage/homePage';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import AboutUs from './pages/aboutUs/aboutUs';
import Collection from './pages/collections/collection';
import MyBag from './pages/myBag/myBag';
import AccountPage from './pages/accountPage/loginPage';
import RegistrationPage from './pages/registrationPage/registrationPage';
import apiRoot, { projectKey } from './lib/BuildClient';

function App() {
  apiRoot.withProjectKey({ projectKey }).get().execute();
  return (
    <>
    <RegistrationPage/>
      {/* <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="collection" element={<Collection />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="registration" element={<RegistrationPage />} />
        <Route path="bag" element={<MyBag />} />
      </Routes>
      <Footer /> */}
    </>
  );
}

export default App;
