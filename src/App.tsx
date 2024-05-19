import { Routes, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/homePage/homePage';
import AboutUs from './pages/aboutUs/aboutUs';
import Collection from './pages/collections/collection';
import MyBag from './pages/myBag/myBag';
import LoginPage from './pages/accountPage/loginPage';
import ProtectedRoute from './pages/protectedRouter';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/notFound/notFound';
import RegistrationForm from './pages/registrationPage/registrationPage';
import Layout from './components/mainLayout/layout';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
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
          <Route path="registrtion" element={<RegistrationForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
