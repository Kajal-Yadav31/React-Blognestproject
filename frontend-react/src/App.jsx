import {BrowserRouter, Routes, Route} from "react-router-dom"
import './assets/css/style.css'
import { ToastContainer } from 'react-toastify';

import Header from "./views/partials/Header";
import Footer from "./views/partials/Footer";

{/* Core */}
import Detail from "./views/core/Detail";
// import Search from "./views/core/Search";
import Category from "./views/core/Category";
import Main  from "./views/core/Main";

{/* Authentication */}
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";

{/* Dashboard */}
import Dashboard from "./views/dashboard/Dashboard";
import Posts from "./views/dashboard/Posts";
import AddPost from "./views/dashboard/AddPost";
import EditPost from "./views/dashboard/EditPost";
import Comments from "./views/dashboard/Comments";
import Notifications from "./views/dashboard/Notifications";
import Profile from "./views/dashboard/Profile";

// import AuthProvider from '../src/utils./AuthProvider'
import AuthProvider from './utils/AuthProvider'
import PrivateRoute from './utils/PrivateRoute'
import PublicRoute from './utils/PublicRoute'



function App() {

  return (
    <>
    <ToastContainer />
    <AuthProvider>
      <BrowserRouter>
      <Header></Header>
      <Routes>

      {/* Core */}
        <Route path='/' element={<Main></Main>}></Route>
        <Route path="/:slug" element={<Detail />} />
        <Route path="/category/:slug/" element={<Category />} />
        {/* <Route path="/search/" element={<Search />} /> */}

      {/* Authentication */}    
        <Route path='/register' element={<PublicRoute><Register></Register></PublicRoute>}></Route>
        <Route path='/login' element={<PublicRoute><Login></Login></PublicRoute>}></Route>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard></Dashboard></PrivateRoute>}></Route>

      {/* Dashboard */}
        <Route path="/dashboard/" element={<Dashboard />} />
        <Route path="/posts/" element={<Posts />} />
        <Route path="/add-post/" element={<AddPost />} />
        <Route path="/edit-post/:id/" element={<EditPost />} />
        <Route path="/comments/" element={<Comments />} />
        <Route path="/notifications/" element={<Notifications />} />
        <Route path="/profile/" element={<Profile />} />

      </Routes>
      <Footer></Footer>
      </BrowserRouter>   
      </AuthProvider> 
    </>
  )
}

export default App
