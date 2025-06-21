import './App.css';
import Navbar from './component/Navbar';
import Homescreen from '../src/screens/Homescreen'
import Bookingscreen from './screens/Bookingscreen';
import Registerscreen from './screens/Registerscreen'
import {BrowserRouter , Routes, Route , Navigate} from 'react-router-dom'
import Loginscreen from './screens/Loginscreen';
import Profilescreen from './screens/Profilescreen';
import Adminscreen from './screens/Adminscreen';
import Landingscreen from './screens/Landingscreen';

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
           <Route path="/" element={<Navigate to="/home" />} />
      <Route path='/home' element={<Homescreen />}></Route>
      <Route path="/getroomby/:roomid/:fromdate/:todate" element={<Bookingscreen />} />
      <Route path='/register' element={<Registerscreen></Registerscreen>}></Route>
      <Route path='/login' element={<Loginscreen></Loginscreen>}></Route>
      <Route path='/profile' element={<Profilescreen></Profilescreen>}></Route>
      <Route path='/admin' element={<Adminscreen></Adminscreen>}></Route>
      {/* <Route path='/' element={<Landingscreen></Landingscreen>}></Route> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
