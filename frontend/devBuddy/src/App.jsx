import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Body from './components/Body'
import Login from './components/Login';
import { Provider } from 'react-redux';
import userStore from '../utils/reduxStore';


function App() {


  return (
    <Provider store={userStore}>
      <BrowserRouter basename='/'>
      <Routes>
        <Route
          path="/"
          element={         
              <Body />
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Body />
              <Login/>
            </>
          }
        />
        <Route
          path="/profile"
          element={
            <>
              <Body />
              <div>Your profile</div>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
    </Provider>
  );

}

export default App
