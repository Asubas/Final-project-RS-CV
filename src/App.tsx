import { Routes, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/homePage/homePage';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import AboutUs from './pages/aboutUs/aboutUs';
import Collection from './pages/collections/collection';
import MyBag from './pages/myBag/myBag';
import AccountPage from './pages/accountPage/loginPage';
import { createAnonym, projectKey } from './lib';
import { useState, useEffect } from 'react';

function App() {
  const [projectDetails, setProjectDetails] = useState({});
  const getProject = async () => {
    try {
      const project = await createAnonym()
        .withProjectKey({ projectKey })
        .customers()
        .get()
        .execute();
      setProjectDetails(project.body);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getProject();
  }, []);

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
