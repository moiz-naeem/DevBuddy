import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import userStore from '../utils/reduxStore';

import Body from './components/Body';
import Login from './components/Login';
import Feed from './components/Feed';
import Signup from './components/Signup';
import Profile from './components/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Access from './components/Access';

function App() {
  return (
    <Provider store={userStore}>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Body />}>
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <Feed />
                </ProtectedRoute>
              }
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            
            <Route path="/auth" element={<Access />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;