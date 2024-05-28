import { Routes, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/homePage/homePage';
import AboutUs from './pages/aboutUs/aboutUs';
import Collection from './pages/collections/collectionPage';
import MyBag from './pages/myBag/myBag';
import LoginPage from './pages/accountPage/loginPage';
import ProtectedRoute from './pages/protectedRouter';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/notFound/notFound';
import RegistrationForm from './pages/registrationPage/registrationPage';
import Layout from './components/mainLayout/layout';
import Product from './pages/product/product';
import CategoryCheck from './lib/categoryCheck';
import Profile from './pages/profile/profile';
import ProtectedProfile from './lib/protectedRoute';
import TeaCollection from './pages/collections/collectionMain';
import DisplayProductInformation from './pages/product/productCardInformation';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="collection" element={<Collection />} />
          <Route path="collection/:category" element={<CategoryCheck />}>
            <Route index element={<TeaCollection />} />
            <Route path=":id" element={<Product />} >
              
            </Route>
          </Route>
          <Route
            path="login"
            element={
              <ProtectedRoute redirectTo="/">
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route path="bag" element={<MyBag />} />
          <Route
            path="registration"
            element={
              <ProtectedRoute redirectTo="/">
                <RegistrationForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route
            path="profile"
            element={
              <ProtectedProfile redirectTo="/">
                <Profile />
              </ProtectedProfile>
            }
          />
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
