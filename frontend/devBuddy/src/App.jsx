import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Body from './components/Body'
import Login from './components/Login';
import { Provider } from 'react-redux';
import userStore from '../utils/reduxStore';
import Feed from './components/Feed';
import Signup from './components/Signup';
import Profile from './components/Profile';


function App() {


  return (
    <Provider store={userStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Body />}>  
            <Route path="/" element={<Feed />}/>  
            <Route path="/login" element={<Login />}/>  
            <Route path="/signup" element={<Signup />}/>  
            <Route path="/profile" element={<Profile />}/>             
          </Route>
           
        </Routes>
        
      </BrowserRouter>
    </Provider>
  );

}

export default App
