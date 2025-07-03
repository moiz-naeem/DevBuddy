import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Body from './components/Body'


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
              <div>Login here</div>
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
