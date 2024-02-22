import { Routes, Route } from 'react-router-dom';
import Home from './Pages/home/Home';
import List from './Pages/lists/List';
import Hotel from './Pages/hotel/Hotel';
import Login from './Pages/login/Login';
import Register from './Pages/register/Register';
import Profile from './Components/profile/Profile';
import MyDetails from './Components/mydetails/MyDetails';
import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Mybookings from './Components/mybookings/Mybookings';
import Dropdown from './Components/DropdownProfile/Dropdown';
import Updateuser from './Components/updateuser/Updateuser';
  
function App() {

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);
    // if (!user) {
    //   return <Navigate to="/login" />
    // }
    return children;
  }

  return (
    <div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/hotel' element={<List />} />
        <Route path='/hotel/:id' element={<Hotel />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/mydetails' element={<MyDetails />} />
        <Route path='/mybookings' element={<Mybookings />} />
        <Route path='/dropdown' element={<Dropdown />} />
        <Route path='/updateUser' element={<Updateuser/>} />
        
      </Routes>

    </div>
  );
}

export default App;
