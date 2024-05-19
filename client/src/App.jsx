import {BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import Courses from "./pages/Courses";
import Course from "./pages/Course";
import UserProfile from "./pages/UserProfile";
import UserDashboard from "./pages/UserDashboard";
import About from "./pages/About";

function App() {
  return <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/logout" element={<Logout/>}/>
          <Route path="/courses" element={<Courses/>}/>
          <Route path="/courses/course/:id" element={<Course/>}/>
          <Route path="/profile/:id" element={<UserProfile/>}/>
          <Route path="/user/:id" element={<UserDashboard/>}/>
          <Route path="/about" element={<About/>}/>
        </Route>    
    </Routes>
  </BrowserRouter>
}

export default App