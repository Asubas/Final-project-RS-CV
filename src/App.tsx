import { Routes, Route } from 'react-router-dom';
import './App.scss';
import HomePage from './pages/homePage/homePage';
import AboutUs from './pages/aboutUs/aboutUs';
import { Collection } from './pages/collections/collectionPage';
import MyBag from './pages/myBag/myBag';
import LoginPage from './pages/accountPage/loginPage';
import ProtectedRoute from './pages/protectedRouter';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './pages/notFound/notFound';
import RegistrationForm from './pages/registrationPage/registrationPage';
import Layout from './components/mainLayout/layout';
import Product from './pages/product/product';
import Profile from './pages/profile/profile';
import ProtectedProfile from './lib/protectedRoute';
import SelectedCollection from './pages/collections/collectionMain';
import { TeaPage } from './pages/collections/subCollections/teaPage';
import { CoffeePage } from './pages/collections/subCollections/coffeePage';
import { CocoaPage } from './pages/collections/subCollections/cocoaPage';
function App() {
  return (
    <>
    <DisplayProductInformation/>
      {/* <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="collection" element={<Collection />} />
          <Route path="/collection/tea" element={<TeaPage />} />
          <Route path="/collection/coffee" element={<CoffeePage />} />
          <Route path="/collection/cocoa" element={<CocoaPage />} />
          <Route
            path="collection/:collectionType/:collectionSubcategories"
            element={<SelectedCollection />}
          />
          <Route
            path="collection/:collectionType/:collectionSubcategories/:productId"
            element={<Product />}
          />
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
      /> */}
    </>
  );
}

export default App;
