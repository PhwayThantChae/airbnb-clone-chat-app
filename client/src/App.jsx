import './App.css'
import {Route, Routes} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import {UserContextProvider} from "./UserContext";
import AccountPage from "./pages/AccountPage";
import PlacesPage from "./pages/PlacesPage";
import PlacePage from "./pages/PlacePage";
import PlacesFormPage from "./pages/PlacesFormPage";
import BookingsPage from "./pages/BookingsPage";
import BookingPage from "./pages/BookingPage";
import SearchAPIPage from "./pages/SearchAPIPage";
import SearchAPIDetailPage from "./pages/SearchAPIDetailPage";
import AuthGuard from "./AuthGuard";
import PublicProfile from "./pages/PublicProfile";
import AdminLoginPage from "./admin-pages/AdminLoginPage";
import UsersPage from './admin-pages/UsersPage';
import NewUserPage from './admin-pages/NewUserPage';
import EditUserPage from './admin-pages/EditUserPage';
import SearchInPage from "./pages/SearchInPage";
import NewOwnerPage from './admin-pages/NewOwnerPage';
import EditOwnerPage from './admin-pages/EditOwnerPage';
import ChatListPage from './pages/chat/ChatListPage';
import { ToastContainer } from 'react-toastify';

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {

  return (
      <UserContextProvider>
        <Routes>
          {/*<Route path="/" element={<Layout/>}>*/}
          <Route index element={<IndexPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/a/login" element={<AdminLoginPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/profile/:id" element={<PublicProfile/>}/>
          <Route path="/account/:subpage?" element={<AccountPage/>}/>
          <Route path="/account/places" element={
            <AuthGuard allowedUserTypes={["business", "admin"]}>
              <PlacesPage/>
            </AuthGuard>
          }
          />
          <Route
              path="/account/places/new"
              element={
                <AuthGuard allowedUserTypes={["business"]}>
                  <PlacesFormPage/>
                </AuthGuard>
              }
          />
          <Route path="/account/places/:id" element={<PlacesFormPage/>}/>
          <Route path="/place/:id" element={<PlacePage/>}/>
          <Route path="/account/bookings" element={<BookingsPage/>}/>
          <Route path="/account/bookings/:id" element={<BookingPage/>}/>
          <Route path="/account/messages" element={<ChatListPage/>}/>
          <Route path="/search" element={<SearchInPage/>}/>
          <Route path="/search/api" element={<SearchAPIPage/>}/>
          <Route path="/search/api/detail/:id"
                 element={<SearchAPIDetailPage/>}/>
          <Route
              path="/a/users"
              element={
                <AuthGuard allowedUserTypes={["admin"]}>
                  <UsersPage/>
                </AuthGuard>
              }
          />
          <Route
              path="/a/users/new"
              element={
                <AuthGuard allowedUserTypes={["admin"]}>
                  <NewUserPage/>
                </AuthGuard>
              }
          />
          <Route
              path="/a/users/edit/:id"
              element={
                <AuthGuard allowedUserTypes={["admin"]}>
                  <EditUserPage/>
                </AuthGuard>
              }
          />
          <Route
              path="/a/owners/new"
              element={
                <AuthGuard allowedUserTypes={["admin"]}>
                  <NewOwnerPage/>
                </AuthGuard>
              }
          />
          <Route
              path="/a/owners/edit/:id"
              element={
                <AuthGuard allowedUserTypes={["admin"]}>
                  <EditOwnerPage/>
                </AuthGuard>
              }
          />
        </Routes>
        <div>
          <ToastContainer/>
        </div>
      </UserContextProvider>
  )
}

export default App
