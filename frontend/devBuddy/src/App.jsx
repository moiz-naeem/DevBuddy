import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Body from './components/Body'
import Login from './components/Login';


function App() {


  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Body />
            </>
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
  );

}

export default App
