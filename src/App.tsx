import { Routes, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/homePage/homePage';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import AboutUs from './pages/aboutUs/aboutUs';
import Collection from './pages/collections/collection';
import MyBag from './pages/myBag/myBag';
import AccountPage from './pages/accountPage/loginPage';
import { createAnonym } from './lib';
import useGetProject from './lib/useGetProject';

function App() {
  const { projectDetails } = useGetProject(createAnonym());
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="collection" element={<Collection />} />
        <Route path="account" element={<AccountPage />} />
        <Route path="bag" element={<MyBag />} />
      </Routes>
      <Footer />
      {JSON.stringify(projectDetails, undefined, 2)}
    </>
  );
}

export default App;
