import { Routes, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/homePage/homePage';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import AboutUs from './pages/aboutUs/aboutUs';
import Collection from './pages/collections/collection';
import MyBag from './pages/myBag/myBag';
import LoginPage from './pages/accountPage/loginPage';
import ProtectedRoute from './pages/protectedRouter';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="collection" element={<Collection />} />
        <Route
          path="login"
          element={
            <ProtectedRoute redirectTo="/">
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route path="bag" element={<MyBag />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
