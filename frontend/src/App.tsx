import { createContext, useState } from 'react';
import './App.css';
import {
  // createBrowserRouter,
  // RouterProvider,
  BrowserRouter, Routes, Route
} from "react-router-dom";
import Login from './pages/Login';
import Members from './pages/Members';
import Favorites from './pages/Favorites';
import Default from './pages/Default';
import SignUp from './pages/SignUpPage';
import ProtectedRoute from './utils/ProtectedRoute';
import NavigationBar from './components/NavigationBar';
import API from './utils/API';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Default />
//   },
//   {
//     path: "/login",
//     element: <Login />
//   },
//   {
//     path: "/signup",
//     element: <SignUp />
//   },
//   {
//     path: "/members",
//     element: <Members />
//   },
//   {
//     path: "/favorite",
//     element: <Favorites />
//   },
// ]);
export const AuthContext = createContext<any>(false);


function App() {


  console.log(process.env.REACT_APP_BACKEND_URL);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const data = {
    isLoggedIn,
    setIsLoggedIn
  }

  function getData() {
    API.getUserData()
      .then(res => {
        console.log('user data: ', res);
      }).catch(err => console.log(err))
  }

  function logout() {
    API.logout()
      .then(res => {
        console.log('logout res: ', res);
      }).catch(err => console.log(err))
  }




  return (

    <div>
      <AuthContext.Provider value={data}>
        <div>isLoggedIn? {isLoggedIn.toString()}</div>
        <button onClick={getData}>getData from backend</button>
        <br/>
        <br/>
        <button onClick={logout}>logout from backend</button>
        <br/>
        <br/>
        <br/>
        <BrowserRouter>
          <NavigationBar />

          <Routes>
            <Route path="/" element={<Default />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/members"
              element={<ProtectedRoute><Members /></ProtectedRoute>}
            />
            <Route path="/favorites"
              element={<ProtectedRoute><Favorites /></ProtectedRoute>}
            />

          </Routes>

        </BrowserRouter>
      </AuthContext.Provider>

    </div>
  );
}

export default App;